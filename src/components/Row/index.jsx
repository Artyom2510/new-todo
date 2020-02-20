import React, {Component} from 'react';
import TodoList from '../TodoList';
import AddItems from '../AddItems';

import './index.scss';

export default class Row extends Component {

	maxId = 100;

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
		row0: {
			id: 0,
			isOpen: false,
			isAdd: false,
			isAllDone: false,
			todoData: [
				this.createItem('Drink tea'),
				this.createItem('Drink protein'),
				this.createItem('Eat meat'),
			]
		},
		row1: {
			id: 1,
			isOpen: false,
			isAdd: false,
			isAllDone: false,
			todoData: [
				this.createItem('Drink coffee'),
			]
		},
	};

	onOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
		this.setState({ isAdd: false });
	}

	onAdd = () => {
		this.setState({
			isOpen: true,
			isAdd: !this.state.isAdd
		});
	}

	createItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((el) => el.id === id);

			const newArr = [
				...todoData.slice(0, index),
				...todoData.slice(index + 1)
			];

			return {
				todoData: newArr
			};
		});
	}

	onAddItem = (text) => {
		const newItem = this.createItem(text);

		this.setState(({todoData}) => {
			const newArr = [
				...todoData,
				newItem
			];
			return {
				todoData: newArr
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
		
		const {todoData, isOpen, isAdd, id} = this.state;

		return (
			<div className="row">
				<div className="row__head flex">
					<input type="checkbox" name="check1" id="check1" onChange={this.toggleChange} />
					<h1>Задача {id}</h1>
					<div className="row__head-btn flex">
						<button onClick={this.onOpen}>{isOpen ? 'Закрыть' : 'Открыть'}</button>
						<button onClick={this.onAdd}>{isAdd ? 'Отменить' : 'Создать'}</button>
					</div>
				</div>
				{ isOpen &&
					<>
						<TodoList
							todos={todoData}
							onDelete={this.deleteItem}
						/>
						<AddItems onAddItem={this.onAddItem} />
					</>
				}
			</div>
		);

	}
};
