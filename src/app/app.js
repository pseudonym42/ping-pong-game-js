/*
    Ping Pong Game written in JavaScript
*/

import Canvas from "./components/Canvas";
import Player from "./components/Player";
import Ball from "./components/Ball";
import Game from "./components/Game";

const canvas = new Canvas("root")
const user = new Player(canvas, "user");
const computer = new Player(canvas, "computer");
const ball = new Ball("red", canvas.width/2, canvas.height/2);
const game = new Game(canvas, ball, user, computer);


game.renderCanvas();
game.followUserMouse();

let playButton = document.getElementById("play_button");
let resetButton = document.getElementById("reset_button");
let settings = document.getElementById("settings");
let computerLevel;

resetButton.style.display = "none";

playButton.addEventListener("click", function (event){
    resetButton.style.display = "";
    settings.style.display = "none";
    computerLevel = document.getElementById("computer_level").value;

    if (event.target.value == "off") {
        game.start(computerLevel);
        event.target.value = "on";
        event.target.innerHTML = "PAUSE"
    } else {
        game.pause();
        event.target.value = "off";
        event.target.innerHTML = "PLAY"
    }
});

resetButton.addEventListener("click", function (event){
    resetButton.style.display = "none";
    settings.style.display = "";
    playButton.value = "off";
    playButton.innerHTML = "PLAY";
    game.stop();
});