import { Save, PlusCircle, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import { useCvStore } from "../../../core/store/useCvStore";
import Swal from "sweetalert2";
import { getBase64ImageFromURL } from "../../../core/utils/imageUtils";
import { exportCvPdf } from "../../../core/services/pdf/cv-export.service";

export const TopBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { data, reset } = useCvStore();

  const handleExportPdf = async () => {
    if (!data.personalInfo.fullName) {
      Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "Veuillez renseigner votre nom.",
      });
      return;
    }

    Swal.fire({
      title: "Préparation de l'impression...",
      text: "Le dialogue d'impression va s'ouvrir. Pensez à cocher 'Graphiques d'arrière-plan'.",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let dataForPdf = JSON.parse(JSON.stringify(data)); // Clone profond

      // Conversion de la photo en Base64 pour éviter les blocages CORS
      if (data.personalInfo.photoUrl && data.personalInfo.photoUrl.startsWith("http")) {
        try {
          const base64 = await getBase64ImageFromURL(data.personalInfo.photoUrl);
          dataForPdf.personalInfo.photoUrl = base64;
        } catch (e) {
          console.warn("Échec conversion photo, export sans image", e);
        }
      }

      // APPEL DU MOTEUR NATIF
      // On passe les données converties au moteur qui va gérer le portail et l'impression
      await exportCvPdf(dataForPdf);

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'ouvrir le module d'impression.",
      });
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 transition-colors sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-slate-800 dark:text-white text-lg">
          <span className="text-blue-500">CV</span>-Editor
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2" />

        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
        >
          <PlusCircle size={18} /> Nouveau
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
        >
          <Save size={18} /> Sauvegarder
        </button>

        <button
          onClick={handleExportPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ml-2 transition-all shadow-md active:scale-95"
        >
          <Download size={18} /> Exporter en PDF
        </button>
      </div>
    </header>
  );
};
