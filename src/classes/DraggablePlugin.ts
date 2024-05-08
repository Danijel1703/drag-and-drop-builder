import { round } from "lodash-es";
import { TDraggablePlugin } from "../types";

class DraggablePlugin implements TDraggablePlugin {
	x: number = 0;
	y: number = 0;
	isResizing: boolean = false;
	dragStartX: number = 0;
	dragStartY: number = 0;
	draggableRef: HTMLElement;

	setDraggableRef = (ref: HTMLElement) => {
		this.draggableRef = ref;
	};

	onMouseUp = () => {
		document.removeEventListener("mousemove", this.onDrag);
		this.dragStartX = 0;
		this.dragStartY = 0;
	};

	onDrag = (event: MouseEvent) => {
		if (this.isResizing) return;
		this.setPosition(
			event.pageX - this.dragStartX,
			event.pageY - this.dragStartY
		);
	};

	onDragStart = (event: MouseEvent) => {
		this.dragStartX = event.nativeEvent.offsetX;
		this.dragStartY = event.nativeEvent.offsetY;
		document.addEventListener("mousemove", this.onDrag);
		document.addEventListener("mouseup", this.onMouseUp);
	};

	setPosition = (x: number, y: number) => {
		this.x = round(x);
		this.y = round(y);
		this.draggableRef.style.transform = `translate(${this.x}px, ${this.y}px)`;
	};
}

export default DraggablePlugin;
