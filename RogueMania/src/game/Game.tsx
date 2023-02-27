import React, { useRef, useEffect, useState } from "react";
import { Characters } from "./characters/Characters";

export const Game = () => {

  const FRAME_RATE = 13;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [charactersController, setCharactersController] = useState(<Characters context={context} characters={[]} frameCount={0} />);


  const allCharacters = [{
    type: "knightSoldier",
    id: 1,
    x: 0,
    y: 0,
  }];
  
  useEffect(() => { 
    console.log("canvasRef.current", canvasRef.current)
    if (!canvasRef.current)return;
    const renderContext = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    setContext(renderContext);
    renderContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    renderContext.imageSmoothingQuality = "high";

    let frameCount = 0;
    let animationFrameId = 0;
  
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (animationFrameId % FRAME_RATE === 0)frameCount++;
      setCharactersController(<Characters context={renderContext} characters={allCharacters} frameCount={frameCount} />);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      setContext(null);
    }

  }, [canvasRef]);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
    >
      {charactersController}
    </canvas>
  );
};


