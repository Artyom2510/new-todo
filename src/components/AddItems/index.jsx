import React, {Component} from 'react';
import './index.scss';

export default class AddItems extends Component {

	state = {
		label: ''
	}

	onChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAddItem(this.state.label);
		this.setState({
			label: ''
		});
	};

	render() {
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
					value={this.state.label}
				/>
				<button type="submit">Добавить</button>
			</form>
		);
	};
}


