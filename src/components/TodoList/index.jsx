import React from 'react';
import TodoListItem from '../TodoListItem';

import './index.scss';

const TodoList = ({ todos, onDelete}) => {

	const li = todos.map(item => {

		const { id, ...itemProps } = item;

		return (
			<li key={item.id} className="list__item flex">
				<TodoListItem
					{...itemProps}
					onDelete={() => onDelete(id)}
					// onToggleDone={() => onToggleDone(id)}
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
