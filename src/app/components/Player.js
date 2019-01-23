class Player {
    constructor(canvas, userType) {
        let paddleHeight = 100,
            paddleWidth = 10,
            paddleColour = "white";
        
        switch(userType) {
            case "user":
                this.x = 0;
                break;
            case "computer":
                this.x = canvas.width - paddleWidth;
                break;
        }
        
        this.y = (canvas.height - paddleHeight)/2;
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.colour = paddleColour;
        this.score = 0;
    }
}

export default Player;
