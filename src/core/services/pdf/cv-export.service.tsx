import type { CVData } from "../../domain/cv.types";

export const exportCvPdf = async (data: CVData) => {
    console.error("Erreur lors de la génération du PDF via React-PDF:", data);
};