import React from 'react';
import GuiaHelper from './GuiaHelper.js';
import ListaCanales from './ListaCanales.js';



class Guia extends React.Component{

	constructor(props){
		super(props);
		this.loadGuiaData = this.loadGuiaData.bind(this);
		this.state = {
			dataGuia : {}
		}
	}


	componentDidMount(){

		console.log("Esta es la ejecucion de Guia.componentDidMount()");
		this.loadGuiaData();

	}

	loadGuiaData(){
		let self = this;
		let dayOfWeek = this.props.startTime.getDay();
		if (dayOfWeek == 0){//Ajuste el domingo a valor = 7, por que el objeto JS date define el domingo como = 0
			dayOfWeek = 7;
		}
		GuiaHelper.dataGuiaLoader("h_"+(parseInt(parseInt(dayOfWeek)) )+"_"+this.props.sgconf.id+".xml").then((xmlData)=>{
			//this.dataGuiaXml = xmlData;
			this.setState(prevState => {
				
				let newState = {
					dataGuia: xmlData
				}
				console.log("Cargando el contenido de la guia...");
				//console.log(newState);
				return newState;
			});
		}).catch(error=>{
			console.log("Ocurrio un error cargando el contenido de la guia...");
			console.log(error);
		});
	}

	render(){
		
		return (<ListaCanales sgconf={this.props.sgconf} startTime={this.props.startTime} dataGuia={this.state.dataGuia} />);
	}
}


export default Guia;