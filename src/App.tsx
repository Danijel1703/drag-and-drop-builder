import { map } from "lodash-es";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { DraggableElementStore, ResizableField } from "./classes";
import React from "react";
import { TDraggableStore } from "./types";
import { DraggableElement } from "./components";

class DragAndDropStore {
	resizableFields: Array<ResizableField> = [];
	draggableStores: Array<DraggableElementStore> = [];

	constructor() {
		makeObservable(this, {
			resizableFields: observable,
			draggableStores: observable,
			setDraggableFields: action,
			setResizableFields: action,
		});
	}

	setResizableFields = (resizableFields: Array<ResizableField>) => {
		this.resizableFields = [...resizableFields];
	};

	createResizableField = () => {
		const resizableField = new ResizableField();
		this.setResizableFields([resizableField]);
	};

	setDraggableFields = (draggableStores: Array<TDraggableStore>) => {
		this.draggableStores = [...draggableStores];
	};

	createDraggableField = () => {
		const draggableStore = new DraggableElementStore();
		this.setDraggableFields([draggableStore]);
	};
}

const store = new DragAndDropStore();
const App = observer(() => {
	const { createDraggableField, draggableStores } = store;

	return (
		<React.Fragment>
			{map(draggableStores, (store) => (
				<DraggableElement {...store} />
			))}
			<button onClick={createDraggableField}>Create Field</button>
		</React.Fragment>
	);
});

export default App;
