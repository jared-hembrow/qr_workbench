import React, { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import CTX from "./CTX";
import Play from "./Play";
// style
import style from "./Display.module.scss";

const Display = () => {
	const { state, dispatch } = useContext(CTX);
	return (
		<>
			<div className={style["display-container"]}>
				<Play />
				<div className={`${style["display-item"]} ${style["display-title"]}`}>
					{!state.selected ? "" : state.selected.title || "QR CODE"}
				</div>
				<div className={`${style["display-middle"]}`}>
					<div>
						<i
							onClick={() => dispatch({ type: "ON_CLICK_PREV" })}
							className={`${style["arrow"]} angle left icon`}
						/>
					</div>
					<div className={`${style["display-item"]} ${style["display-code"]}`}>
						{!state.selected ? null : <QRCode value={state.selected.value} />}
					</div>
					<div>
						<i
							onClick={() => dispatch({ type: "ON_CLICK_NEXT" })}
							className={`${style["arrow"]} angle right icon`}
						/>
					</div>
				</div>
				<div className={`${style["display-item"]} ${style["display-value"]}`}>
					<div>{!state.selected ? null : state.selected.value}</div>
				</div>
			</div>
		</>
	);
};

export default Display;
