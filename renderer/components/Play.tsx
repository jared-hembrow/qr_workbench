import React, { useContext } from "react";
import CTX from "./CTX";
// style
import style from "./Play.module.scss";
const Play = () => {
	const { state, dispatch } = useContext(CTX);

	return (
		<div className={style["play-container"]}>
			<div>
				{state.play ? (
					<i
						onClick={() => dispatch({ type: "ON_STOP" })}
						className={`${style["play-icon"]} stop icon`}
					/>
				) : (
					<i
						onClick={() => dispatch({ type: "ON_PLAY" })}
						className={`${style["play-icon"]} play icon`}
					/>
				)}
			</div>
			<div className={`${style["duration-panel"]}`}>
				<div>
					<input
						value={state.slideShowDuration}
						onChange={(e) => {
							console.log(typeof e.target.value, parseInt(e.target.value));
							dispatch({
								type: "ON_CHANGE_SLIDE_SHOW_DURATION",
								payload: { type: "enter", value: parseInt(e.target.value) },
							});
						}}
						className={`input-type ${style["duration-input"]}`}
						type={"number"}
					/>
				</div>
				<div>
					<i
						onClick={() =>
							dispatch({
								type: "ON_CHANGE_SLIDE_SHOW_DURATION",
								payload: { type: "inc" },
							})
						}
						className={`${style["input-button"]} plus icon`}
					/>
					<i
						onClick={() =>
							dispatch({
								type: "ON_CHANGE_SLIDE_SHOW_DURATION",
								payload: { type: "dec" },
							})
						}
						className={`${style["input-button"]} minus icon`}
					/>
				</div>
			</div>
		</div>
	);
};

export default Play;
