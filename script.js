const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const phi = (1 + Math.sqrt(5)) / 2;
const initalRotation = 90 * Math.PI / 180;
let frameCount = 0;
let params = {
    lineWidth: 2,
    firstCircleDiametre: 400,
    nbCircles: 10,
    speed: 50,
    colorRate: 10
};

function setup () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;
    canvas.centerX = canvas.width / 2
    canvas.centerY = canvas.height / 3;
    ctx.lineWidth = params.lineWidth;
}

function loop() {
    frameCount++;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(-canvas.width, -canvas.height,canvas.width * 2,canvas.height * 2); // effacer le canvas
    draw();
    window.requestAnimationFrame(loop);
}

function draw() {
    for (i = 0; i < params.nbCircles; i++) {
        const diametre = params.firstCircleDiametre / Math.pow(phi, i);
        const speed = (100 - params.speed) / i
        const vect = vectorFromAngle((frameCount / speed) + initalRotation, diametre / phi);
        ctx.translate(vect.x, vect.y);
        setStrokeStyle(frameCount + i * params.colorRate);
        circle(canvas.centerX, canvas.centerY, diametre);
    }
}

function vectorFromAngle(angle, length) {
    return {
        x: length * Math.cos(angle),
        y: length * Math.sin(angle)
    };
}

function setStrokeStyle(val) {
    ctx.strokeStyle = `hsl(${val % 360},50%,50%)`;
}

function circle(x, y, w) {
    ctx.beginPath();
    ctx.moveTo(x + w, y);
    ctx.arc(x, y, w, 0, Math.PI * 2)
    ctx.stroke();
}

function valueChange(id) {
    params[id] = document.getElementById(id).value;
    setup();
}

window.addEventListener('resize', () => setup());
setup();
loop();

