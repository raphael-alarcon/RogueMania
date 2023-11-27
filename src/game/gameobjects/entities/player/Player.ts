import { Position } from "@/game/gamelogic/Position";
import { Entity } from "@entities/Entity";
import { Sprite } from "@/game/gamelogic/Sprite";
import { EntityStatus, keyboardActionMap, directionUpdateMap } from "@/utils/Constants";
import { Camera } from "@/game/gamelogic/Camera";
import { getPositionOfCamera } from "@/utils/tools";

export class Player extends Entity {

    public camera: Camera;

    get frame(): number[] {
        let frameX: number = this.shouldBeAnimated() ? this.sprite.SPRITE_SIZE * this.sprite.currentAnimationFrame : 0;
        let frameY: number = (this.status*this.sprite.SPRITE_SIZE) + (this.sprite.SPRITE_SIZE * this.direction);
        return [frameX, frameY];
    }

    public pressedKeys: {
        [key: string]: boolean;
    } = {
        "ArrowUp": false,
        "ArrowDown": false,
        "ArrowRight": false,
        "ArrowLeft": false
    }

    constructor(sprite: Sprite, position: Position, camera: Camera) {
        super(sprite, position);
        this.sprite.numberOfFrames-=2;
        this.camera = camera;
        camera.position = getPositionOfCamera(this);
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    override update() {
        if (this.status == EntityStatus.MOVING) {
            for(let key in this.pressedKeys) {
                if (this.pressedKeys[key]) {
                    const [property, posUpdate]: [string, number] = directionUpdateMap[keyboardActionMap[key]];
                    this.position[property as keyof Position] += posUpdate;
                    let cameraTheoreticalPosition: Position = new Position(this.camera.x, this.camera.y);
                    cameraTheoreticalPosition[property as keyof Position] += posUpdate;
                    if (this.camera.isInBoundaries(cameraTheoreticalPosition))this.camera.position[property as keyof Position] += posUpdate;
                }
            }
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        if (Object.keys(keyboardActionMap).indexOf(event.key) == -1) return;
        this.pressedKeys[event.key] = true;
        this.direction = keyboardActionMap[event.key];
        this.status = EntityStatus.MOVING;   
    }

    handleKeyUp(event: KeyboardEvent) {
        this.pressedKeys[event.key] = false;
        if (Object.values(this.pressedKeys).every((value) => !value)) {
            this.status = EntityStatus.IDLE;
            return;
        }
        this.direction = keyboardActionMap[Object.keys(this.pressedKeys).find((key) => this.pressedKeys[key])!];
    }

    shouldBeAnimated(): boolean {
        return this.status != EntityStatus.IDLE;
    }
}
