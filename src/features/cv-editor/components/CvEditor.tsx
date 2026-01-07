import { CvForm } from "../../cv-form/components/CvForm";
import { CvPreview } from "../../cv-preview/components/CvPreview";

export const CvEditor = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <CvForm />
      </div>
      <div className="w-1/2 bg-slate-200 dark:bg-slate-950 flex flex-col items-center justify-start overflow-y-auto py-12 transition-colors">
        <CvPreview />
      </div>
    </div>
  );
};
