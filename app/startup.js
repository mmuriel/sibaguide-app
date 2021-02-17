import React from 'react';
import ReactDOM from 'react-dom';
import GuiaContainer from 'sibaguide/guia/GuiaContainer.js';

const sgconf = sgConf;
//Esta variable, sgConf, es una variable de configuracion 
//definida en el archivo sibaguide/js/conf.js
const posicion = {
	xpos: 0,
	ypos: 0
};

ReactDOM.render(<GuiaContainer sgconf={sgconf} posicion={posicion} />,document.getElementById('grid_box'));
