import React from 'react';
import GuiaHelper from './GuiaHelper.js';
import Guia from './Guia.js';

class GuiaContainer extends React.Component{
	/*
		Implementacion metodos heredados de React.Component()
	*/
	constructor(props){
		super(props);
		//Define binding de objeto this a las funciones internas
		this.loadFlags = this.loadFlags.bind(this);
		this.checkFlags = this.checkFlags.bind(this);
		this.timeChangeAgent = this.timeChangeAgent.bind(this);
		
		//Define los valores que se pueden calcular de manera directa
		let dateNow = new Date();
		let startTimeBlock = this.getLast15MinutesBlock(dateNow);

		//Definiendo el estado inicial
		this.state = {
			localFlag: '',
			gralFlag: '',
			startTime: startTimeBlock
		}
	}
	componentDidMount(){
		console.log("Esta es la ejecucion de GuiaContainer.componentDidMount()");
		this.flagsTimer = setInterval(()=>{this.checkFlags();},5000);;
		this.timeAgentTimer = setInterval(()=>{this.timeChangeAgent();},1000);
	}
	componenWillUnmount(){
		clearInterval(this.flagsTimer);
		clearInterval(this.timeAgentTimer);
	}
	/*
		Custom functions
	*/

	/*
		Este agente verifica si se ha cambiado del bloque de 15 minutos 
		para modificar (recargar) la parrilla
	*/
	timeChangeAgent(){
		let actualDate = new Date();
		actualDate = this.getLast15MinutesBlock(actualDate);
		if (actualDate.valueOf() != this.state.startTime.valueOf()){
			this.setState(prevState => {
					//console.log("Estado previo...");
					//console.log(prevState);
					let newState = {... prevState};
					newState.startTime = actualDate;
					//console.log("Estado nuevo...");
					//console.log(newState);
					return newState;
				});
		}
	}



	//Verifica si las banderas general y/o local han sido modificadas
	checkFlags(){
		this.loadFlags().then((rawFlagsVals)=>{
			if (rawFlagsVals.localFlagChecker != this.state.localFlag || rawFlagsVals.gralFlagChecker != this.state.gralFlag )
				this.setState(prevState => {
					//console.log("Estado previo...");
					//console.log(prevState);
					let newState = {... prevState};
					newState.localFlag = rawFlagsVals.localFlagChecker;
					newState.gralFlag = rawFlagsVals.gralFlagChecker;
					//console.log("Estado nuevo...");
					//console.log(newState);
					return newState;
				});
		});
	}

	//Carga los valores de los flags desde los archivos XML
	loadFlags(){
		let tmpValLocalFlag = false, tmpValGralFlag = false;
		return new Promise((fulfill,reject)=>{
			GuiaHelper.flagLoader('grilla_grl.flg').then((xmlFlagValue)=>{
				//console.log("El valor de grilla general: "+xmlFlagValue);
				tmpValGralFlag = xmlFlagValue;
				if (tmpValLocalFlag == false){
					//console.log("No está listo el valor de grilla local, pero si el de grilla general");
				}
				else{
					//console.log("Ya están listas los dos flags, pero se esta ejecutando por grilla general... \nGrilla General: "+tmpValGralFlag+"\nGrilla Local: "+tmpValLocalFlag+"\n");
					fulfill({localFlagChecker:tmpValLocalFlag,gralFlagChecker:tmpValGralFlag});
				}	
			});
			GuiaHelper.flagLoader('grilla_'+this.props.sgconf.id+'.flg').then((xmlFlagValue)=>{
				//console.log("El valor de grilla local "+this.props.sgconf.id+": "+xmlFlagValue);
				tmpValLocalFlag = xmlFlagValue;
				if (tmpValGralFlag == false){
					//console.log("No está listo el valor de grilla general, pero si el de grilla local");
				}
				else{
					//console.log("Ya están listas los dos flags, pero se esta ejecutando por grilla local... \nGrilla General: "+tmpValGralFlag+"\nGrilla Local: "+tmpValLocalFlag+"\n");
					fulfill({localFlagChecker:tmpValLocalFlag,gralFlagChecker:tmpValGralFlag});
				}
			});
		});
	}
	getLast15MinutesBlock(dateObj){
		let actualMins = dateObj.getMinutes();
		if (actualMins >= 0 && actualMins <= 14){
			return new Date(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate(),dateObj.getHours(),0,0,0);
		}
		else if (actualMins >= 15 && actualMins <= 29){
			return new Date(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate(),dateObj.getHours(),15,0,0);
		}
		else if (actualMins >= 30 && actualMins <= 44){
			return new Date(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate(),dateObj.getHours(),30,0,0);
		}
		else if (actualMins >= 45 && actualMins <= 59){
			return new Date(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate(),dateObj.getHours(),45,0,0);
		}
	}
	render(){
		return (<Guia sgconf={this.props.sgconf} startTime={this.state.startTime}  />);
	}
}


export default GuiaContainer;