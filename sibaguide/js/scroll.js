
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