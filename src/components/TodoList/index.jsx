import React from 'react';
import TodoListItem from '../TodoListItem';

import './index.scss';

const TodoList = ({ todos, parentId }) => {

	const li = todos.map(item => {

		const { id, onDelete, onToggleChange, onToggleImportant, ...itemProps } = item.props;

		return (
			<li key={id} className="list__item flex">
				<TodoListItem
					{...itemProps}
					onDelete={() => onDelete(parentId, id)}
					onToggleChange={() => onToggleChange(parentId, id, "checked")}
					onToggleImportant={() => onToggleImportant(parentId, id, "important")}
					id={id}
				/>
			</li>
		);
	});

	return (
		<ul className="container__list list">
			{ li }
		</ul>
	);
};

export default TodoList;