// JavaScript Document



function dotime(){ 

/*theTime=setTimeout('dotime()',1000);
*/
d = new Date();
hr= d.getHours();
mn= d.getMinutes();
sc= d.getSeconds();
ampm = "AM";
ele=document.getElementById('hora');

var h = hr;
if (h >= 12) {
    h = hr-12;
    ampm = "PM";
}
if (h == 0) {
    h = 12;
}

if (mn<10)
mn="0"+mn;

if (sc<10)
sc="0"+sc;

if (hr>=12)
ampm="PM";
else
ampm="AM"

ele.childNodes[0].nodeValue=h+": "+mn+": "+sc+" "+ampm;

}


setInterval("dotime()",1000)