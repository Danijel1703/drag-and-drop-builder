import { map } from "lodash-es";
import { MouseEventHandler } from "react";
import { resizeHandles } from "../constants";
import { TResizablePlugin } from "../types";

type THandleProps = {
	position: string;
	onResizeStart: (e: Event, position: string) => void;
};

const ResizableComponent = ({ plugin }: { plugin: TResizablePlugin }) => {
	if (!plugin) return <></>;
	const { setResizableRef, onResizeStart } = plugin;
	return (
		<div className="resizable-component" ref={(ref) => setResizableRef(ref)}>
			{map(Object.values(resizeHandles), (handle) => (
				<ResizeHandle onResizeStart={onResizeStart} position={handle} />
			))}
		</div>
	);
};

const ResizeHandle = ({ onResizeStart, position }: THandleProps) => {
	return (
		<div
			className={`resize-handle  ${position}`}
			onMouseDown={(event: MouseEventHandler<HTMLDivElement>) =>
				onResizeStart(event, position)
			}
			onDragStart={(e) => e.preventDefault()}
		></div>
	);
};

export default ResizableComponent;
