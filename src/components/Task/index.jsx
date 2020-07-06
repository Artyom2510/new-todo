import React, {Component} from 'react';
import TodoList from '../TodoList';
import AddItems from '../AddItems';

import './index.scss';

export default class Task extends Component {
	state = {
		isAdd: false,
		isOpen: false,
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

	render() {
		const {name, children, id, onAddItem, isAllChecked, onhandlerChange} = this.props;
		const {isOpen, isAdd} = this.state;

		let classCheck = 'check';

		if (isOpen) {
			classCheck += " check_show";
		}

		return (
			<div className="row">
				<div className="row__head flex">
					<input
						type="checkbox"
						name={`check${id}`}
						id={`check${id}`}
						onChange={() => onhandlerChange(id)}
						checked={isAllChecked}
						className={classCheck}
					/>
					
					<h1>{name} {id}</h1>
					<div className="row__head-btn flex">
						<button onClick={this.onOpen}>{isOpen ? 'Закрыть' : 'Открыть'}</button>
						<button onClick={this.onAdd}>{isAdd ? 'Отменить' : 'Создать'}</button>
					</div>
				</div>
				{ isOpen &&
					<>
						<TodoList
							todos={children}
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
