import React, {Component} from 'react';
import './index.scss';

export default class AddItems extends Component {

	state = {
		label: ''
	};

	onChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	onSubmit = (e) => {
		const {label} = this.state;
		e.preventDefault();

		if (label) {
			const {onAddItem, parentId} = this.props;
			onAddItem(parentId, label);
			this.setState({
				label: ''
			});
		}
	};

	render() {
		const {label} = this.state;
		return(
			<form
				className="item-add flex"
				onSubmit={this.onSubmit}
			>
				<input
					type="text"
					className="input-text"
					onChange={this.onChange}
					placeholder="WTF"
					autoFocus={true}
					value={label}
				/>
				<button type="submit">Добавить</button>
			</form>
		);
	};
}


