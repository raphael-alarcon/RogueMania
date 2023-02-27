export const Knight = (props: any) => {

    const knightSprite = new Image();
    knightSprite.src = "/src/assets/sprites/Warrior.png";

    // Draw the character and animate it using the frameCount and the constants of the characters.tsx
    return (
        <div className="knight" key={props.id}>
        </div>
    );
};
