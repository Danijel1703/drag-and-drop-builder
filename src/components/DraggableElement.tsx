import { TDraggableStore } from "../types";

export default function DraggableElement(props: TDraggableStore) {
	console.log(props);
	return (
		<div
			className="draggable-field"
			onMouseDown={props.onDragStart}
			ref={(ref) => props.setDraggableRef(ref as HTMLElement)}
		></div>
	);
}
