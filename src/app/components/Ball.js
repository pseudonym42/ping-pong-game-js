class Ball {
    constructor(ballInitColour, ballInitX, ballInitY) {
        const ballInitSpeed = 5;

        this.ballInitSpeed = ballInitSpeed,
        this.x = ballInitX,
        this.y = ballInitY,
        this.radius = 10;
        this.speed = ballInitSpeed,
        this.velocityX = ballInitSpeed,
        this.velocityY = ballInitSpeed,
        this.colour = ballInitColour
    }
}

export default Ball;
