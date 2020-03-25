import React, {Component} from 'react';

import './index.scss';

export default class TodoListItem extends Component {

	// state = {
	// 	checked: false,
	// }

	// onChange = (id) => {
	// 	this.setState({
	// 		checked: !this.state.checked
	// 	});
	// }

	render() {

		const {label = false, onDelete} = this.props;

		console.log(label)


		let classNames = 'label';
		// if (done) {
		// 	classNames += ' done';
		// }

		// onChange={this.onChange} 
		return (
			<>
				<input type="checkbox" name="" id=""/>
				<span className={classNames}> {label} </span>
				<button type="button" className="btn-del" onClick={onDelete}>Удалить</button>
			</>
		);
	};
}
