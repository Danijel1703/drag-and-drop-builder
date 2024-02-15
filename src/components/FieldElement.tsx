import { map, uniqueId } from "lodash-es";
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
				className="resizable-field-wrapper"
				ref={(ref) => this.props.setWrapperRef(ref)}
				onMouseDown={this.props.onMouseDown}
			>
				<div className="resizable-field" ref={(ref) => this.props.setRef(ref)}>
					{map(this.props.resizeHandles, (handle) => handle.element)}
				</div>
			</div>
		);
	}
}

export default FieldElement;
