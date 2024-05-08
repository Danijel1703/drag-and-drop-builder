import { TDraggablePlugin } from "../types";

export default function DraggableComponent({
	plugin,
}: {
	plugin: TDraggablePlugin;
}) {
	if (!plugin) return <></>;
	const { onDragStart, setDraggableRef } = plugin;
	return (
		<div
			className="draggable-component"
			onMouseDown={onDragStart}
			ref={(ref) => setDraggableRef(ref as HTMLElement)}
		></div>
	);
}
