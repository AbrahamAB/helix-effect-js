/* jshint esversion: 6 */
/* jshint -W053 */

const canvas = document.getElementById("helix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;
ctx.shadowColor = "black";
let hue = 0;
let drawing = false;
// ctx.globalCompositeOperation = 'destination-over';

// Función que dibuja y colorea el polígono.
function drawShape(x, y, radius, inset, n) {
  ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius);

  // Bucle para dibujar y cerrar el polígono.
  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius);
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Definir parámetros de la función.
const radius = 100;
const inset = 0.35;
const n = 30;
// Dibujar la muestra/s.
drawShape(100, 100, radius, inset, n);

// Dibuja mientras mueves el ratón.
let angle = 0;
window.addEventListener("mousemove", function (e) {
  if (drawing) {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(angle);
    hue += 3; // Frecuencia de cambio de color.
    angle += 15; // Velocidad de ángulo de giro.
    drawShape(0, 0, radius, inset, n); // Dibujar con el ratón.
    ctx.restore();
  }
});

// Si pulsas el ratón dibuja.
window.addEventListener("mousedown", function () {
  drawing = true;
});

// Si dejas de pulsar el ratón para.
window.addEventListener("mouseup", function () {
  drawing = false;
});
