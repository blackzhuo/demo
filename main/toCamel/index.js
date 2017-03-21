// 影响了原对象，程序没有返回值
let exampleJSON = {
    'a-b-c': 'wuzhuo',
    'b-c-d': {
        'c-d-e': 'test',
        'fg': {
        	'j-h': 'sad',
        	'lk': 'xcdf'
        }
    },
    'fff': [{
        'x-c-v': {
            'g-h-j': 'xxx',
            'iuy': 'iii'
        }
    }]
}
let toCamel = function(json) {
    let reg = new RegExp('\-([a-zA-z])', 'ig');
    if (Object.prototype.toString.call(json) === '[object Object]') {
        for (let key in json) {
            let val = json[key];
            delete json[key]
            key = key.replace(reg, function($0, $1) {
                return $1.toUpperCase();
            });
            json[key] = val;
            toCamel.call(this, val);
        }
    } else if (Object.prototype.toString.call(json) === '[object Array]') {
    	for(let i = 0, len = json.length; i< len; i++){
    		toCamel.call(this, json[i]);
    	}
    }
}
toCamel(exampleJSON)
console.log(exampleJSON)