import React, { MouseEventHandler } from "react";

type THandleProps = {
	position: string;
	className: string;
	onMouseDown: (e: MouseEventHandler<HTMLDivElement>, position: string) => void;
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
				onDragStart={(e) => e.preventDefault()}
			></div>
		);
	}
}

export default Handle;
