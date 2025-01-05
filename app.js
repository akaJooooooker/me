import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// 設定 Worker 路徑
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.min.js';

// 加載 PDF 文件
pdfjsLib.getDocument('./me.pdf').promise
    .then(doc => {
        console.log('PDF 加載成功！共有頁數:', doc.numPages);

        // 加載第一頁
        doc.getPage(1).then(page => {
            console.log('成功加載第 1 頁！');

            let viewport = page.getViewport({ scale: 1.5 });
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // 渲染頁面到 Canvas
            page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                console.log('成功渲染第 1 頁！');
                document.getElementById('pdf-container').appendChild(canvas);
            }).catch(renderError => {
                console.error('渲染頁面失敗:', renderError);
            });
        }).catch(pageError => {
            console.error('無法加載頁面:', pageError);
        });
    })
    .catch(docError => {
        console.error('無法加載 PDF 文件:', docError);
    });
