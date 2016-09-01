var scroll = (function($,sgConf){

	var xmlData, xmlFlg, flgWatcher, timeWatcher, txtToDisplay = '', timeFlgValue = '', widthContainerBox = 0;
	console.log($.keyframe);


	var _loadXmlData = function(){

		xmlData = document.implementation.createDocument("","");
		xmlData.onload = function(e){

			//console.log(xmlData.childNodes[0].childNodes[3].getAttribute('value'));
			var dateNow = new Date();
			var tagInd = parseInt( parseInt(dateNow.getHours()) + 1);
			
			//Define el texto a mostrar
			txtToDisplay = _setMessageToDisplay(tagInd);
			_setContainerWidthBlock();
			_displayMessages();
			console.log(txtToDisplay.length);
			_startAnimation();
			

		}
		xmlData.load('s_'+sgConf.id+'.xml');

	}

	var _loadXmlFlag = function(){

		xmlFlg = document.implementation.createDocument("","");
		xmlFlg.onload = function(e){

			if (_checkTimeFlg()){

				//Reload content
				_loadXmlData();

			}
			else {
				console.log("No debe cargar contenido del flag");
			}
		}
		xmlFlg.load('scroll.xml');

	}

	var _checkTimeFlg = function(){

		//console.log(xmlFlg);
		var tmpXmlVal = xmlFlg.childNodes[0].getAttribute('value');
		if (timeFlgValue === ''){

			timeFlgValue = tmpXmlVal;
			return true;

		}

		if (timeFlgValue == tmpXmlVal){

			return false;

		}
		else {

			timeFlgValue = tmpXmlVal;
			return true;

		}

	}


	var _displayMessages = function(){

		$(".scroll_box_marqueee").html(txtToDisplay);

	}

	var _startAnimation = function(){

		$(".scroll_box_marqueee").resetKeyframe(function(){});

		var destBox = parseFloat(widthContainerBox * (-1));
		$.keyframe.define({
		    name: 'move',
		    from: {
		        'left': '640px' //Note that 'transform' will be autoprefixed for you
		    },
		    to: {
		        'left': ""+destBox+"em" //Note that 'transform' will be autoprefixed for you
		    }
		});

		$(".scroll_box_marqueee").playKeyframe({
		    name: 'move', // name of the keyframe you want to bind to the selected element
		    duration: _calculateSpeed()+'s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
		    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
		    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
		    iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
		    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
		    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
		    complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
		});

	}


	var _calculateSpeed = function (){

		var secs = parseInt(txtToDisplay.length / sgConf.scroll.speed);
		return secs;

	}


	var _setContainerWidthBlock = function(){

		widthContainerBox = parseFloat(txtToDisplay.length * 0.65);
		if (txtToDisplay.length < 32){
			widthContainerBox = sgConf.scroll.minWidthBox;
		}

		$(".scroll_box_marqueee").css("width",""+widthContainerBox+"em"); 

	}


	var _setMessageToDisplay = function(tagInd){

		var nodeName = "h"+tagInd;
		
		for (var i = 0; i < xmlData.childNodes[0].childNodes.length; i++){

			if (xmlData.childNodes[0].childNodes[i].tagName == nodeName){

				/*
				console.log("Node name: "+nodeName);
				console.log(xmlData.childNodes[0].childNodes[i].getAttribute('value'));
				console.log("-------");
				*/

				if (xmlData.childNodes[0].childNodes[i].getAttribute('value') == 'idem'){

					if (tagInd == 1){

						return sgConf.scroll.defaultMsg;

					}

					tagInd--;
					return _setMessageToDisplay(tagInd);

				}
				else {

					return xmlData.childNodes[0].childNodes[i].getAttribute('value');

				}

			}

		}


	}


	var _timeWatcher = function (){

		var timeBase = new Date();
		var hourBase = timeBase.getHours();
		timeWatcher = setInterval(function(){

			var timeNow = new Date();
			var hourNow = timeNow.getHours();
			if (hourNow != hourBase){

				hourBase = hourNow;
				_loadXmlData();

			}

		},2000);

	}

	return {
		loadXmlData : function(){
		},
		loadXmlFlag : function(){
			//console.log("Cargando el contenido del flag");
			_loadXmlFlag ();
		},
		startFlgWatcher: function(){
			//console.log("Hola mundo startFlagWatcher");
			flgWatcher = setInterval(_loadXmlFlag,5000);
		},
		startTimeWatcher: function(){

			_timeWatcher();

		}
	}

})(jQuery,sgConf)
scroll.loadXmlFlag();
scroll.startFlgWatcher();
scroll.startTimeWatcher();

/*
function scroll_ctrl_flag()
         {scroll_xmlFlg3=document.implementation.createDocument("", "", null);
	      scroll_xmlFlg3.onload=scroll_cargadorXml;
          scroll_xmlFlg3.load("scroll.xml");
		 };
function scroll_ctrl_time()
         {var scroll_ctrl_tiempo=new Date()
		  scroll_ctrl_tiempo2= scroll_ctrl_tiempo.getHours();
		  if (scroll_ctrl_tiempo2 != scroll_ctrl_tiempo_ini)
		     {parent.marco5.location.reload();
		     };
		 };
function scroll_cargadorXml(file)
	     {cont_flg = xmlFlg3.childNodes[0].getAttribute('value');
		  if (cont_flg2 != cont_flg)
		     {
			  parent.marco5.location.reload();
		  	 };	 
		 };
function xmlLoaded3(file)
	     {cont_flg2=xmlFlg2.childNodes[0].getAttribute('value');
		 }; 
//Inicializamos el programa.
//==========================================================		 		 		 
 hora_inicio=new Date();
 ctrl_tiempo_ini=hora_inicio.getHours();
 xmlFlg2 = document.implementation.createDocument("", "", null);
 xmlFlg2.onload = xmlLoaded3;
 xmlFlg2.load("scroll.xml");


		  
prueba12=setInterval("ctrl_flag()",12000);
prueba13=setInterval("ctrl_time()",12000);
*/