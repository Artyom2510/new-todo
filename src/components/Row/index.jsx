import React, {Component} from 'react';
import Task from '../Task';
import TodoList from '../TodoList';
import AddItems from '../AddItems';

import './index.scss';

export default class Row extends Component {

	childId = 0;

	// state = {
	// 	id: 0,
	// 	isOpen: false,
	// 	isAdd: false,
	// 	isAllDone: false,
	// 	todoData: [
	// 		this.createItem('Drink tea'),
	// 		this.createItem('Drink protein'),
	// 		this.createItem('Eat meat'),
	// 	]
	// };

	state = {
		tasks: [
			{
				name: "Heaven",
				id: 0,
				isCheckedAll: false,
				todoData: [
					this.createItem('Drink tea'),
					this.createItem('Drink protein'),
					this.createItem('Eat meat'),
				]
			},
			{
				name: "Hell",
				id: 1,
				isCheckedAll: false,
				todoData: [
					this.createItem('Drink beer'),
				]
			},
		],
		create: false
	};

	createItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.childId++
		}
	}

	// deleteItem = (id) => {
	// 	this.setState(({ todoData }) => {
	// 		const index = todoData.findIndex((el) => el.id === id);

	// 		const newArr = [
	// 			...todoData.slice(0, index),
	// 			...todoData.slice(index + 1)
	// 		];

	// 		return {
	// 			todoData: newArr
	// 		};
	// 	});
	// }

	deleteItem = (id) => {
		// const {tasks} = this.state;
		console.log(id)
		// tasks.map(item => {
			// this.setState(({ todoData }) => {
			// 	const index = todoData.findIndex((el) => el.id === id);

			// 	const newArr = [
			// 		...todoData.slice(0, index),
			// 		...todoData.slice(index + 1)
			// 	];

			// 	return {
			// 		todoData: newArr
			// 	};
			// });
		// });
	}

	onAddItem = (text) => {
		const newItem = this.createItem(text);

		this.setState(({tasks}) => {
			const newArr = [
				...tasks,
				newItem
			];
			return {
				tasks: newArr
			};
		});
	}

	toggleChange = (id) => {
		this.setState({
			isAllDone: !this.state.isAllDone
		});
	}

	// toggleProperty(arr, id, propName) {
	// 	const index = arr.findIndex((el) => el.id === id);

	// 	const oldItem = arr[index];
	// 	const newItem = {
	// 		...oldItem,
	// 		[propName]: !oldItem[propName]
	// 	};

	// 	return [
	// 		...arr.slice(0, index),
	// 		newItem,
	// 		...arr.slice(index + 1)
	// 	];
	// }

	// onToggleDone = (id) => {
	// 	this.setState(({ todoData }) => {
	// 		return {
	// 			todoData: this.toggleProperty(todoData, id, 'done')
	// 		}
	// 	});
	// };

	render() {
		
		// const {todoData, isOpen, isAdd, id} = this.state;

		// return (
		// 	<div className="row">
		// 		<div className="row__head flex">
		// 			<input type="checkbox" name={`check${id}`} id={`check${id}`} onChange={this.toggleChange} />
		// 			<h1>Задача {id}</h1>
		// 			<div className="row__head-btn flex">
		// 				<button onClick={this.onOpen}>{isOpen ? 'Закрыть' : 'Открыть'}</button>
		// 				<button onClick={this.onAdd}>{isAdd ? 'Отменить' : 'Создать'}</button>
		// 			</div>
		// 		</div>
		// 		{ isOpen &&
		// 			<>
		// 				<TodoList
		// 					todos={todoData}
		// 					onDelete={this.deleteItem}
		// 				/>
		// 				{ isAdd &&
		// 					<AddItems onAddItem={this.onAddItem} />
		// 				}
		// 			</>
		// 		}
		// 	</div>
		// );

		return (
			<>
				{
					this.state.tasks.map((task) =>
					<Task key={task.id} id={task.id} name={task.name} {...task} >
						{
							task.todoData.map((child) =>
								<TodoList
									key={child.id}
									{...child}
									onDelete={this.deleteItem}
								/>
							)
						}
					</Task>
					)
				}
			</>
		);

	}
};
