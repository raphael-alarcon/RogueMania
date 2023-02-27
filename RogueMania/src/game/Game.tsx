import React, { useRef, useEffect, useState } from "react";
import { Characters } from "./characters/Characters";

export const Game = () => {

  // #region Constants
	const FRAME_RATE = 5;
  // #endregion

	// #region States and refs
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(
		null
	);
	const [charactersController, setCharactersController] = useState(
		<Characters context={context} characters={[]} frameCount={0} />
	);
  const childFunc = useRef<any>(null);
	// #endregion

	useEffect(() => {
		if (!canvasRef.current) return;
		const renderContext = canvasRef.current.getContext(
			"2d"
		) as CanvasRenderingContext2D;
		setContext(renderContext);
		renderContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

		renderContext.imageSmoothingQuality = "high";

		let frameCount = 0;
		let animationFrameId = 0;

		const render = () => {
			animationFrameId = requestAnimationFrame(render);
			if (animationFrameId % FRAME_RATE === 0) frameCount++;
			setCharactersController(
				<Characters
					context={renderContext}
					frameCount={frameCount}
          childFunc={childFunc}
				/>
			);
		};

		render();

		return () => {
			cancelAnimationFrame(animationFrameId);
			setContext(null);
		};
	}, [canvasRef]);

	return (
		<canvas
			width={window.innerWidth}
			height={window.innerHeight - 10}
			ref={canvasRef}
			onKeyDown={(event) => childFunc.current(event)}
			tabIndex={0}>
			{charactersController}
		</canvas>
	);
};
