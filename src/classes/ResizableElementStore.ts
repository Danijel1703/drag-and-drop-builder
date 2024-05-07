import { each, round, uniqueId } from "lodash-es";
import React, { ReactElement } from "react";
import { FieldElement, Handle } from "../components";

class ResizableField {
	width: number = 500;
	height: number = 300;
	x: number = 0;
	y: number = 0;
	isResizing: boolean = false;
	resizeHandles: Array<{ position: string; element: ReactElement }> = [
		{
			position: "top-left",
			element: <React.Component />,
		},
		{
			position: "top-right",
			element: <React.Component />,
		},
		{
			position: "bottom-left",
			element: <React.Component />,
		},
		{
			position: "bottom-right",
			element: <React.Component />,
		},
		{
			position: "top",
			element: <React.Component />,
		},
		{
			position: "bottom",
			element: <React.Component />,
		},
		{
			position: "right",
			element: <React.Component />,
		},
		{
			position: "left",
			element: <React.Component />,
		},
	];
	resizingPosition?: string = "";
	fieldElement: ReactElement = (<React.Component />);
	dragStartX: number = 0;
	dragStartY: number = 0;
	fieldRef: HTMLDivElement;
	currentHandle?: HTMLDivElement;

	constructor() {
		this.initializeHandles();
		this.initializeFieldElement();
	}

	initializeHandles() {
		each(
			this.resizeHandles,
			(handle) =>
				(handle.element = (
					<Handle
						key={uniqueId()}
						className={`resize-handle  ${handle.position}`}
						onMouseDown={this.onResizeStart}
						position={handle.position}
					/>
				))
		);
	}

	initializeFieldElement() {
		this.fieldElement = (
			<FieldElement
				key={uniqueId()}
				resizeHandles={this.resizeHandles}
				setRef={(ref) => (this.fieldRef = ref)}
				onMouseDown={this.onDragStart}
			/>
		);
	}

	onMouseUp = () => {
		document.removeEventListener("mousemove", this.onResize);
		document.removeEventListener("mousemove", this.onDrag);
		this.setIsResizing(false);
		this.dragStartX = 0;
		this.dragStartY = 0;
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

	onDrag = (event: MouseEvent) => {
		if (this.isResizing) return;
		this.setPosition(
			event.pageX - this.dragStartX,
			event.pageY - this.dragStartY
		);
	};

	onDragStart = (event: Event) => {
		this.dragStartX = event.nativeEvent.offsetX;
		this.dragStartY = event.nativeEvent.offsetY;
		document.addEventListener("mousemove", this.onDrag);
		document.addEventListener("mouseup", this.onMouseUp);
	};

	onResize = (event: MouseEvent) => {
		if (!this.fieldRef) return;
		const rect = this.fieldRef.getBoundingClientRect();
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

	setPosition(newLeft: number, newTop: number) {
		this.x = round(newLeft);
		this.y = round(newTop);
		this.fieldRef.style.transform = `translate(${this.x}px, ${this.y}px)`;
	}

	setDimensions(newWidth: number, newHeight: number) {
		const [top, right, bottom, left] = getComputedStyle(
			this.fieldRef
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
		this.fieldRef.style.width = `${newWidth}px`;
		this.fieldRef.style.height = `${newHeight}px`;
	}

	setHeight = (height: number) => (this.height = height);

	setWidth = (width: number) => (this.width = width);
}

export default ResizableField;
