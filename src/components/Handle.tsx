import { uniqueId } from "lodash-es";
import React, { MouseEventHandler } from "react";

type THandleProps = {
	position: string;
	className: string;
	onMouseDown: (e: MouseEventHandler<HTMLDivElement>, position: string) => void;
	setRef: (ref: HTMLDivElement) => void;
};

class Handle extends React.Component<THandleProps> {
	constructor(props: THandleProps) {
		super(props);
	}

	render() {
		return (
			<div
				className={this.props.className}
				onMouseDown={(event: MouseEventHandler<HTMLDivElement>) =>
					this.props.onMouseDown(event, this.props.position)
				}
				ref={this.props.setRef}
			></div>
		);
	}
}

export default Handle;
