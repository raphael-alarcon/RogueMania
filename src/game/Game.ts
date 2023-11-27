import { GameObject } from "@game/gameobjects/GameObject";
import { Player } from "@gameobjects/entities/player/Player";
import { Sprite } from "@gamelogic/Sprite";
import { Position } from "@gamelogic/Position";

import charbase from "@assets/player/charbase.png";

export class Game {
    private context: CanvasRenderingContext2D;
    private gameObjects: GameObject[] = [];

    private gameFrameNumber: number = 0;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.gameObjects.push(new Player(new Sprite(charbase, 64), new Position(100, 100)));
        this.gameLoop();
    }

    private gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
        this.gameFrameNumber++;
        this.update();
    }

    private update() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.update();
            gameObject.draw(this.context);
        });
    }
}