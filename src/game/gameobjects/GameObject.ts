import { Position } from "@game/gamelogic/Position";
import { Sprite } from "@gamelogic/Sprite";

export abstract class GameObject {
    protected position: Position;
    protected sprite: Sprite;

    constructor(position: Position, sprite: Sprite) {
        this.position = position;
        this.sprite = sprite;
    }

    abstract get frame(): number[];

    abstract update(): void;

    draw(context: CanvasRenderingContext2D | null) {
        if (!context || !this.sprite.isLoaded) return;
        const [frameX, frameY]: number[] = this.frame;
        context.drawImage(this.sprite.sprite, frameX, frameY, this.sprite.SPRITE_SIZE, this.sprite.SPRITE_SIZE, this.position.x, this.position.y, this.sprite.SPRITE_SIZE*2, this.sprite.SPRITE_SIZE*2);
        this.sprite.updateAnimationProgress();
    }
}