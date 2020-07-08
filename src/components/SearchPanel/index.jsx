import React, {Component} from 'react';

import './index.scss';

export default class SearchPanel extends Component {

	state = {
		term: ''
	};

	onSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term });
		this.props.onSearchChange(term);
	};

	render() {
		return <input
						type="search"
						placeholder="search"
						value={this.state.term}
						onChange={this.onSearchChange}
					/>;
	}
}
