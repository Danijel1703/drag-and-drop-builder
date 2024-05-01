import { map } from "lodash-es";
import React, { MouseEventHandler, ReactElement } from "react";

type TResizeHandles = {
	position: string;
	element: ReactElement;
};

type TFieldElementProps = {
	resizeHandles: Array<TResizeHandles>;
	setRef: (ref: HTMLDivElement) => void;
	setWrapperRef: (ref: HTMLDivElement) => void;
	onMouseDown: (e: MouseEventHandler<HTMLDivElement>) => void;
};
class FieldElement extends React.Component<TFieldElementProps> {
	constructor(props: TFieldElementProps) {
		super(props);
	}
	render() {
		return (
			<div
				className="resizable-field"
				onMouseDown={this.props.onMouseDown}
				ref={(ref) => this.props.setRef(ref)}
			>
				{map(this.props.resizeHandles, (handle) => handle.element)}
			</div>
		);
	}
}

export default FieldElement;
