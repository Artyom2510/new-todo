import React, {Component} from 'react';
import Task from '../Task';
import TodoList from '../TodoList';

import './index.scss';

export default class Row extends Component {

	childId = 0;

	state = {
		tasks: [
			{
				name: 'Rock-n-roll',
				id: 0,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Sex'),
					this.createItem('Drags'),
					this.createItem('Music'),
				],
				term: '',
				filter: 'all'
			},
			{
				name: 'Heaven',
				id: 1,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Drink tea'),
					this.createItem('Drink protein'),
					this.createItem('Eat meat'),
				],
				term: '',
				filter: 'all'
			},
			{
				name: 'Metal',
				id: 2,
				isAllChecked: false,
				checked: false,
				todoData: [
					this.createItem('Heavy metal'),
					this.createItem('Black metal'),
					this.createItem('Death metal'),
					this.createItem('Gothick metal'),
					this.createItem('Avant-garde metal'),
					this.createItem('Glam metal'),
					this.createItem('Industrial metal'),
					this.createItem('Nu metal'),
					this.createItem('Alternative metal'),
					this.createItem('Viking metal'),
					this.createItem('Groove metal'),
					this.createItem('Doom metal'),
					this.createItem('Celtic metal'),
					this.createItem('Math metal'),
					this.createItem('Power metal'),
					this.createItem('Neo-classical metal'),
					this.createItem('Pagan metal'),
					this.createItem('Post metal'),
					this.createItem('Progressive metal'),
					this.createItem('Symphonic metal'),
					this.createItem('Speed metal'),
					this.createItem('Stoner metal'),
					this.createItem('Thrash metal'),
					this.createItem('Folk metal'),
				],
				term: '',
				filter: 'all'
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
					const result = todoData.filter(el => el.id !== childrenId);
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

	onToggleIeProperty = (parentId, childrenId, property) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				const {id, todoData} = task;
				if (id === parentId) {
					const oldItem = todoData.filter(el => el.id === childrenId)[0];
					const newItem = {...oldItem, [property]: !oldItem[property]};
					const newDotoData = [...todoData];
					const idx = todoData.indexOf(oldItem);
					newDotoData[idx] = newItem;
					if (property === 'important') {
						return {
							...task,
							todoData: newDotoData
						}
					} else if (property === 'checked') {
						const checkedChild = newDotoData.filter(el => el.checked).length;
						const todoCnt = todoData.length;
						return {
							...task,
							todoData: newDotoData,
							isAllChecked: todoCnt === checkedChild
						}
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

	filterAdd = (parentId, property) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				if (task.id === parentId) {
					return {
						...task,
						filter: property
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

	filter = (items, filter) => {
		switch(filter) {
			case 'active':
				return items.filter(item => !item.checked);
			case 'checked':
				return items.filter(item => item.checked);
			default: return items;
		}
	}

	onSearch = (items, term, filter) => {
		if (!term.length && filter === 'all') {
			return items;
		}
		return this.filter(items.filter(el => {
			return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1
		}), filter);
	}

	onSearchChange = (parentId, str) => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(task => {
				if (task.id === parentId) {
					return {
						...task,
						term: str
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
					this.state.tasks.map(task =>
						<Task
							key={task.id}
							id={task.id}
							name={task.name}
							filter={task.filter}
							{...task}
							onAddItem={this.onAddItem}
							onhandlerChange={this.toggleChange}
							onSearchChange={this.onSearchChange}
							filterAdd={this.filterAdd}
						>
							{
								this.onSearch(task.todoData, task.term, task.filter).map(child =>
									<TodoList
										parentId={task.id}
										key={child.id}
										{...child}
										onDelete={this.deleteItem}
										onToggleChange={this.onToggleIeProperty}
										onToggleImportant={this.onToggleIeProperty}
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
