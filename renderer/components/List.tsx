import React, { useContext } from "react";
import CTX from "./CTX";
// style
import style from "./List.module.scss";
type Props = {};

const List = (props: Props) => {
	const { state, dispatch } = useContext(CTX);

	return (
		<div className={style["list-container"]}>
			{state.codeList.map((code) => {
				return <div>{code.value}</div>;
			})}
		</div>
	);
};

export default List;
