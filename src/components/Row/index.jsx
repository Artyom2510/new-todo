import React, {Component} from 'react';
import Task from '../Task';
import TodoList from '../TodoList';

import './index.scss';

export default class Row extends Component {

	childId = 0;

	state = {
		tasks: [
			{
				name: "Rock-n-roll",
				id: 0,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Sex'),
					this.createItem('Drags'),
					this.createItem('Music'),
				]
			},
			{
				name: "Heaven",
				id: 1,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Drink tea'),
					this.createItem('Drink protein'),
					this.createItem('Eat meat'),
				]
			},
			{
				name: "Hell",
				id: 2,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Drink beer'),
				]
			},
		],
	};

	createItem(label) {
		return {
			label,
			checked: false,
			important: false,
			id: this.childId++
		}
	}

	deleteItem = (parentId, childrenId) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, todoData} = task;
				if (id === parentId) {
					const result = todoData.filter((el) => el.id !== childrenId);
					return {
						...task,
						todoData: result
					}
				}
				return task;
			});
			
			return {
				...prevState,
				tasks
			};
		});
	}

	onAddItem = (taskId, text) => {
		const newItem = this.createItem(text);

		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, todoData} = task;
				if (id === taskId ) {
					const newArr = [
						...todoData,
						newItem
					];
					return {
						...task,
						todoData: newArr,
						isAllChecked: false
					}
				}
				return task;
			});

			return {
				...prevState,
				tasks
			};
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

	onToggleChange = (parentId, childrenId) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, todoData} = task;
				if (id === parentId) {
					const oldItem = todoData.filter(el => el.id === childrenId)[0];
					const newItem = {...oldItem, checked: !oldItem.checked};
					const newDotoData = [...todoData];
					const idx = todoData.indexOf(oldItem);
					newDotoData[idx] = newItem;
					const checkedChild = newDotoData.filter(el => el.checked).length;
					const todoCnt = todoData.length;
					return {
						...task,
						todoData: newDotoData,
						isAllChecked: todoCnt === checkedChild
					}
				}
				// if (id === parentId) {
				// 	const idx = todoData.findIndex((el) => el.id === childrenId);
				// 	const oldItem = todoData[idx];
				// 	const newItem = {...oldItem, checked: !oldItem.checked};
				// 	const newArr = [
				// 		...todoData.slice(0, idx),
				// 		newItem,
				// 		...todoData.slice(idx + 1)
				// 	];
				// 	const checkedChild = newArr.filter(el => el.checked).length;
				// 	const todoCnt = todoData.length;
				// 	console.log(todoData)
				// 	return {
				// 		...task,
				// 		todoData: newArr,
				// 		isAllChecked: todoCnt === checkedChild
				// 	}
				// }
				return task;
			});

			return {
				...prevState,
				tasks
			};
		});
	}

	toggleChange = (currentId) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, isAllChecked, todoData} = task;
				if(id === currentId) {
					function checkChild(child) {
						const check = {...child, checked: !isAllChecked};
						return check;
					}
					const result = todoData.map(checkChild);
					return {
						...task,
						todoData: result,
						isAllChecked: !isAllChecked
					}
				}
				return task;
			});
			return {
				...prevState,
				tasks
			};
		});
	}

	onToggleImportant = (parentId, childrenId) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, todoData} = task;
				if (id === parentId) {
					const oldItem = todoData.filter(el => el.id === childrenId)[0];
					const newItem = {...oldItem, important: !oldItem.important};
					const newDotoData = [...todoData];
					const idx = todoData.indexOf(oldItem);
					newDotoData[idx] = newItem;
					return {
						...task,
						todoData: newDotoData
					}
				}
				return task;
			});

			return {
				...prevState,
				tasks
			};
		});
	}

	render() {

		return (
			<>
				{
					this.state.tasks.map((task) =>
					<Task
						key={task.id}
						id={task.id}
						name={task.name}
						{...task}
						onAddItem={this.onAddItem}
						onhandlerChange={this.toggleChange}
					>
						{
							task.todoData.map((child) =>
								<TodoList
									parentId={task.id}
									key={child.id}
									{...child}
									onDelete={this.deleteItem}
									onToggleChange={this.onToggleChange}
									onToggleImportant={this.onToggleImportant}
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
