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
		this.loadGuiaData = this.loadGuiaData.bind(this);
		this.changeState = this.changeState.bind(this);
		//Define los valores que se pueden calcular de manera directa
		let dateNow = new Date();
		//dateNow.setTime(dateNow.getTime() + (props.sgconf.guia.timezone * 60 * 60 * 1000));
		let startTimeBlock = this.getLast15MinutesBlock(dateNow);

		//Definiendo el estado inicial
		this.state = {
			localFlag: '',
			gralFlag: '',
			startTime: startTimeBlock,
			dataGuia:{}
		}
	}
	componentDidMount(){
		console.log("GuiaContainer.componentDidMount()");
		this.flagsTimer = setInterval(()=>{this.checkFlags();},5000);;
		this.timeAgentTimer = setInterval(()=>{this.timeChangeAgent();},1000);
	}
	componentDidUpdate(){
		console.log('GuiaContainer.componentDidUpdate()');
	}
	componenWillUnmount(){
		clearInterval(this.flagsTimer);
		clearInterval(this.timeAgentTimer);
	}
	/*
		Custom functions
	*/


	changeState(newStateValues){


		console.log("Antiguo State");
		console.log(this.state);

		console.log("El objeto de parametros enviado GuiaContainer.changeSate()");
		console.log(newStateValues);
		/* Cambia el estado con cambio del tiempo */
		let fieldsToUpdate = {
			localFlag: this.state.localFlag,
			gralFlag: this.state.gralFlag,
			startTime: this.state.startTime,
			dataGuia: this.state.dataGuia
		}

		if (typeof newStateValues.startTime != 'undefined'){
			fieldsToUpdate.startTime = newStateValues.startTime;
		}

		if (typeof newStateValues.gralFlag != 'undefined'){
			fieldsToUpdate.gralFlag = newStateValues.gralFlag;
		}

		if (typeof newStateValues.localFlag != 'undefined'){
			fieldsToUpdate.localFlag = newStateValues.localFlag;
		}

		if (typeof newStateValues.dataGuia != 'undefined'){
			fieldsToUpdate.dataGuia = newStateValues.dataGuia;
		}

		console.log("Nuevo State");
		console.log(fieldsToUpdate);

		console.log("================================\n");
		this.setState(prevState => {
			return fieldsToUpdate;
		});

	}

	/*
		Este agente verifica si se ha cambiado del bloque de 15 minutos 
		para modificar (recargar) la parrilla
	*/

	timeChangeAgent(){
		let self = this;
		setTimeout(()=>{
			let timeChangeDate = new Date();
			//timeChangeDate.setTime(timeChangeDate.getTime() + (self.props.sgconf.guia.timezone * 60 * 60 * 1000));
			//timeChangeDate.setTime(timeChangeDate.getTime() + (self.props.sgconf.guia.timezone * 60 * 60 * 1000));
			timeChangeDate = self.getLast15MinutesBlock(timeChangeDate);
			if (timeChangeDate.valueOf() != self.state.startTime.valueOf()){

				console.log("Son diferentes los getDay()?: "+timeChangeDate.getDay()+" - "+self.state.startTime.getDay()+"");
				if (timeChangeDate.getDay() != self.state.startTime.getDay())
					
					self.loadGuiaData({startTime: timeChangeDate});
				else{
					console.log("GuiaContainer.timeChangeAgent() Llamando desde...");
					self.changeState({startTime: timeChangeDate});
				}

			}
		},1000);
	}

	//Verifica si las banderas general y/o local han sido modificadas
	checkFlags(){
		this.loadFlags().then((rawFlagsVals)=>{
			if (rawFlagsVals.localFlagChecker != this.state.localFlag || rawFlagsVals.gralFlagChecker != this.state.gralFlag ){

				this.loadGuiaData({localFlag:rawFlagsVals.localFlagChecker,gralFlag:rawFlagsVals.gralFlagChecker});
				
			}
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



	loadGuiaData(paramsToChangeState){
		let self = this;
		let dayOfWeek = this.state.startTime.getDay();
		if (typeof paramsToChangeState.startTime != 'undefined'){
			dayOfWeek = paramsToChangeState.startTime.getDay();
		}

		if (dayOfWeek == 0){//Ajuste el domingo a valor = 7, por que el objeto JS date define el domingo como = 0
			dayOfWeek = 7;
		}
		GuiaHelper.dataGuiaLoader("h_"+(parseInt(parseInt(dayOfWeek)) )+"_"+this.props.sgconf.id+".xml").then((xmlData)=>{
			//this.dataGuiaXml = xmlData;
			paramsToChangeState.dataGuia = xmlData;
			console.log("GuiaContainer.loadGuiaData() Llamando desde...");
			this.changeState(paramsToChangeState);
			console.log(xmlData);
		}).catch(error=>{
			console.log("Ocurrio un error cargando el contenido de la guia... Guia.loadGuiaData()");
			console.log(error);
		});
	}


	render(){
		console.log("GuiaContainer.render()");
		if (typeof this.state.dataGuia.URL != 'undefined'){
			return (<Guia sgconf={this.props.sgconf} startTime={this.state.startTime} dataGuia={this.state.dataGuia} />);
		}
		else{
			return (<h1></h1>);
		}
	}
}


export default GuiaContainer;