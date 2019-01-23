export function drawRect(canvas, x, y, width, height, colour) {
    canvas.context.fillStyle = colour;
    canvas.context.fillRect(x, y, width, height);
}

export function drawScore(canvas, x, y, score, colour, font) {
    canvas.context.fillStyle = colour;
    canvas.context.font = font;
    canvas.context.fillText(score, x, y);
}

export function drawBall(canvas, ball) {
    canvas.context.fillStyle = ball.colour;
    canvas.context.beginPath();
    /*
        .arc() params:
            x, y, radius, sratAngle, endAngle, antiClockwise
    */
    canvas.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
    canvas.context.closePath();
    canvas.context.fill();
}

export function drawNet(canvas, net) {
    for (let i=0; i<canvas.height; i+=15) {
        drawRect(canvas, net.x, net.y + i, net.width, net.height, net.colour);
    }
}