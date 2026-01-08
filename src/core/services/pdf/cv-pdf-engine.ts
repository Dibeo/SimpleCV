import { createRoot } from 'react-dom/client';

export const CvNativeEngine = {
  async export(Component: React.ReactElement, fileName: string) {
    let printContainer = document.getElementById('cv-print-portal');
    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'cv-print-portal';
      document.body.appendChild(printContainer);
    }

    const root = createRoot(printContainer);
    root.render(Component);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const originalTitle = document.title;
    document.title = fileName.replace('.pdf', '');

    window.print();

    document.title = originalTitle;
    setTimeout(() => {
      root.unmount();
      if (printContainer) printContainer.innerHTML = '';
    }, 500);
  }
};