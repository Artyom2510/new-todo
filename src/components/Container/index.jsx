import React, {Component} from 'react';
import Row from '../Row';

import './index.scss';

export default class Container extends Component {


	render() {
		return (
			<>
				<div className="container">
					<Row />
					<Row />
				</div>
			</>
		);
	}

};

