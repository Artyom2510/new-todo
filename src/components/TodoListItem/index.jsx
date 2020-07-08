import React from 'react';

import './index.scss';

const TodoListItem = ({label = false, onDelete, onToggleChange, onToggleImportant, id, checked, important}) => {
	let classNames = 'label';
	let btnClass = "btn-del";

	if (checked) {
		btnClass += " visible";
		classNames += " label_done";
	}

	if (important) {
		classNames += ' label_imp';
	}

	return (
		<>
			<input
				type="checkbox"
				name={`check-item${id}`}
				id={`check-item${id}`}
				checked={checked}
				onChange={onToggleChange}
			/>
			<label
				htmlFor={`check-item${id}`}
				className={classNames}
			>
				{label}
			</label>
			<div>
				<button type="button" onClick={onToggleImportant}>Важно</button>
				<button type="button" className={btnClass} onClick={onDelete}>Удалить</button>
			</div>
		</>
	);
}

export default TodoListItem;