export class Sprite {
    public SPRITE_SIZE: number;

    public sprite: HTMLImageElement;

    public isLoaded: boolean = false;

    public numberOfFrames: number;

    public static readonly ANIMATION_FRAME_LIMIT: number = 24;
    public animationFrameProgress: number = Sprite.ANIMATION_FRAME_LIMIT;

    public currentAnimationFrame: number = 0;

    constructor(assetPath: string, size: number) {
        this.SPRITE_SIZE = size;
        this.sprite = new Image();
        this.sprite.src = assetPath;
        this.sprite.onload = () => {
            this.isLoaded = true;
        };
        this.SPRITE_SIZE = size;
        this.numberOfFrames = this.sprite.width / this.SPRITE_SIZE;
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress--;
            return;
        }
        this.animationFrameProgress = Sprite.ANIMATION_FRAME_LIMIT;
        this.currentAnimationFrame++;
        if (this.currentAnimationFrame > this.numberOfFrames-1) {
            this.currentAnimationFrame = 0;
        }
    }

}