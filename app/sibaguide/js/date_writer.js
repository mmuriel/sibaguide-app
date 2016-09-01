// JavaScript Document

function write_date()
         {var thetime=new Date();
          var nday=thetime.getDay();
          var nmonth=thetime.getMonth();
          var ntoday=thetime.getDate();
          var nyear=thetime.getYear();
          var AorP=" ";
          if (nday==0)nday="Domingo";
		  if (nday==1)nday="Lunes";
		  if (nday==2)nday="Martes";
		  if (nday==3)nday="Míercoles";
          if (nday==4)nday="Jueves";
		  if (nday==5)nday="Viernes";
		  if (nday==6)nday="Sábado";
		  nmonth+=1;
		  if (nmonth==1)nmonth="Enero";
		  if (nmonth==2)nmonth="Febrero";
		  if (nmonth==3)nmonth="Marzo";
		  if (nmonth==4)nmonth="Abril";
		  if (nmonth==5)nmonth="Mayo";
		  if (nmonth==6)nmonth="Junio";
		  if (nmonth==7)nmonth="Julio";
		  if (nmonth==8)nmonth="Agosto";
		  if (nmonth==9)nmonth="Septiembre";
		  if (nmonth==10)nmonth="Octubre";
		  if (nmonth==11)nmonth="Noviembre";
		  if (nmonth==12)nmonth="Diciembre";
		  if (nyear<=99)nyear= "19"+nyear;
          if ((nyear>99) && (nyear<2000))nyear+=1900;
          //document.write(nday+", " +ntoday+ " " + "de" + " " + nmonth);
          //=============================================================
          elemento=document.getElementById("fecha");
          elemento.childNodes[0].nodeValue=nday+", " +ntoday+ " " + "de" + " " + nmonth;
		 } 
		 
/*
	Pinta la fecha		 
*/
fecha_carga_1=setInterval("write_date()",8000);