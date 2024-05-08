import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { DraggablePlugin, ResizablePlugin } from "./classes";
import React from "react";
import { DraggableComponent, ResizableComponent } from "./components";
import { TDraggablePlugin, TResizablePlugin } from "./types";

class DragAndDropStore {
	draggablePlugin: TDraggablePlugin;
	resizablePlugin: TResizablePlugin;

	constructor() {
		makeObservable(this, {
			draggablePlugin: observable,
			resizablePlugin: observable,
			setDraggablePlugin: action,
			setResizablePlugin: action,
		});
	}

	setDraggablePlugin = (draggablePlugin: TDraggablePlugin) => {
		this.draggablePlugin = draggablePlugin;
	};

	setResizablePlugin = (resizablePlugin: TResizablePlugin) => {
		this.resizablePlugin = resizablePlugin;
	};

	createDraggableComponent = () => {
		const draggablePlugin = new DraggablePlugin();
		this.setDraggablePlugin(draggablePlugin);
	};

	createResizableComponent = () => {
		const resizablePlugin = new ResizablePlugin();
		this.setResizablePlugin(resizablePlugin);
	};
}

const store = new DragAndDropStore();
const App = observer(() => {
	const {
		createDraggableComponent,
		draggablePlugin,
		createResizableComponent,
		resizablePlugin,
	} = store;

	return (
		<React.Fragment>
			<DraggableComponent plugin={draggablePlugin} />
			<ResizableComponent plugin={resizablePlugin} />
			<button onClick={createDraggableComponent}>Create Draggable Field</button>
			<button onClick={createResizableComponent}>Create Resizable Field</button>
		</React.Fragment>
	);
});

export default App;
