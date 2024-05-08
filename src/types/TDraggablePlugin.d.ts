interface TDraggableStore {
	setDraggableRef(ref: HTMLElement): void;
	onMouseUp(): void;
	onDrag(event: MouseEvent): void;
	onDragStart(event: MouseEvent): void;
	setPosition(x: number, y: number): void;
	x: number;
	y: number;
	isResizing: boolean;
	dragStartX: number;
	dragStartY: number;
	draggableRef: HTMLElement;
}
export default TDraggableStore;
