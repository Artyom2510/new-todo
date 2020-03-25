import React from 'react';
import TodoListItem from '../TodoListItem';

import './index.scss';

const TodoList = ({ todos }) => {

	const li = todos.map(item => {

		const { id, onDelete, ...itemProps } = item.props;

		return (
			<li key={id} className="list__item flex">
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