import React, {Component} from 'react';
import TodoList from '../TodoList';
import AddItems from '../AddItems';

import './index.scss';

export default class Task extends Component {
	state = {
		isAdd: false,
		isOpen: false,
		term: ''
	};

	onOpen = () => {
		this.setState(({ isOpen }) => {
			return {
				isOpen: !isOpen,
				isAdd: false
			}
		});
	}

	onAdd = () => {
		this.setState(({ isAdd }) => {
			return {
				isOpen: true,
				isAdd: !isAdd
			}
		});
	}

	onSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term });
		const {onSearchChange, id} = this.props;
		onSearchChange(id, term);
	}

	buttons = [
		{name: 'active', label: 'Активные'},
		{name: 'checked', label: 'Готовые'},
		{name: 'all', label: 'Все'}
	];

	render() {
		const {name, children, id, onAddItem, isAllChecked, onhandlerChange, filter, filterAdd} = this.props;
		const {isOpen, isAdd, term} = this.state;

		let classCheck = 'check';

		if (isOpen) {
			classCheck += ' check_show';
		}

		const buttons = this.buttons.map(({name, label}) => {
			const isActive = filter === name ? 'active' : '';

			return (
				<button 
					type="button"
					className={`${isActive}`}
					key={name}
					onClick={() => filterAdd(id, name)}
				>
					{label}
				</button>
			)
		});

		return (
			<div className='row'>
				<div className='row__head flex'>
					<input
						type='checkbox'
						name={`check${id}`}
						id={`check${id}`}
						onChange={() => onhandlerChange(id)}
						checked={isAllChecked}
						className={classCheck}
					/>
					<h1>{name} {id}</h1>
					<div className='row__head-btn flex'>
						<button onClick={this.onOpen}>{isOpen ? 'Закрыть' : 'Открыть'}</button>
						<button onClick={this.onAdd}>{isAdd ? 'Отменить' : 'Создать'}</button>
					</div>
				</div>
				{ isOpen &&
					<>
						<div className='row__filter-block flex'>
							<input type='search'
								key={`search${id}`}
								name={`search${id}`}
								id={`search${id}`}
								className='search'
								placeholder='Search'
								value={term}
								onChange={this.onSearchChange}
							/>
							{buttons}
						</div>
						<TodoList
							todos={children}
							parentId={id}
						/>
						{ isAdd &&
							<AddItems onAddItem={onAddItem} parentId={id}/>
						}
					</>
				}
			</div>
		);

	}
}
