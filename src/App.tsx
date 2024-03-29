import { map } from "lodash-es";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { ResizableField } from "./classes";

class DragAndDropStore {
	resizableFields: Array<ResizableField> = [];

	constructor() {
		makeObservable(this, {
			resizableFields: observable,
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
}

const store = new DragAndDropStore();
const App = observer(() => {
	const { createResizableField, resizableFields } = store;

	return (
		<div id="playground">
			{map(resizableFields, (field) => field.fieldElement)}
			<button onClick={createResizableField}>Create Field</button>
		</div>
	);
});

export default App;
