import { Routes, Route, Navigate } from "react-router-dom";
import { CvEditor } from "../features/cv-editor/components/CvEditor";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/editor" element={<CvEditor />} />
      <Route path="/editor/:layout" element={<CvEditor />} />
      <Route path="/edit" element={<Navigate to="/editor" replace />} />
      <Route
        path="*"
        element={<div className="text-white p-10">Page non trouvée</div>}
      />
    </Routes>
  );
};
