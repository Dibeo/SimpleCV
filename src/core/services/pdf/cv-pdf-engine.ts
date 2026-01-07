import { createRoot } from 'react-dom/client';

export const CvNativeEngine = {
  async export(Component: React.ReactElement, fileName: string) {
    // 1. Créer un conteneur dédié à la racine
    let printContainer = document.getElementById('cv-print-portal');
    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'cv-print-portal';
      document.body.appendChild(printContainer);
    }

    // 2. Rendre le composant React
    const root = createRoot(printContainer);
    root.render(Component);

    // 3. IMPORTANT : Attendre le rendu et le chargement des images d'Alice Blue
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 4. Configurer le titre (nom du fichier PDF)
    const originalTitle = document.title;
    document.title = fileName.replace('.pdf', '');

    // 5. Déclencher l'impression
    window.print();

    // 6. Nettoyage
    document.title = originalTitle;
    setTimeout(() => {
      root.unmount();
      if (printContainer) printContainer.innerHTML = '';
    }, 500);
  }
};