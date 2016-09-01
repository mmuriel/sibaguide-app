// JavaScript Document

var videos_ctrl_indices2=0
//========================================================
//Funciones
function videos_xmlLoaded()
	     {var videos_cant_ele1=videos_xmlDoc.firstChild.childNodes.length;	 
		  videos_cant_ele1--;
		  var videos_lista_indices= new Array();
		  for (i=0;i<=videos_cant_ele1;i++)
		      {if (videos_xmlDoc.firstChild.childNodes[i].nodeType==3)
		   	      {videos_lista_indices.push(i);
		   		  };
		   	  };
		  var videos_elemen_list_indices=videos_lista_indices.length;
		  videos_elemen_list_indices--;	  
		  for (i=0;i<=videos_elemen_list_indices;i++)
		      {videos_valor_prueba=videos_xmlDoc.firstChild.removeChild(videos_xmlDoc.firstChild.childNodes[i]);
	          };
	      var videos_hora_now = new Date();
          var videos_hora_1= videos_hora_now.getHours();
          videos_cont_xml=videos_xmlDoc.firstChild.childNodes[videos_hora_1].getAttribute('value');
		  var videos_elemento=document.getElementById("videos");
		  videos_indice_lista=videos_hora_1; 
		  while (videos_cont_xml=="idem")
				{videos_indice_lista--;
				 if (videos_indice_lista >=0)
					{videos_cont_xml=videos_xmlDoc.firstChild.childNodes[videos_indice_lista].getAttribute('value');
					}
				 else
					{videos_cont_xml="base.asx";
					};	
				};
		  var videos_nombre_src=videos_cont_xml;
		 videos_elemento.src=videos_nombre_src; 
       		 };

function videos_ctrl_flag()
         {videos_xmlFlg3=document.implementation.createDocument("", "", null);
	      videos_xmlFlg3.onload=videos_cargadorXml;
          videos_xmlFlg3.load("video.xml");
		 };
function videos_ctrl_time()
         {var videos_ctrl_tiempo=new Date()
		  videos_ctrl_tiempo2= videos_ctrl_tiempo.getHours();
		  if (videos_ctrl_tiempo2 != videos_ctrl_tiempo_ini)
		     {parent.marco2.location.reload();
		     };
		 };
function videos_cargadorXml(videos_file)
	     {videos_cont_flg = videos_xmlFlg3.childNodes[0].getAttribute('value');
		  videos_prueba100=videos_cont_flg;
		  if (videos_cont_flg2 != videos_cont_flg)
		     {
			  parent.marco2.location.reload();
		  	 };	 
		 };
function videos_xmlLoaded3(videos_file)
	     {videos_cont_flg2=videos_xmlFlg2.childNodes[0].getAttribute('value');

		 }; 
var videos_hora_inicio=new Date();
var videos_ctrl_tiempo_ini = videos_hora_inicio.getHours();
var videos_xmlFlg2 = document.implementation.createDocument("", "", null);
	videos_xmlFlg2.onload = videos_xmlLoaded3;
    videos_xmlFlg2.load("video.xml");
videos_xmlDoc = document.implementation.createDocument("", "", null);
videos_xmlDoc.onload = videos_xmlLoaded;
videos_xmlDoc.load("v_COL20.xml");
//ctrl_1=setInterval("ctrl_flag()",12000);
videos_ctrl_2=setInterval("videos_ctrl_time()",27000); 