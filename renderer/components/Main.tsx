import React, { useState } from "react";
import QRCode from "react-qr-code";
import { CTXProvider } from "./CTX";
import Input from "./Input";
import List from "./List";
// style
import style from "./Main.module.scss";

type Props = {};

const MainComponent = (props: Props) => {
	const [value, setValue] = useState<string>("");
	const [list, setList] = useState<string[]>([]);
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
				<QRCode value={value} />
			</div>
		</div>
	);
};
const Main = (props: Props) => {
	return (
		<CTXProvider>
			<MainComponent {...props} />
		</CTXProvider>
	);
};
export default Main;
