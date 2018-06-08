# Customized-Async-Plugin
This plugin gives the user the flexibility of handling the response of a series of AJAX/HTTP calls, either in a synchronous or asynchrous manner.


Usage of this Plugin is as below :

makeCalls({
	data : [{
		url : "https://api_1/?results=5",
		method : "GET"
	},{
		url : "https://api_2/?results=25",
		method : "GET"
	}],
	async : true,
	callback : function(res,index){
		console.log("Final Response:",res,"and index:",index);
	}
});
