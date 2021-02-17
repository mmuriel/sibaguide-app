import React from 'react';



class CanalInfo extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		if (this.props.sgconf.guia.lncFormat == 'dec'){
			return (
				<div className="canal__info">
					<div className="canal__info__frecuencia">{parseFloat(this.props.canalInfo.getAttribute('cadena')/100)}</div>
					<div className="canal__info__nombre">{this.props.canalInfo.getAttribute('name')}</div>
				</div>
			);
		}
		else {

			console.log("MMMAAAAAA");
			return (
				<div className="canal__info">
					<div className="canal__info__frecuencia">{parseFloat(this.props.canalInfo.getAttribute('cadena'))}</div>
					<div className="canal__info__nombre">{this.props.canalInfo.getAttribute('name')}</div>
				</div>
			);
		}
	}
}


export default CanalInfo;