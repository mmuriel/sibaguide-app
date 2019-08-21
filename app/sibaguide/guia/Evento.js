import React from 'react';

class Evento extends React.Component{

	constructor(props){
		super(props);
	}
	render(){
		let liStyleBox = {
			width: parseInt(this.props.longBox * 114)+"px"
		};
		let nombreStyleBox = {
			width: (parseInt(this.props.longBox * 114) - 10)+"px"
		};
		let activeBox = '';
		if (this.props.isActive){
			activeBox = 'evento evento--active';
		} 
		else{
			activeBox = 'evento';	
		}
		/*
		let showContClass = ((this.props.isContinue == true) ? 'evento__backArrow show' : 'evento__backArrow');
		let showNextClass = ((this.props.isNext == true) ? 'evento__nextArrow show' : 'evento__nextArrow');
		*/
		return(
			<li className={activeBox} style={liStyleBox}>
				<div className="evento__nombre" style={nombreStyleBox}>{this.props.nombre}</div>
			</li>
		);
	}
}


export default Evento;