import React, { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import CTX from "./CTX";
// style
import style from "./Display.module.scss";

const Display = () => {
	const { state } = useContext(CTX);
	return (
		<div className={style["display-container"]}>
			<div className={`${style["display-item"]} ${style["display-title"]}`}>
				{!state.selected ? "" : state.selected.title || "QR CODE"}
			</div>
			<div className={`${style["display-item"]} ${style["display-code"]}`}>
				{!state.selected ? null : <QRCode value={state.selected.value} />}
			</div>
			<div className={`${style["display-item"]} ${style["display-value"]}`}>
				<div>{!state.selected ? null : state.selected.value}</div>
			</div>
		</div>
	);
};

export default Display;
