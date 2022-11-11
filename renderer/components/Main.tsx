import React, { useContext, useEffect } from "react";
import CTX, { CTXProvider } from "./CTX";
import Input from "./Input";
import List from "./List";
import Display from "./Display";
// style
import style from "./Main.module.scss";

const MainComponent = () => {
	const { dispatch } = useContext(CTX);

	useEffect(() => {
		console.log("init");
		dispatch({ type: "INIT_APP" });
	}, []);

	return (
		<div className={style["container"]}>
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
