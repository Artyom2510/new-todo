import React from 'react';
import TodoListItem from '../TodoListItem';

import './index.scss';

const TodoList = ({ todos }) => {

	const li = todos.map(item => {

		const { id, parentId, onDelete, onToggleChange, onToggleImportant, ...itemProps } = item.props;

		return (
			<li key={id} className="list__item flex">
				<TodoListItem
					{...itemProps}
					onDelete={() => onDelete(parentId, id)}
					onToggleChange={() => onToggleChange(parentId, id)}
					onToggleImportant={() => onToggleImportant(parentId, id)}
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