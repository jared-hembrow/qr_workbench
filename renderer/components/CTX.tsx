import React, { createContext, useReducer } from "react";

interface CTXState {
	input: {
		value: string;
	};
	codeList: CodeItem[];
}
type CodeItem = {
	value: string;
};
interface CTXAction {
	type: CTXActionType;
	payload?: any;
}
type CTXActionType = "ON_CHANGE_INPUT" | "CREATE_CODE";
interface CTXValue {
	state: CTXState;
	dispatch: (action: CTXAction) => void;
}
const initialState: CTXState = {
	input: {
		value: "",
	},
	codeList: [],
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
	const handleDisaptch = async (action: CTXAction) => {
		switch (action.type) {
			case "ON_CHANGE_INPUT":
				if (!action.payload) break;
				dispatch({ input: { value: action.payload } });
				break;
			case "CREATE_CODE":
				dispatch({
					codeList: [...state.codeList, { value: state.input.value }],
					input: { value: "" },
				});
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
