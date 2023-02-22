import React, { useRef, useEffect } from "react";

export const Game = () => {

  // Constants
  const CHARACTEUR_SIZE = 96;
  const SPRITE_SIZE = 192;
  const SPRITE_ANIMATION_SPEED = 0.1;

  const knightSprite = new Image();
  knightSprite.src = "/src/assets/sprites/Warrior.png";
  // Resize the sprite to smaller size

  const canvasRef = useRef(null);
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.imageSmoothingEnabled = false;
    // Rescale the sprite to smaller size and draw it
    ctx.drawImage(knightSprite, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 0, 0, CHARACTEUR_SIZE, CHARACTEUR_SIZE);
  };
    

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.imageSmoothingQuality = "high";
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas 
    width={window.innerWidth}
    height={window.innerHeight}
  ref={canvasRef} />;
};
