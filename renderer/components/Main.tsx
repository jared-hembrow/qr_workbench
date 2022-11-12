import React, { useContext, useEffect } from "react";
import CTX, { CTXProvider } from "./CTX";
import Input from "./Input";
import List from "./List";
import Display from "./Display";
// style
import style from "./Main.module.scss";

const MainComponent = () => {
	const { state, dispatch } = useContext(CTX);

	useEffect(() => {
		dispatch({ type: "INIT_APP" });
	}, []);

	useEffect(() => {
		if (state.play) {
			setTimeout(() => {
				let idx: number = state.selectedIdx + 1;
				if (state.selectedIdx === state.codeList.length - 1) idx = 0;
				dispatch({ type: "ON_ENTER_INDEX", payload: idx });
			}, state.slideShowDuration);
		}
	}, [state.play, state.selectedIdx]);

	return (
		<div
			className={style["container"]}
			onKeyDown={(e) => {
				if (document.activeElement.classList.contains("input-type")) return;
				if (e.key === "ArrowRight") {
					dispatch({ type: "ON_CLICK_NEXT" });
				}
				if (e.key === "ArrowLeft") {
					dispatch({ type: "ON_CLICK_PREV" });
					console.log(e);
				}
			}}
			tabIndex={0}
		>
			<div className={style["column-left"]}>
				<div className={style["column-left-row-top"]}>
					<Input />
				</div>
				<div className={style["column-left-row-bottom"]}>
					<List />
				</div>
			</div>
			<div className={style["column-right"]}>
				<Display />
			</div>
		</div>
	);
};
const Main = () => {
	return (
		<CTXProvider>
			<MainComponent />
		</CTXProvider>
	);
};
export default Main;
