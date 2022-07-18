import '../css/main.scss';

import {
  drawImage,
  getPrintDescription,
  submitPrintDescription,
} from './utils';

const AppView = () => {
  // grab DOM elements inside index.html
  const fileSelector = document.getElementById('fileSelector');
  const toolbar = document.getElementById('toolbar');

  const moveLeftBtn = document.getElementById('moveLeftBtn');
  const moveRightBtn = document.getElementById('moveRightBtn');
  const doubleScaleBtn = document.getElementById('doubleScaleBtn');
  const halfScaleBtn = document.getElementById('halfScaleBtn');
  const submitBtn = document.getElementById('submitBtn');

  fileSelector.onchange = function (e) {
    // get all selected Files
    const files = e.target.files;
    let file;
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          // read Image contents from file
          const reader = new FileReader();
          reader.onload = function (e) {
            // create HTMLImageElement holding image data
            const img = new Image();
            img.src = reader.result;

            let { imageX, scale } = getPrintDescription(file.name);
            let movementGap = 100;

            const draw = function () {
              drawImage(img, imageX, scale);
            };

            img.onload = function () {
              draw();
              toolbar.style.display = 'block';
            };
            // do your magic here...

            doubleScaleBtn.onclick = function (e) {
              scale++;
              draw();
            };

            halfScaleBtn.onclick = function (e) {
              if (scale === 0) return;
              scale--;
              imageX = 0;
              draw();
            };

            moveLeftBtn.onclick = function (e) {
              if (scale === 0) return;

              const scalePower = Math.pow(2, scale);
              const maxPoint =
                (img.naturalWidth / scalePower) * (scalePower - 1);

              if (imageX === maxPoint) return;

              imageX = imageX + movementGap;

              if (imageX > maxPoint) {
                imageX = maxPoint;
              }

              draw();
            };

            moveRightBtn.onclick = function (e) {
              if (scale === 0 || imageX === 0) return;

              imageX = imageX - movementGap;

              if (imageX < 0) imageX = 0;

              draw();
            };

            submitBtn.onclick = function (e) {
              submitPrintDescription(file.name, imageX, scale);
            };
          };

          reader.readAsDataURL(file);
          // process just one file.
          return;
      }
    }
  };
};

AppView();
