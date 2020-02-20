import React, {Component} from 'react';

import './index.scss';

export default class TodoListItem extends Component {

	state = {
		checked: false,
	}

	onChange = (id) => {
		this.setState({
			checked: !this.state.checked
		});
	}

	render() {

		const {label = false, onDelete} = this.props;


		let classNames = 'label';
		// if (done) {
		// 	classNames += ' done';
		// }

		return (
			<>
				<input type="checkbox" onChange={this.onChange} name="" id=""/>
				<span className={classNames}> {label} </span>
				<button type="button" className="btn-del" onClick={onDelete}>Удалить</button>
			</>
		);
	};
}
