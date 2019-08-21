const dataGuiaLoader = (pathToFile) => {
	return new Promise ((fulfill,reject)=>{
		let xmlGuia = document.implementation.createDocument("","");
		xmlGuia.onload = (e) => {
			fulfill(xmlGuia);
		};
		xmlGuia.load(pathToFile);
	});
}

const flagLoader = (pathToFlag) => {

	return new Promise((fulfill,reject) => {
		let xmlFlg = document.implementation.createDocument("","");
		xmlFlg.onload = (e) => {
			//console.log(xmlFlg.childNodes[0].getAttribute('value'));
			fulfill(xmlFlg.childNodes[0].getAttribute('value'));
		}
		xmlFlg.load(pathToFlag);
	});
}
export default {flagLoader,dataGuiaLoader}