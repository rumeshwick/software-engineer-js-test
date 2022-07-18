const canvasSize = [15, 10];

const storageKey = 'canvasPrintDescription';

export function drawImage(img, imageX, scale) {
  const editorCanvas = document.getElementById('editorCanvas');
  const ctx = editorCanvas.getContext('2d');
  ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const scalePower = Math.pow(2, scale);
  ctx.scale(scalePower, scalePower);
  ctx.drawImage(
    img,
    imageX,
    0,
    img.naturalWidth,
    img.naturalHeight,
    0,
    0,
    editorCanvas.width,
    editorCanvas.height
  );
  editorCanvas.style.display = 'block';
}

export function getPrintDescription(imgName) {
  const canvasPrintDescription = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey))
    : {};

  const printDescription = canvasPrintDescription[imgName];

  if (printDescription) {
    document.getElementById('jsonViewerWrapper').style.display = 'block';
    document.getElementById('jsonViewer').innerHTML = JSON.stringify(
      printDescription,
      undefined,
      2
    );
    const scalePower =
      printDescription.canvas.photo.width / printDescription.canvas.width;
    return {
      imageX: printDescription.canvas.photo.x * -1,
      scale: Math.log(scalePower) / Math.log(2),
    };
  }
  document.getElementById('jsonViewerWrapper').style.display = 'none';
  return { imageX: 0, scale: 0 };
}

export function submitPrintDescription(imgName, imageX, scale) {
  const scalePower = Math.pow(2, scale);
  document.getElementById('jsonViewerWrapper').style.display = 'block';
  const printDescription = {
    canvas: {
      width: canvasSize[0],
      height: canvasSize[1],
      photo: {
        id: imgName,
        width: canvasSize[0] * scalePower,
        height: canvasSize[1] * scalePower,
        x: 0 - imageX,
        y: 0,
      },
    },
  };
  document.getElementById('jsonViewer').innerHTML = JSON.stringify(
    printDescription,
    undefined,
    2
  );

  const canvasPrintDescription = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey))
    : {};

  canvasPrintDescription[imgName] = printDescription;

  localStorage.setItem(storageKey, JSON.stringify(canvasPrintDescription));
}
