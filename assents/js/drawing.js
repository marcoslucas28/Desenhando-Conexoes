const app = document.getElementById('app');
const saveButton = document.getElementById('dowload');
const drawingButton = document.getElementById('drawingMode');
const clearAllCanvas = document.getElementById('clear');
const erase = document.getElementById('erase');
const lineWidthButton = document.getElementById('selectLineWidth');
const square = document.getElementById('square');
const circle = document.getElementById('circle');
const triangle = document.getElementById('triangle');
const diamond = document.getElementById('diamond');

let mode = "drawing";
let lineWidth = 5;
let startX = 0, startY = 0;
let shapes = [];
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = app.clientWidth * 0.5;
canvas.height = app.clientHeight * 0.6;

let drawing = false;
let savedCanvas;

const startDrawing = (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
    if (mode === "drawing") {
        ctx.lineTo(startX, startY)
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        shapes.push({ mode: 'drawing', points: [{ x: startX, y: startY }] });
    } else if (mode === "erase") {
        eraseFunction(e.offsetX, e.offsetY);
    }
};

const stopDrawing = () => {
    drawing = false;
    ctx.beginPath();
};

const draw = (e) => {
    if (!drawing) return;
    const [currentX, currentY] = [e.offsetX, e.offsetY];
    if (mode === "drawing") {
        const currentShape = shapes[shapes.length - 1];
        currentShape.points.push({ x: currentX, y: currentY });

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#000'

        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        ctx.moveTo(currentX, currentY)
    } else if (mode === "erase") {
        eraseFunction(currentX, currentY);
    } else {
        ctx.putImageData(savedCanvas, 0, 0);
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        switch (mode) {
            case "square":
                const width = currentX - startX;
                const height = currentY - startY;
                ctx.rect(startX, startY, width, height);
                break;
            case "circle":
                const radiusX = currentX - startX;
                const radiusY = currentY - startY;
                ctx.ellipse(startX, startY, Math.abs(radiusX), Math.abs(radiusY), 0, 0, Math.PI * 2);
                break;
            case "triangle":
                ctx.moveTo(startX, startY);
                ctx.lineTo(currentX, currentY);
                ctx.lineTo(startX - (currentX - startX), currentY);
                ctx.closePath();
                break;
            case "diamond":
                const diamondWidth = Math.abs(currentX - startX);
                const diamondHeight = Math.abs(currentY - startY);
                ctx.moveTo(startX, startY - diamondHeight);
                ctx.lineTo(startX + diamondWidth, startY);
                ctx.lineTo(startX, startY + diamondHeight);
                ctx.lineTo(startX - diamondWidth, startY);
                ctx.closePath();
                break;
        }
        ctx.stroke();
    }
};

const dowloadImage = () => {
    const pngDataUrl = canvas.toDataURL('image/png');
    saveButton.href = pngDataUrl;
};

function selectStyle() {
    if (mode === "drawing") {
        drawingButton.style.border = '2px solid #cffdff';
    } else {
        drawingButton.style.border = 'none';
    }
    if (mode === "erase") {
        erase.style.border = '2px solid #cffdff';
    } else {
        erase.style.border = 'none';
    }
    if (mode === "square") {
        square.style.border = '2px solid #cffdff';
    } else {
        square.style.border = 'none';
    }
    if (mode === "circle") {
        circle.style.border = '2px solid #cffdff';
    } else {
        circle.style.border = 'none';
    }
    if (mode === "triangle") {
        triangle.style.border = '2px solid #cffdff';
    } else {
        triangle.style.border = 'none';
    }
    if (mode === "diamond") {
        diamond.style.border = '2px solid #cffdff';
    } else {
        diamond.style.border = 'none';
    }
}

const eraseFunction = (x,y) => {
        const currentShape = shapes[shapes.length - 1];
        currentShape.points.push({ x: x, y: y });

        ctx.clearRect(x, y, lineWidth, lineWidth)
}

drawingButton.addEventListener('click', () => {
    mode = "drawing";
    selectStyle();
});

erase.addEventListener('click', () => {
    mode = "erase";
    selectStyle();
});

square.addEventListener('click', () => {
    mode = "square";
    selectStyle();
});

circle.addEventListener('click', () => {
    mode = "circle";
    selectStyle();
});

triangle.addEventListener('click', () => {
    mode = "triangle";
    selectStyle();
});

diamond.addEventListener('click', () => {
    mode = "diamond";
    selectStyle();
});

selectStyle();

canvas.addEventListener('mousedown', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
    startDrawing(e);
});

canvas.addEventListener('mousemove', (e) => {
    draw(e);
});

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
    startDrawing({ offsetX: x, offsetY: y });
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    draw({ offsetX: x, offsetY: y });
});

canvas.addEventListener('touchend', stopDrawing);

clearAllCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = [];
});

saveButton.addEventListener('click', dowloadImage);

lineWidthButton.addEventListener('input', () => lineWidth = lineWidthButton.value);
