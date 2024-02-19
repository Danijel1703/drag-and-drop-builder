import { each, first, uniqueId } from "lodash-es";
import { action, makeObservable, observable } from "mobx";
import React, { ReactElement, version } from "react";
import { FieldElement, Handle } from "../components";

class ResizableField {
	width: number = 500;
	height: number = 300;
	dragging: boolean = false;
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
	];
	resizingPosition?: string = "";
	fieldElement: ReactElement = (<React.Component />);
	dragStartX: number = 0;
	dragStartY: number = 0;
	resizeStartX: number = 0;
	resizeStartY: number = 0;
	fieldRef: HTMLDivElement;
	wrapperRef: HTMLDivElement;
	currentHandle?: HTMLDivElement;

	constructor() {
		makeObservable(this);
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
						onMouseDown={this.onMouseDown}
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
				setWrapperRef={(ref) => (this.wrapperRef = ref)}
				setRef={(ref) => (this.fieldRef = ref)}
				onMouseDown={this.onMouseDown}
			/>
		);
	}

	setDragging = (dragging: boolean) => (this.dragging = dragging);

	onMouseUp = () => {
		this.setDragging(false);
		this.dragStartX = 0;
		this.dragStartY = 0;
		document.removeEventListener(
			"mousemove",
			this.resizingPosition ? this.onResize : this.onDrag
		);
		document.removeEventListener("mouseup", this.onMouseUp);
		this.resizingPosition = undefined;
	};

	onMouseDown = (event: Event, position: string) => {
		if (this.resizingPosition && this.dragging) return;
		this.resizingPosition = position;
		this.dragStartX = event.nativeEvent.offsetX;
		this.dragStartY = event.nativeEvent.offsetY;
		this.resizeStartX = event.nativeEvent.pageX;
		this.resizeStartY = event.nativeEvent.pageY;
		if (position) {
			this.currentHandle = event.nativeEvent.target;
		}
		this.setDragging(true);
		document.addEventListener(
			"mousemove",
			position ? this.onResize : this.onDrag
		);
		document.addEventListener("mouseup", this.onMouseUp);
	};

	onDrag = (event: MouseEvent) => {
		if (!this.wrapperRef) return;
		this.setPosition(
			event.pageY - this.dragStartY,
			event.pageX - this.dragStartX
		);
	};

	onResize = (event: MouseEvent) => {
		if (this.fieldRef) {
			const rect = this.fieldRef.getBoundingClientRect();
			switch (this.resizingPosition) {
				case "top-left":
					this.setDimensions(
						rect.width - event.movementX,
						rect.height - event.movementY
					);
					this.setPosition(
						this.resizeStartY -
							(this.resizeStartY - event.pageY) -
							this.dragStartY,
						this.resizeStartX -
							(this.resizeStartX - event.pageX) -
							this.dragStartX
					);
					break;
				case "top-right":
					this.setDimensions(
						rect.width + event.movementX,
						rect.height - event.movementY
					);
					this.setPosition(
						this.resizeStartY -
							(this.resizeStartY - event.pageY) -
							this.dragStartY,
						rect.left
					);
					break;
				case "bottom-left":
					this.setDimensions(
						rect.width - event.movementX,
						rect.height + event.movementY
					);
					this.setPosition(
						rect.top,
						this.resizeStartX -
							(this.resizeStartX - event.pageX) -
							this.dragStartX
					);
					break;
				case "bottom-right":
					this.setDimensions(
						rect.width + event.movementX,
						rect.height + event.movementY
					);
					break;
				default:
					break;
			}
		}
	};

	canUpdate() {
		if (!this.currentHandle) return;
		const minWidth = this.currentHandle.clientWidth;
		const minHeight = this.currentHandle.clientHeight;
		return !(this.width < minWidth * 2) && !(minHeight * 2 > this.height);
	}

	setPosition(newTop: number, newLeft: number) {
		console.log(this.currentHandle);
		if (this.currentHandle && !this.canUpdate()) return;
		this.fieldRef.style.top = `${newTop}px`;
		this.fieldRef.style.left = `${newLeft}px`;
	}

	setDimensions(newWidth: number, newHeight: number) {
		const oldWith = this.width;
		const oldHeight = this.height;
		this.setWidth(oldWith);
		this.setHeight(newHeight);
		if (!this.canUpdate()) {
			this.setWidth(newWidth);
			this.setHeight(oldHeight);
			return;
		}
		this.fieldRef.style.width = `${newWidth}px`;
		this.fieldRef.style.height = `${newHeight}px`;
	}

	setHeight = (height: number) => (this.height = height);

	setWidth = (width: number) => (this.width = width);
}

export default ResizableField;
