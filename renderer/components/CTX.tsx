import React, { createContext, useReducer } from "react";
import { ipcRenderer } from "electron";

interface CTXState {
	input: {
		value: string;
	};
	codeList: CodeItem[];
	selected: CodeItem | null;
	selectedIdx: number | null;
	edit: CodeItem | null;
	editTitle: CodeItem | null;
	play: boolean;
	slideShowDuration: number;
}
export type CodeItem = {
	id: string;
	value: string;
	title: string;
};
interface CTXAction {
	type: CTXActionType;
	payload?: any;
}
type CTXActionType =
	| "INIT_APP"
	| "ON_CHANGE_INPUT"
	| "CREATE_CODE"
	| "ON_CLICK_CODE"
	| "ON_DELETE"
	| "ON_EDIT"
	| "ON_SUBMIT_EDIT"
	| "ON_CANCEL_EDIT"
	| "ON_EDIT_TITLE"
	| "ON_SUBMIT_EDIT_TITLE"
	| "ON_CANCEL_EDIT_TITLE"
	| "ON_CLICK_PREV"
	| "ON_CLICK_NEXT"
	| "ON_PLAY"
	| "ON_STOP"
	| "ON_CHANGE_SLIDE_SHOW_DURATION"
	| "ON_ENTER_INDEX";

interface CTXValue {
	state: CTXState;
	dispatch: (action: CTXAction) => void;
}

// Generate a random id
const idGen = (): string => {
	const S4 = () =>
		(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	return S4() + "-" + S4();
};

const initialState: CTXState = {
	input: {
		value: "",
	},
	codeList: [],
	selected: null,
	selectedIdx: -1,
	edit: null,
	editTitle: null,
	play: false,
	slideShowDuration: 1000,
};
const CTX = createContext<CTXValue>({
	state: initialState,
	dispatch: (action) => {
		return;
	},
});

export const CTXProvider = ({ children }: { children: JSX.Element }) => {
	const reducer = (state: CTXState, payload: any) => {
		return { ...state, ...payload };
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const writeDB = async (list: CodeItem[]) => {
		ipcRenderer
			.invoke("write-db", JSON.stringify({ codes: list }))
			.then((result) => {
				console.log("Write Result: ", result);
			});
	};

	const handleDisaptch = async (action: CTXAction) => {
		switch (action.type) {
			case "INIT_APP":
				await ipcRenderer.invoke("read-db").then((result) => {
					dispatch({ codeList: JSON.parse(result).codes });
				});
				break;
			case "ON_CHANGE_INPUT":
				dispatch({ input: { value: action.payload } });
				break;
			case "CREATE_CODE":
				if (!state.input.value) break;
				const addToList = [
					...state.codeList,
					{
						id: idGen(),
						title: "",
						value: state.input.value,
					},
				];
				dispatch({
					codeList: addToList,
					input: { value: "" },
				});
				writeDB(addToList);
				break;
			case "ON_CLICK_CODE":
				const itemIdx = state.codeList.findIndex(
					(item: CodeItem) => item.id === action.payload.id
				);
				dispatch({ selected: action.payload, selectedIdx: itemIdx });
				break;
			case "ON_DELETE":
				console.log(action);
				const deleteFromList = state.codeList.filter(
					(item: CodeItem) => item.id !== action.payload.id
				);
				dispatch({
					codeList: deleteFromList,
					selected: !state.selected
						? null
						: state.selected.id === action.payload.id
						? null
						: state.selected,
				});
				writeDB(deleteFromList);
				break;
			case "ON_EDIT":
				dispatch({
					edit: !state.edit
						? action.payload
						: state.edit.id === action.payload.id
						? null
						: action.payload,
				});
				break;

			case "ON_SUBMIT_EDIT":
				console.log("editing value");
				let tempEditList: CodeItem[] = state.codeList;
				tempEditList[
					tempEditList.findIndex((item) => item.id === action.payload.item.id)
				].value = action.payload.value;
				dispatch({ codeList: tempEditList, editTitle: null, edit: null });
				writeDB(tempEditList);
				break;
			case "ON_CANCEL_EDIT":
				dispatch({ edit: null });
				break;
			case "ON_EDIT_TITLE":
				dispatch({
					editTitle: !state.editTitle
						? action.payload
						: state.editTitle.id === action.payload.id
						? null
						: action.payload,
				});
				break;
			case "ON_CANCEL_EDIT_TITLE":
				dispatch({ editTitle: null });
				break;

			case "ON_SUBMIT_EDIT_TITLE":
				console.log("editing Title");

				let tempList: CodeItem[] = state.codeList;
				tempList[
					tempList.findIndex((item) => item.id === action.payload.item.id)
				].title = action.payload.value;
				dispatch({ codeList: tempList, editTitle: null, edit: null });
				writeDB(tempList);
				break;

			case "ON_CLICK_PREV":
				if (state.selectedIdx < 1) break;
				const prevIdx = state.selectedIdx - 1;
				dispatch({ selected: state.codeList[prevIdx], selectedIdx: prevIdx });
				break;
			case "ON_CLICK_NEXT":
				if (state.selectedIdx === state.codeList.length - 1) break;
				const nextIdx = state.selectedIdx + 1;
				dispatch({ selected: state.codeList[nextIdx], selectedIdx: nextIdx });
				break;
			case "ON_ENTER_INDEX":
				dispatch({
					selected: state.codeList[action.payload],
					selectedIdx: action.payload,
				});
				break;
			case "ON_PLAY":
				dispatch({ play: true });
				break;
			case "ON_STOP":
				dispatch({ play: false });
				break;
			case "ON_CHANGE_SLIDE_SHOW_DURATION":
				if (action.payload.type === "inc") {
					if (!state.slideShowDuration) {
						dispatch({ slideShowDuration: 1000 });
						break;
					}
					dispatch({ slideShowDuration: state.slideShowDuration + 1000 });
				}
				if (action.payload.type === "dec") {
					if (!state.slideShowDuration) {
						dispatch({ slideShowDuration: 1000 });
						break;
					}
					if (state.slideShowDuration <= 1000) break;
					dispatch({ slideShowDuration: state.slideShowDuration - 1000 });
				}
				if (action.payload.type === "enter")
					dispatch({ slideShowDuration: action.payload.value });
				break;
			default:
				break;
		}
	};
	return (
		<CTX.Provider value={{ state, dispatch: handleDisaptch }}>
			{children}
		</CTX.Provider>
	);
};

export default CTX;
