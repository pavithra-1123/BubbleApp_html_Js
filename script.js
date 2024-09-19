    
const canvas = document.getElementById('myCanvasBubbleApp');
const ctx = canvas.getContext('2d');

let arrowLen = 500; 
const arrowSpeed = 5;
let arrowMoving = false;
let randomCircleColor = getRandomColor();

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(100, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = randomCircleColor;
    ctx.fill();
    ctx.lineWidth = 2; 
    ctx.strokeStyle = 'black'; 
    ctx.stroke(); 
    ctx.closePath();
}

function drawArrow() {
    ctx.beginPath();
    ctx.moveTo(arrowLen, canvas.height / 2); 
    ctx.lineTo(arrowLen - 30, canvas.height / 2); 
    ctx.lineTo(arrowLen - 20, canvas.height / 2 - 10); 
    ctx.moveTo(arrowLen - 30, canvas.height / 2);
    ctx.lineTo(arrowLen - 20, canvas.height / 2 + 10); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}

function moveArrow() {
    if (arrowMoving) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        drawArrow();
            if (arrowLen > 185) {
                arrowLen -= arrowSpeed;
                requestAnimationFrame(moveArrow);
            } else {
                randomCircleColor = getRandomColor();
                drawCircle(); 
                arrowMoving = false; 
            }
    }
}

function init() {
    arrowLen = 500;
    arrowMoving = false;
    randomCircleColor = getRandomColor();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawArrow();
}

document.getElementById('hitButton').addEventListener('click', () => {
    if (!arrowMoving) {
        arrowMoving = true;
        moveArrow();
    }
});

document.getElementById('resetButton').addEventListener('click', init);

init(); 