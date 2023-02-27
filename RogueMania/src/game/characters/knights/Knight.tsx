import { useEffect } from "react";

export const Knight = (props: any) => {

    const knightSprite = new Image();
    knightSprite.src = props.spriteState >= 0 ? "/src/assets/sprites/knight.png" : "/src/assets/sprites/knight-reverse.png";

    const drawKnight = (ctx: any, frameCount: number, x: number, y: number) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (props.spriteState < 0) {
            ctx.drawImage(knightSprite, (props.SPRITE_SIZE*5)-(frameCount%6 * props.SPRITE_SIZE), (Math.abs(props.spriteState)-1)*props.SPRITE_SIZE, props.SPRITE_SIZE, props.SPRITE_SIZE, x, y, props.CHARACTER_SIZE, props.CHARACTER_SIZE);
            return;
        } else {
            ctx.drawImage(knightSprite, frameCount%6 * props.SPRITE_SIZE, props.spriteState*props.SPRITE_SIZE, props.SPRITE_SIZE, props.SPRITE_SIZE, x, y, props.CHARACTER_SIZE, props.CHARACTER_SIZE);
        }
    };

    useEffect(() => {
        if (!props.context)return;
        drawKnight(props.context, props.frameCount, props.x, props.y);
    }, [props.frameCount]);

    // Draw the character and animate it using the frameCount and the constants of the characters.tsx
    return (
        <div className="knight" key={props.id}>
        </div>
    );
};
