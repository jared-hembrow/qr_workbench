import React, { useContext, useState } from "react";
import CTX, { CodeItem } from "./CTX";
// style
import style from "./List.module.scss";

const List = () => {
	const { state, dispatch } = useContext(CTX);
	const [editValue, setEditValue] = useState<string>("");
	const [editTitleValue, setEditTitleValue] = useState<string>("");
	const renderText = (item: CodeItem) => {
		if (state.edit && state.edit.id === item.id) {
			console.log("edit input");
			if (!editValue) setEditValue(!item.value ? " " : item.value);
			return (
				<div className={style["code-item-text"]}>
					<input
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								dispatch({ type: "ON_CANCEL_EDIT" });
								setEditValue("");
							}
							if (e.key === "Enter") {
								dispatch({
									type: "ON_SUBMIT_EDIT",
									payload: { item, value: editValue },
								});
								setEditValue("");
							}
						}}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						placeholder="Enter Code"
						className={`input-type ${style["edit-input"]}`}
					/>
					<button className={`${style["submit-edit"]}`}>
						<i
							onClick={(e) => {
								e.stopPropagation();
								dispatch({
									type: "ON_SUBMIT_EDIT",
									payload: { item, value: editValue },
								});
								setEditValue("");
							}}
							className={`check icon`}
						/>
					</button>
				</div>
			);
		}
		if (state.editTitle && state.editTitle.id === item.id) {
			console.log("title edit input");
			if (!editTitleValue) setEditTitleValue(!item.title ? " " : item.title);
			return (
				<div className={style["code-item-text"]}>
					<input
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								dispatch({ type: "ON_CANCEL_EDIT_TITLE" });
								setEditTitleValue("");
							}
							if (e.key === "Enter") {
								dispatch({
									type: "ON_SUBMIT_EDIT_TITLE",
									payload: { item, value: editTitleValue },
								});
								setEditTitleValue("");
							}
						}}
						value={editTitleValue}
						onChange={(e) => setEditTitleValue(e.target.value)}
						placeholder="Enter Title"
						className={`input-type ${style["edit-input"]}`}
					/>
					<button className={`${style["submit-edit"]}`}>
						<i
							onClick={(e) => {
								e.stopPropagation();
								dispatch({
									type: "ON_SUBMIT_EDIT_TITLE",
									payload: { item, value: editTitleValue },
								});
								setEditTitleValue("");
							}}
							className={`check icon`}
						/>
					</button>
				</div>
			);
		}
		return (
			<div
				onDoubleClick={() => dispatch({ type: "ON_EDIT_TITLE", payload: item })}
				className={style["code-item-text"]}
			>
				{!item.title ? item.value : item.title}
			</div>
		);
	};

	return (
		<div className={style["list-container"]}>
			{state.codeList.map((code) => {
				return (
					<div
						key={code.id}
						className={`${
							!state.selected
								? ""
								: state.selected.id === code.id
								? style["code-item-selected"]
								: ""
						} ${style["code-item-container"]}`}
						onClick={() => dispatch({ type: "ON_CLICK_CODE", payload: code })}
					>
						{renderText(code)}
						<div className={style["code-item-actions"]}>
							<div>
								<i
									onClick={(e) => {
										e.stopPropagation();
										dispatch({ type: "ON_EDIT", payload: code });
									}}
									className={`edit outline icon ${style["buttons"]}`}
								/>
							</div>
							<div>
								<i
									onClick={(e) => {
										e.stopPropagation();
										dispatch({ type: "ON_DELETE", payload: code });
									}}
									className={`trash alternate outline icon ${style["buttons"]}`}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default List;
