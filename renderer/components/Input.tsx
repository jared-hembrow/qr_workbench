import React, { useContext } from "react";
import CTX from "./CTX";
// style
import style from "./Input.module.scss";
type Props = {};

const Input = (props: Props) => {
	const { state, dispatch } = useContext(CTX);
	return (
		<div className={style["input-container"]}>
			<div className={style["header"]}>QR Code Value</div>
			<div className={style["input-div"]}>
				<textarea
					className={style["input-field"]}
					style={{ color: "black" }}
					value={state.input.value}
					onChange={(e) =>
						dispatch({ type: "ON_CHANGE_INPUT", payload: e.target.value })
					}
				/>
			</div>
			<div className={style["action-buttons"]}>
				<button
					onClick={() => dispatch({ type: "CREATE_CODE" })}
					className={style["button-create"]}
				>
					Create
				</button>
			</div>
		</div>
	);
};

export default Input;
