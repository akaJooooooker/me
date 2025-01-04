import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.min.js';

pdfjsLib.getDocument('/path/to/your/file.pdf').promise.then(doc => {
    doc.getPage(1).then(page => {
        let viewport = page.getViewport({ scale: 1.5 });
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport: viewport });
        document.getElementById('pdf-container').appendChild(canvas);
    });
});
