function horas_grilla_cambia_valores()
         {
			 
			 
			 
		  var fecha_real=new Date();
          var hora_real=fecha_real.getHours();
          var mins_real=fecha_real.getMinutes();

          if (hora_real >= 13){
            hora_real = hora_real - 12;
          }


          if (mins_real < 30)
             {horas_grilla_valor1=hora_real+":00";
              horas_grilla_valor2=hora_real+":30";
              horas_grilla_valor3=(hora_real+1)+":00";
              horas_grilla_valor4=(hora_real+1)+":30";
             }
          else
             {horas_grilla_valor1=hora_real+":30";
              horas_grilla_valor2=(hora_real+1)+":00";
              horas_grilla_valor3=(hora_real+1)+":30";
              horas_grilla_valor4=(hora_real+2)+":00";
             }; 


		  if ((hora_real == 10) && (mins_real >= 30))
		     {horas_grilla_valor4="12:00";
             };
		  if ((hora_real == 11) && (mins_real < 30))
		     {horas_grilla_valor3="12:00";
			  horas_grilla_valor4="12:30";
			 };
		  if ((hora_real == 11) && (mins_real >= 30))
		     {horas_grilla_valor2="12:00";
			  horas_grilla_valor3="12:30";
			  horas_grilla_valor4="1:00";
			 };	 	 
          var elemento=document.getElementById("tiempo1");
          elemento.childNodes[0].nodeValue=horas_grilla_valor1;
		  
          var elemento2=document.getElementById("tiempo2");
          elemento2.childNodes[0].nodeValue=horas_grilla_valor2;
		  
          var elemento3=document.getElementById("tiempo3");
          elemento3.childNodes[0].nodeValue=horas_grilla_valor3;
          
		      var elemento4=document.getElementById("tiempo4");
          elemento4.childNodes[0].nodeValue=horas_grilla_valor4; 
         };
		 
horas_grilla_comp=setInterval("horas_grilla_cambia_valores()",1000);
horas_grilla_valor1=" ";
horas_grilla_valor2=" ";
horas_grilla_valor3=" ";
horas_grilla_valor4=" ";

horas_grilla_cambia_valores();