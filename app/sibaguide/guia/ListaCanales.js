import React from 'react';

import Canal from './Canal.js';



class ListaCanales extends React.Component{

	constructor(props){
		super(props);
		this.startListAnimation = this.startListAnimation.bind(this);
	}

	componentDidMount(){

		console.log("Esta es la ejecucion de ListaCanales.componentDidMount()");
		//this.startListAnimation();

	}

	componentDidUpdate(){
		//console.log(`Ya estaba cargado el componente... ${this.props.dataGuia}`);
		this.startListAnimation();

	}

	startListAnimation(){

		if (typeof this.props.dataGuia.URL == 'undefined')
			return false;
		let divGuiaContairer = document.getElementById("grid_box");
		let cssHtmlTag = document.createElement("style");
		let qtyChannels = this.props.dataGuia.childNodes[0].childNodes.length;
		console.log("Cantidad de canales disponibles en ListaCanales.startAnimation()");
		console.log(qtyChannels);
		let cssRules = document.createTextNode("@keyframes guia{from {top: 205px} to{top: -"+( parseInt(64 * qtyChannels))+"px}} #grid_box ul.canales-list{ animation-name: guia; animation-timing-function: linear; animation-iteration-count: infinite; animation-play-state: running; animation-duration: "+(qtyChannels * 2)+"s;}");
		cssHtmlTag.appendChild(cssRules);
		divGuiaContairer.appendChild(cssHtmlTag);

		//console.log("Empezamos a animar...");
		//console.log(divGuiaContairer);

	}

	render(){
		console.log(`Se cargo la guia en la ListaCanales... ${typeof this.props.dataGuia}`);
		console.log(this.props.dataGuia);
		if (typeof this.props.dataGuia.URL != 'undefined'){
			let listaCanales = [];
			for (let i = 0; i < this.props.dataGuia.childNodes[0].childNodes.length ; i++){				
				//let chnName = this.props.dataGuia.childNodes[0].childNodes[i].getAttribute('name');
				listaCanales.push(<Canal 
					key={this.props.dataGuia.childNodes[0].childNodes[i].getAttribute('cadena')}
					canalInfo={this.props.dataGuia.childNodes[0].childNodes[i]} 
					sgconf={this.props.sgconf} 
					startTime={this.props.startTime}
					eventos={this.props.dataGuia.childNodes[0].childNodes[i].childNodes}
					/>
				);
			}
			return(<ul className="canales-list">{listaCanales}</ul>);
			//return (<h1>Hola Mundo desde ListaCanales {this.props.sgconf.id} la bandera local inicia con {this.props.startTime.getHours()}:{this.props.startTime.getMinutes()} </h1>);
		}
		else
			return (<h1>SIBAGUIDE</h1>);
	}
}


export default ListaCanales;