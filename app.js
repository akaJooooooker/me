import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

pdfjsLib.getDocument('/me.pdf').promise.then(doc => {
    doc.getPage(1).then(page => {
        let viewport = page.getViewport({ scale: 1.5 });
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
            document.getElementById('pdf-container').appendChild(canvas);
        });
    });
}).catch(error => {
    console.error('Error loading PDF:', error);
});
