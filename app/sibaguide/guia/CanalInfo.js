import React from 'react';



class CanalInfo extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		return (
			<div className="canal__info">
				<div className="canal__info__frecuencia">{parseFloat(this.props.canalInfo.getAttribute('cadena')/100)}</div>
				<div className="canal__info__nombre">{this.props.canalInfo.getAttribute('name')}</div>
			</div>
		);
	}
}


export default CanalInfo;