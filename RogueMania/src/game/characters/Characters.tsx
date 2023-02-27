import { Children, useEffect, useState} from 'react';
import { Knight } from './knights/Knight';

export const Characters = (props: any) => {
    const CHARACTEUR_SIZE = 96;
    const SPRITE_SIZE = 192;
    const SPRITE_ANIMATION_SPEED = 0.1;
    const heroSprite = new Image();
    heroSprite.src = "/src/assets/sprites/Warrior.png";

    const drawCharacter = (ctx: any, frameCount: number, x: number, y: number) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(heroSprite, frameCount%6*SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, x, y, CHARACTEUR_SIZE, CHARACTEUR_SIZE);
    }

    useEffect(() => {
        if (!props.context)return;
        drawCharacter(props.context, props.frameCount, 0, 0);
    }, [props.frameCount]);

    return (
        <>
            {props.characters.map((character: any) => (
                <Knight 
                    key={character.id} 
                    x={character.x} 
                    y={character.y} 
                    CHARACTEUR_SIZE={CHARACTEUR_SIZE} 
                    SPRITE_SIZE={SPRITE_SIZE}
                    SPRITE_ANIMATION_SPEED={SPRITE_ANIMATION_SPEED}
                    ctx={props.context}
                    frameCount={props.frameCount}
                />
            ))}
        </>
    );
};
