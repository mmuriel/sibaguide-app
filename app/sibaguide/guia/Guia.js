import React from 'react';
import GuiaHelper from './GuiaHelper.js';
import ListaCanales from './ListaCanales.js';



class Guia extends React.Component{

	constructor(props){
		super(props);
	}


	componentDidMount(){
		console.log("Guia.componentDidMount()");
		
	}


	componentDidUpdate(){
		console.log("Guia.componentDidUpdate()");
		//this.loadGuiaData();		
	}


	render(){
		console.log("Guia.render()");
		return (<ListaCanales sgconf={this.props.sgconf} startTime={this.props.startTime} dataGuia={this.props.dataGuia} />);
	}
}


export default Guia;