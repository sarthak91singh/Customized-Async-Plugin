(function(){

	this.makeCalls = function(dataObj){
		var isAsync, result = [];

		if(!dataObj.data || !Array.isArray(dataObj.data) || !dataObj.data.length){
			return;
		}

		isAsync = !!dataObj.async; // This will take care of that scenario too when async hasn't been passed in the function params. By default, we assume 'async=false'.

		// Utility Function : To make HTTP/AJAX calls
		function makeRequests(url,method,data){
			data = (typeof data == "string") ? data : Object.prototype.toString.call(data)=="[object Object]" ? JSON.stringify(data) : null;
			return new Promise(function(resolve,reject){
				var xhr = new XMLHttpRequest();
				xhr.open(method,url,true);
				xhr.onload = function(){
					if(this.status>=200 && this.status< 300){
						resolve(JSON.parse(this.responseText));
					}
					else{
						reject({
							status : this.status,
							statusText : this.statusText
						})
					}
				}
				xhr.onerror = function(){
					reject({
						status : this.status,
						statusText : this.statusText
					})
				}
				xhr.send(data);
			})
		}

		// Utility Function : To process the results based on 'async' value.
		function processResults(data,index){
			if(isAsync){
				var responseObj = {
					data : data,
					index : index
				}

				result.push(responseObj);
				if(result.length==dataLength){
					dataObj.callback(result);
				}
			}
			else{
				result = data;
				dataObj.callback(result,index);
			}
		}
		
		var dataLength = dataObj.data.length;
		dataObj.data.forEach(function(obj,index){
			var promise = makeRequests(obj.url,obj.method,obj.data);
			promise.then(function(data){
				processResults(data,index);
			})
			.catch(function(err){
				data = err && err.error || "Some error occured !!!";
				processResults(data,index);
			})
		})
	}
})();
