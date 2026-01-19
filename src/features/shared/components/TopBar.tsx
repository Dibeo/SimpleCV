import { Save, PlusCircle, Sun, Moon, Download, ChevronDown } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import { useCvStore } from "../../../core/store/useCvStore";
import Swal from "sweetalert2";
import { getBase64ImageFromURL } from "../../../core/utils/imageUtils";
import { exportCvPdf } from "../../../core/services/pdf/cv-export.service";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../core/config/language";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const TopBar = () => {
  const { t, i18n } = useTranslation("topbar");
  const { theme, toggleTheme } = useTheme();
  const { data, reset } = useCvStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lng } = useParams();

  // --- LOGIQUE DE LANGUE ---

  // On récupère la langue depuis l'URL en priorité (lng), 
  // sinon depuis i18next, avec un fallback sur 'fr'
  const activeLngCode = (lng || i18n.resolvedLanguage || i18n.language || 'fr').toLowerCase();

  // On trouve l'objet langue correspondant pour l'affichage du bouton
  const currentLanguage = LANGUAGES.find(l => l.code.toLowerCase() === activeLngCode) || LANGUAGES[0];

  const handleLanguageChange = (newLng: string) => {
    // On récupère les segments actuels (ex: ["fr", "editor", "neobento"])
    const segments = location.pathname.split('/').filter(Boolean);

    if (segments.length > 0) {
      // On remplace l'ancien code langue par le nouveau
      segments[0] = newLng;
    } else {
      segments.push(newLng);
    }
    
    // On reconstruit l'URL proprement
    navigate(`/${segments.join('/')}`, { replace: true });
    setIsLangOpen(false);
  };

  // --- LOGIQUE PDF ---

  const handleExportPdf = async () => {
    if (!data.personalInfo.fullName) {
      Swal.fire({
        icon: "warning",
        title: t("topbar.alerts.warning"),
        text: t("topbar.alerts.name_required"),
      });
      return;
    }

    Swal.fire({
      title: t("topbar.alerts.preparing"),
      text: t("topbar.alerts.print_info"),
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const dataForPdf = JSON.parse(JSON.stringify(data));
      if (data.personalInfo.photoUrl?.startsWith("http")) {
        try {
          const base64 = await getBase64ImageFromURL(data.personalInfo.photoUrl);
          dataForPdf.personalInfo.photoUrl = base64;
        } catch (e) {
          console.warn("Échec conversion photo", e);
        }
      }
      await exportCvPdf(dataForPdf);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: t("topbar.alerts.error"),
        text: t("alerts.export_failed"),
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 transition-colors sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-slate-800 dark:text-white text-lg">
          {t("topbar.title")}
          <span className="text-blue-500">CV</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* MENU DÉROULANT LANGUE */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 border border-transparent active:border-slate-200 dark:active:border-slate-700"
          >
            <img 
              src={currentLanguage.flagUrl} 
              alt="" 
              className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm" 
            />
            <span className="text-sm font-bold uppercase tracking-wide">
              {currentLanguage.code}
            </span>
            <ChevronDown 
              size={14} 
              className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150 z-[60]">
              <div className="py-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                      ${activeLngCode === lang.code.toLowerCase() 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' 
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <img src={lang.flagUrl} alt="" className="w-5 h-3.5 object-cover rounded-[2px]" />
                      <span>{lang.label}</span>
                    </div>
                    {activeLngCode === lang.code.toLowerCase() && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* THÈME & ACTIONS */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
        </button>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
        >
          <PlusCircle size={18} /> {t("topbar.new")}
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors"
        >
          <Save size={18} /> {t("topbar.save")}
        </button>

        <button
          onClick={handleExportPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ml-2 transition-all shadow-md active:scale-95"
        >
          <Download size={18} /> {t("topbar.export_pdf")}
        </button>
      </div>
    </header>
  );
};