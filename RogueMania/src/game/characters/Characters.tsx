import { Children, useEffect, useState } from "react";
import { Knight } from "./knights/Knight";

export const Characters = (props: any) => {

    // #region Constants
	const CHARACTER_SIZE = 96;
	const SPRITE_SIZE = 192;
	const SPRITE_ANIMATION_SPEED = 0.1;
    const MOVE_SPEED = 3;
    const MOVE_VELOCITY = 15;
    // #endregion

    // #region States and refs
	const [allCharacters, setAllCharacters] = useState([
		{
			type: "knightSoldier",
			id: 0,
			x: 0,
			y: 0,
			xv: 0,
			yv: 0,
			selected: true,
			spriteState: 0,
            attackTime: 0,
		},
	]);
    // #endregion

	// Handle the keydown event called by the game.tsx
	function handleKeyDown(event: any) {
		const key = arguments[0].key;

        let character = allCharacters.find(character => character.selected);
        if (!character)return;

        let newXVelocity = 0;
        let newYVelocity = 0;
        let newSpriteState = 0;
        let newAttackTime = 0;
        let newX = 0;
        let newY = 0;
        switch(key) {
            case "ArrowLeft":
                if (character.xv === -MOVE_VELOCITY)newX = -MOVE_SPEED;
                newXVelocity = -MOVE_VELOCITY;
                newSpriteState = -2;
                break;
            case "ArrowRight":
                if (character.xv === MOVE_VELOCITY)newX = MOVE_SPEED;
                newXVelocity = MOVE_VELOCITY;
                newSpriteState = 1;
                break;
            case " ":
                newAttackTime = 5;
                newSpriteState = 2;
                break;
            default:
                break;
        }
        setAllCharacters(
            allCharacters.map((character: any) => {
                if (character.selected) {
                    return {
                        ...character,
                        xv: newXVelocity,
                        yv: newYVelocity,
                        spriteState: newSpriteState,
                        attackTime: newAttackTime,
                        x: character.x+newX,
                        y: character.y+newY,
                    };
                }
                return character;
            })
        );
    }

	const handleSmoothMovement = () => {
        let character = allCharacters.find(character => character.selected);
        if (!character)return;

        let movement = 0;
        let newSpriteState = 0;
        let attack = 0;
        if (character.xv != 0) {
            movement = character.xv > 0 ? +MOVE_SPEED : -MOVE_SPEED;
            newSpriteState = character.xv > 0 ? 1 : -1;
        }
        if (character.attackTime != 0) {
            newSpriteState = 2;
            attack = 1;
        }
        setAllCharacters(
            allCharacters.map((character: any) => {
                if (character.selected) {
                    return {
                        ...character,
                        x: character.x+movement,
                        xv: character.xv-movement,
                        spriteState: newSpriteState,
                        attackTime: character.attackTime-attack,
                    };
                }
                return character;
            })
        );

        
		// setAllCharacters(
		// 	allCharacters.map((character: any) => {
		// 		if (character.xv != 0) {
        //             if (character.xv > 0) {
        //                 return {
        //                     ...character,
        //                     x: character.x+MOVE_SPEED,
        //                     xv: character.xv-MOVE_SPEED,
        //                 };
        //             }
        //             return {
        //                 ...character,
        //                 x: character.x-MOVE_SPEED,
        //                 xv: character.xv+MOVE_SPEED,
        //             };
        //         }
        //         if (character.attackTime != 0) {
        //             return {
        //                 ...character,
        //                 attackTime: character.attackTime - 1,
        //             };
        //         }
        //         return {
        //             ...character,
        //             spriteState: 0,
        //         }
        //     })
        // );
    };

	useEffect(() => {
		if (!props.context) return;
        props.childFunc.current = handleKeyDown;
        handleSmoothMovement();
	}, [props.frameCount]);

	return (
		<>
			{allCharacters.map((character: any) => (
				<Knight
					key={character.id}
					x={character.x}
					y={character.y}
					CHARACTER_SIZE={CHARACTER_SIZE}
					SPRITE_SIZE={SPRITE_SIZE}
					SPRITE_ANIMATION_SPEED={SPRITE_ANIMATION_SPEED}
					context={props.context}
					frameCount={props.frameCount}
                    spriteState={character.spriteState}
				/>
			))}
		</>
	);
};
