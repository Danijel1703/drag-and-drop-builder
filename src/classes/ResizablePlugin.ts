import { round } from "lodash-es";
import { TResizablePlugin } from "../types";

class ResizablePlugin implements TResizablePlugin {
	width: number = 500;
	height: number = 300;
	x: number = 0;
	y: number = 0;
	isResizing: boolean = false;
	resizingPosition?: string = "";
	currentHandle?: HTMLDivElement;
	resizableRef: HTMLElement;

	setResizableRef = (ref: HTMLElement) => {
		this.resizableRef = ref;
	};

	onMouseUp = () => {
		document.removeEventListener("mousemove", this.onResize);
		this.setIsResizing(false);
		this.resizingPosition = undefined;
	};

	onResizeStart = (event: Event, position: string) => {
		this.setIsResizing(true);
		this.resizingPosition = position;
		this.currentHandle = event.nativeEvent.target;
		document.addEventListener("mousemove", this.onResize);
		document.addEventListener("mouseup", this.onMouseUp);
	};

	setIsResizing = (isResizing: boolean) => (this.isResizing = isResizing);

	onResize = (event: MouseEvent) => {
		if (!this.resizableRef) return;
		const rect = this.resizableRef.getBoundingClientRect();
		switch (this.resizingPosition) {
			case "top-left": {
				const diffX = rect.width - (rect.width - event.movementX);
				const diffY = rect.height - (rect.height - event.movementY);
				this.setDimensions(
					rect.width - event.movementX,
					rect.height - event.movementY
				);
				let y = rect.top + diffY;
				let x = rect.left + diffX;
				if (x > rect.right) {
					x = rect.left;
				}
				if (y > rect.bottom) {
					y = rect.top;
				}
				this.setPosition(x, y);
				break;
			}
			case "top-right": {
				const diff = rect.height - (rect.height - event.movementY);
				this.setDimensions(
					rect.width + event.movementX,
					rect.height - event.movementY
				);
				const y = rect.top + diff;
				if (y < rect.bottom) this.setPosition(rect.x, y);
				break;
			}
			case "bottom-left": {
				const diff = rect.width - (rect.width - event.movementX);
				this.setDimensions(
					rect.width - event.movementX,
					rect.height + event.movementY
				);
				const x = rect.left + diff;
				if (x < rect.right) this.setPosition(x, rect.top);
				break;
			}
			case "bottom-right":
				this.setDimensions(
					rect.width + event.movementX,
					rect.height + event.movementY
				);
				break;
			case "top": {
				const diff = rect.height - (rect.height - event.movementY);
				this.setDimensions(rect.width, rect.height - event.movementY);
				const y = rect.top + diff;
				if (y < rect.bottom) this.setPosition(rect.x, y);
				break;
			}
			case "bottom":
				this.setDimensions(rect.width, rect.height + event.movementY);
				break;
			case "left": {
				const diff = rect.width - (rect.width - event.movementX);
				this.setDimensions(rect.width - event.movementX, rect.height);
				const x = rect.left + diff;
				if (x < rect.right) this.setPosition(x, rect.top);
				break;
			}
			case "right":
				this.setDimensions(
					rect.width + event.movementX,
					rect.height + event.movementY
				);
				break;
			default:
				break;
		}
	};

	canUpdate() {
		if (!this.currentHandle) return;
		const minWidth = this.currentHandle.clientWidth;
		const minHeight = this.currentHandle.clientHeight;
		return !(this.width < minWidth * 2) && !(minHeight * 2 > this.height);
	}

	setDimensions(newWidth: number, newHeight: number) {
		const [top, right, bottom, left] = getComputedStyle(
			this.resizableRef
		).borderWidth.match(/\d+/g);
		const borderLeft = Number(left) ? left : 0;
		const borderRight = Number(right) ? right : 0;
		const borderTop = Number(top) ? top : 0;
		const borderBottom = Number(bottom) ? bottom : 0;
		const borderWidth = borderLeft - borderRight;
		const borderHeight = borderTop - borderBottom;
		newWidth = round(newWidth) - borderWidth;
		newHeight = round(newHeight) - borderHeight;
		this.setWidth(newWidth);
		this.setHeight(newHeight);
		this.resizableRef.style.width = `${newWidth}px`;
		this.resizableRef.style.height = `${newHeight}px`;
	}

	setPosition = (x: number, y: number) => {
		this.x = round(x);
		this.y = round(y);
		this.resizableRef.style.transform = `translate(${this.x}px, ${this.y}px)`;
	};

	setHeight = (height: number) => (this.height = height);

	setWidth = (width: number) => (this.width = width);
}

export default ResizablePlugin;
