import { TDraggablePlugin } from ".";

interface TResizablePlugin {
	setResizableRef(ref: HTMLElement): void;
	onMouseUp(): void;
	onMouseDown();
	setPosition(x: number, y: number): void;
	onResizeStart(event: Event, position: string): void;
	setIsResizing: (isResizing: boolean) => void;
	onResize: (event: MouseEvent) => void;
	setDimensions: (width: number, height: number) => void;
	setHeight: (height: number) => void;
	setWidth: (width: number) => void;
	width: number;
	height: number;
	x: number;
	y: number;
	isResizing: boolean;
	resizingPosition?: string;
	currentHandle?: HTMLDivElement;
	resizableRef: HTMLElement;
}

export default TResizablePlugin;
