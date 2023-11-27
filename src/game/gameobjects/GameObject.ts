import { Position } from "@game/gamelogic/Position";
import { Sprite } from "@gamelogic/Sprite";
import { Core } from "../core/Core";
import { getCenterOfCanvas } from "@/utils/tools";

export abstract class GameObject {
    public position: Position;
    public sprite: Sprite;

    constructor(position: Position, sprite: Sprite) {
        this.position = position;
        this.sprite = sprite;
    }

    abstract get frame(): number[];

    abstract update(): void;

    draw(context: CanvasRenderingContext2D | null) {
        if (!context || !this.sprite.isLoaded) return;
        const [frameX, frameY]: number[] = this.frame;
        const coordinatesOnScreen: Position = new Position(getCenterOfCanvas(context.canvas).x - this.sprite.SPRITE_SIZE/2*Core.SCALE, getCenterOfCanvas(context.canvas).y - this.sprite.SPRITE_SIZE/2*Core.SCALE);
        context.drawImage(this.sprite.sprite, frameX, frameY, this.sprite.SPRITE_SIZE, this.sprite.SPRITE_SIZE, coordinatesOnScreen.x, coordinatesOnScreen.y, this.sprite.SPRITE_SIZE*Core.SCALE, this.sprite.SPRITE_SIZE*Core.SCALE);
        this.sprite.updateAnimationProgress();
    }
}