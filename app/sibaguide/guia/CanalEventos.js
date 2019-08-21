import React from 'react';
import Evento from './Evento.js'



class CanalEventos extends React.Component{

	constructor(props){
		super(props);

		this.getFirst15MinsBlock = this.getFirst15MinsBlock.bind(this);
		this.serachForFirstEventName = this.serachForFirstEventName.bind(this);
	}
	getFirst15MinsBlock(){

		let hourBlocks = parseInt(this.props.startTime.getHours() * 4);
		let minBlocks = parseInt((this.props.startTime.getMinutes()) / 15);
		return parseInt(hourBlocks + minBlocks);
	}
	serachForFirstEventName(){

		let index = this.getFirst15MinsBlock();
		while (this.props.eventos[index].getAttribute('value') == 'idem' && index > 0){
			index--;
		}
		//console.log("Valor del inidice: "+index);
		//console.log(this.props.eventos[index].getAttribute('value'));
		return this.props.eventos[index].getAttribute('value');
	}
	render(){

		let eventName = this.serachForFirstEventName();
		let index = this.getFirst15MinsBlock();
		let listaEventos = [];
		let longBox = 0;
		let esContinuacion = false;
		let isActive = false;
		for(let i = index; i <= (index + 7);i++){
			if (this.props.eventos[i].getAttribute('value') != eventName && this.props.eventos[i].getAttribute('value')=='idem'){
				longBox++;

				if (i==index){
					esContinuacion = true;
				}

				if (i==(index + 7)){
					if (typeof this.props.eventos[i+1] != 'undefined' && this.props.eventos[i+1].getAttribute('value')=='idem'){
						isActive = ((listaEventos.length == 0) ? true : false)
						listaEventos.push(<Evento nombre={eventName} longBox={longBox} isContinue={esContinuacion} isNext={true} isActive={isActive} key={(this.props.canalKey +"-"+ i)}/>);
					}
					else{
						isActive = ((listaEventos.length == 0) ? true : false);
						listaEventos.push(<Evento nombre={eventName} longBox={longBox} isContinue={esContinuacion} isNext={false} isActive={isActive} key={(this.props.canalKey +"-"+ i)} />);
					}
				}

			}
			else{

				if (i==(index + 7)){
					if (typeof this.props.eventos[i+1] != 'undefined' && this.props.eventos[(i+1)].getAttribute('value')=='idem'){
						isActive = ((listaEventos.length == 0) ? true : false);
						listaEventos.push(<Evento nombre={eventName} longBox={longBox} isContinue={esContinuacion} isNext={true} isActive={isActive} key={(this.props.canalKey +"-"+ i)}/>);
					}
					else{
						isActive = ((listaEventos.length == 0) ? true : false);
						listaEventos.push(<Evento nombre={eventName} longBox={longBox} isContinue={esContinuacion} isNext={false} isActive={isActive} key={(this.props.canalKey +"-"+ i)}/>);
					}
				}
				else if (i != index){
					isActive = ((listaEventos.length == 0) ? true : false);
					listaEventos.push(<Evento nombre={eventName} longBox={longBox} isContinue={esContinuacion} isNext={false} isActive={isActive} key={(this.props.canalKey +"-"+ i)}/>);
				}	
					
				if (esContinuacion == true)
					esContinuacion = false;
				longBox=1;
				eventName = this.props.eventos[i].getAttribute('value');
			}
		}
		return (
			<div className="canal__eventos">
				<ul className="canal__eventos__list">
				{listaEventos}
				</ul>
			</div>
		);
	}
}
export default CanalEventos;