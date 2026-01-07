import { useCvStore } from "../../../core/store/useCvStore";
import { CV_THEMES } from "../themes/ThemeIndex";

export const CvPreview = () => {
  const { data } = useCvStore();

  const themeId =
    (data.metadata.layout as keyof typeof CV_THEMES) || "standard";
  const SelectedTheme = CV_THEMES[themeId] || CV_THEMES.standard;

  return (
    <div className="sticky top-12 print:static print:m-0" >
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top scale-[0.4] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.75] text-black transition-all overflow-hidden print:scale-100 print:transform-none">
        <SelectedTheme.component data={data}/>
      </div>

      <p className="text-center mt-4 text-slate-400 text-xs italic tracking-widest uppercase">
        Format A4 — Mode {themeId}
      </p>
    </div>
  );
};
