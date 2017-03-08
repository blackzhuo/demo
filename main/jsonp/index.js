let defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
}

function generateCallbackFunction() {
    return `jsonp_${new Date()}_${Math.ceil(Math.random() * 100000})`;
}

function clearFunction(functionName) {
    try {
        delete window[functionName];
    } catch (ex) {
        window[functionName] = null;
    }
}

function removeScript(scriptId) {
    let script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
}

function jsonp(url, options) {
	options = Object.assigin({}, options, defaultOptions);
	let timeoutId = null;
	let callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
	window[callbackFunction] = function(response){
		options.callback && options.callback(response);
		timeoutId && clearTimeout(timeoutId);
		removeScript(`${options.jsonpCallback}_${callbackFunction}`);
		clearFunction(callbackFunction);
	}
	url += url.indexOf('?') === -1 ? '?' : '&';
	let jsonpScript = document.createElement('script');
	jsonpScript.setAttribute('src', `${url}${options.jsonpCallback}=${callbackFunction}`);
	jsonpScript.setAttribute('id', `${options.jsonpCallback}_${callbackFunction}`);
	document.getElementsByTagName('head')[0].appendChild(jsonpScript);

	timeoutId = setTimeout(()=>{
		removeScript(`${options.jsonpCallback}_${callbackFunction}`);
		clearFunction(callbackFunction);
	}, options.timeout);
}