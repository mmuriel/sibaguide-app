import React from 'react';


import CanalInfo from './CanalInfo.js';
import CanalEventos from './CanalEventos.js';



class Canal extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		//console.log(this.props.eventos);
		let reactListKey = this.props.canalInfo.getAttribute('cadena');
		let eventos = [];
		for (let i = 0; i < this.props.eventos.length; i++){
			if (this.props.eventos[i].nodeType == 1){
				eventos.push(this.props.eventos[i]);
			}
		}
		return (
			<li className="canal" key={reactListKey}>
				<CanalInfo canalInfo={this.props.canalInfo} sgconf={this.props.sgconf}/>
				<CanalEventos eventos={eventos} startTime={this.props.startTime} canalKey={reactListKey} />
			</li>
		);
	}
}


export default Canal;