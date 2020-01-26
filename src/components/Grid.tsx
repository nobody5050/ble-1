import React, { FunctionComponent, useContext } from 'react';
import { Graphics, RenderTexture, Renderer } from 'pixi.js';
import { TilingSprite, AppContext } from 'react-pixi-fiber';
import { observer } from 'mobx-react-lite';

import { useStore } from 'src/hooks/useStore';

function makeTilingSprite(snapping: number, renderer: Renderer): RenderTexture {
	const graphics = new Graphics();
	graphics.lineStyle(1, 0xffffff, 0.25, 0);

	graphics.moveTo(0, snapping);
	graphics.lineTo(0, 0);
	graphics.lineTo(snapping, 0);

	const rt = RenderTexture.create({
		width: snapping,
		height: snapping,
	});
	renderer.render(graphics, rt);

	return rt;
}

const Level: FunctionComponent<{}> = () => {
	const { editor } = useStore();

	const { renderer } = useContext(AppContext);

	const texture = makeTilingSprite(editor.gridCellSize, renderer);
	const width = renderer.width * (1/editor.scale);
	const height = renderer.height * (1/editor.scale);

	return (
		<TilingSprite texture={texture} width={width} height={height}/>
	);
};
export default observer(Level);
