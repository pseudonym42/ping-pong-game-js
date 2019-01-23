import {
    drawRect,
    drawScore,
    drawBall,
    drawNet
} from "./Utilities";


class Game {
    constructor(canvas, ball, user, computer) {
        this.levelMap = {
            "1": 0.1,
            "2": 0.12,
            "3": 0.15
        },
        this.gameMainInterval = null,
        this.canvas = canvas,
        this.ball = ball,
        this.user = user,
        this.computer = computer,

        this.framePerSecond = 50,
        this.difficultyLevel = null,
        this.pushTheTempo = 0.8,

        this.scoreTextFont = "70px Comic Sans MS",
        this.scoreTextColour = "white",

        this._net = {
            x: (this.canvas.width - 2)/2,
            y: 0,
            width: 1,
            height: 10,
            colour: "white"
        }
    }

    renderCanvas() {
        drawRect(this.canvas, 0, 0, this.canvas.width, this.canvas.height, this.canvas.color);
        drawNet(this.canvas, this._net);
        drawScore(this.canvas, this.canvas.width/4, this.canvas.height/5, this.user.score, this.scoreTextColour, this.scoreTextFont);
        drawScore(this.canvas, 3*this.canvas.width/4, this.canvas.height/5, this.computer.score, this.scoreTextColour, this.scoreTextFont);
        drawRect(this.canvas, this.user.x, this.user.y, this.user.width, this.user.height, this.user.colour);
        drawRect(this.canvas, this.computer.x, this.computer.y, this.computer.width, this.computer.height, this.computer.colour);
        drawBall(this.canvas, this.ball);
    }

    checkBallHitWall(ball) {
        let ballHitWall = false;
        if (ball.y + ball.radius > this.canvas.height || ball.y - ball.radius < 0) {
            ballHitWall = true;
        }
        return ballHitWall;
    }

    getActivePlayer(ball) {
        return ball.x < this.canvas.width/2 ? this.user : this.computer
    }

    updateCanvas() {
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;

        this.updateComputerPaddlePosition(this.ball);

        let ballHitWall = this.checkBallHitWall(this.ball);
        if (ballHitWall) {
            this.ball.velocityY = -this.ball.velocityY;
        }

        let activePlayer = this.getActivePlayer(this.ball);

        let ballHitPaddle = this.checkBallHitPaddle(this.ball, activePlayer);
        if (ballHitPaddle) {
            this.calculateBallRebound(this.ball, activePlayer);
        } else {
            this.updateScore(this.ball);
        }
    }

    initBall(ball) {
        ball.x = this.canvas.width/2;
        ball.y = this.canvas.height/2;
        ball.speed = ball.ballInitSpeed;
        ball.velocityX = ball.ballInitSpeed;
        ball.velocityY = ball.ballInitSpeed;
    }

    resetBall(ball) {
        this.initBall(ball);
        ball.velocityX = (-1)*Math.sign(ball.velocityX)*ball.ballInitSpeed;
    }

    updateScore(ball) {
        if ((ball.x - ball.radius) < 0) {
            this.computer.score++;
            this.resetBall(ball);
        } else if ((ball.x + ball.radius) > this.canvas.width) {
            this.user.score++;
            this.resetBall(ball);
        }
    }

    checkBallHitPaddle(ball, player) {
        const ball_top = ball.y - ball.radius;
        const ball_bottom = ball.y + ball.radius;
        const ball_left = ball.x - ball.radius;
        const ball_right = ball.x + ball.radius;

        const player_top = player.y;
        const player_bottom = player.y + player.height;
        const player_left = player.x;
        const player_right = player.x + player.width;

        /*
            ball_right > player_left --> ball hits computer paddle
            ball_bottom > player_top --> ball hits either computer or user
            ball_left > player_right --> ball hits user paddle
            ball_top > player_bottom --> ball hits either computer or user
        */

        return ball_right > player_left && ball_bottom > player_top && 
            ball_left < player_right && ball_top < player_bottom;
    }

    updateComputerPaddlePosition (ball) {
        this.computer.y += ((ball.y - (this.computer.y + this.computer.height/2))) * this.difficultyLevel;
    }

    calculateBallRebound(ball, player) {
        const paddleCentre = player.y + player.height/2;
        const rebouncePoint = ball.y - paddleCentre;

        /*
            negative rebouncePoint means the ball hits the top half,
            otherwise it is the bottom half of the paddle
            
            now we need to normalize the value of rebouncePoint to get numbers
            between -1 and 1, so

                -player.height/2 < rebouncePoint < player.height/2
                
            thus -1 means the ball hit the very top front angle of the paddle 
            and +1 means it hit the very bottom front angle of the paddle
        */
        const normalisedRebouncePoint = rebouncePoint/(player.height/2);

        /* 

            now we need to calcualte the angle in radians, as Math methods
            like cos() and sin() require angle in radians

            Math.PI/4: 2*PI radians cover 180 degrees, so in our case the
            largest angle is going to be 45 degrees which is PI/4

        */
        const angleInRadians = normalisedRebouncePoint * (Math.PI/4);

        /* 
            now we need to udpate ball velocity based on current speed
            and angle in radians
        */
        const direction = (ball.x + ball.radius < this.canvas.width/2) ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleInRadians);
        ball.velocityY = ball.speed * Math.sin(angleInRadians);

        ball.speed += this.pushTheTempo;
    }

    start(difficulty) {
        this.difficultyLevel = this.levelMap[difficulty];
        this.gameMainInterval = setInterval(() => {
            this.updateCanvas();
            this.renderCanvas();
        }, 1000 / this.framePerSecond);
    }

    pause() {
        clearInterval(this.gameMainInterval);
    }

    stop() {
        clearInterval(this.gameMainInterval);
        this.initBall(this.ball);
        this.clearScore();
        this.renderCanvas();
    }

    clearScore() {
        this.computer.score = 0;
        this.user.score = 0;
    }

    followUserMouse() {
        let rect = this.canvas.canvasElement.getBoundingClientRect();
        this.canvas.canvasElement.addEventListener("mousemove", (event) => {
            this.user.y = event.clientY - rect.top - this.user.height/2;
        });
    }
}

export default Game;
