import React, {Component} from 'react';
import TodoList from '../TodoList';
import AddItems from '../AddItems';

export default class Task extends Component {
		state = {
			isAdd: false,
			isOpen: false,
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

	render() {
		const {name, children, id} = this.props;
		const {isOpen, isAdd} = this.state;

		return (
			<div className="row">
				<div className="row__head flex">
					{/* onChange={this.toggleChange} */}
					<input type="checkbox" name={`check${id}`} id={`check${id}`} />
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
							<AddItems onAddItem={this.onAddItem} />
						}
					</>
				}
			</div>
		);

	}
}
