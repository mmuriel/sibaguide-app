import React from 'react';

import Canal from './Canal.js';



class ListaCanales extends React.Component{

	constructor(props){
		super(props);
		this.startListAnimation = this.startListAnimation.bind(this);
	}

	componentDidMount(){

		console.log("ListaCanales.componentDidMount()");
		this.startListAnimation();

	}

	componentDidUpdate(){
		//console.log(`Ya estaba cargado el componente... ${this.props.dataGuia}`);
		console.log(`ListaCanales.componentDidUpdate()`);
		this.startListAnimation();

	}



	shouldComponentUpdate(nextProps,nextState){

		console.log('ListadoCanales.shouldComponentdUpdate()');
		console.log('Props actuales:');
		console.log(this.props);
		console.log('Props nuevos:');
		console.log(nextProps);
		return true;
	}

	startListAnimation(){

		if (typeof this.props.dataGuia.URL == 'undefined')
			return false;
		let divGuiaContairer = document.getElementById("grid_box");
		let cssHtmlTag = document.createElement("style");
		let qtyChannels = 0;
		//console.log("Cantidad de canales disponibles en ListaCanales.startAnimation()");
		//console.log(qtyChannels);
		for (let i = 0; i < this.props.dataGuia.childNodes[0].childNodes.length ; i++){				
				//let chnName = this.props.dataGuia.childNodes[0].childNodes[i].getAttribute('name');
				if (this.props.dataGuia.childNodes[0].childNodes[i].childNodes.length >= 86){
					qtyChannels++;
				}
			}
		let cssRules = document.createTextNode("@keyframes guia{from {top: 205px} to{top: -"+( parseInt(64 * qtyChannels))+"px}} #grid_box ul.canales-list{ animation-name: guia; animation-timing-function: linear; animation-iteration-count: infinite; animation-play-state: running; animation-duration: "+(qtyChannels * this.props.sgconf.guia.secondsChannel)+"s;}");
		cssHtmlTag.appendChild(cssRules);
		divGuiaContairer.appendChild(cssHtmlTag);

		//console.log("Empezamos a animar...");
		//console.log(divGuiaContairer);

	}

	render(){
		console.log("ListaCanales.render()");
		console.log(`Se cargo la guia en la ListaCanales... ${typeof this.props.dataGuia}`);
		console.log(this.props.dataGuia);
		if (typeof this.props.dataGuia.URL != 'undefined'){
			let listaCanales = [];
			for (let i = 0; i < this.props.dataGuia.childNodes[0].childNodes.length ; i++){				
				//let chnName = this.props.dataGuia.childNodes[0].childNodes[i].getAttribute('name');
				if (this.props.dataGuia.childNodes[0].childNodes[i].childNodes.length >= 86){
					listaCanales.push(<Canal 
						key={this.props.dataGuia.childNodes[0].childNodes[i].getAttribute('cadena')}
						canalInfo={this.props.dataGuia.childNodes[0].childNodes[i]} 
						sgconf={this.props.sgconf} 
						startTime={this.props.startTime}
						eventos={this.props.dataGuia.childNodes[0].childNodes[i].childNodes}
						/>
					);
				}
			}
			return(<ul className="canales-list">{listaCanales}</ul>);
		}
		else
			return (<h1>SIBAGUIDE</h1>);
	}
}


export default ListaCanales;