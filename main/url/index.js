function getSearchObject() {
    let search = location.search;
    let ret = {};
    if (/^\?.+/g.test(search)) {
        let val = search.substring(1).match(/[^&]+/g);
        val.forEach((item, index) => {
            let ita = item.match(/[^=]+/g);
            ret[ita[0]] = ita[1];
        });
        return ret;
    }
    return ret;
}

function getHashObject(sep) {
    sep = sep || '&';
    let hash = location.hash;
    let ret = {};
    if (/^\#.+/g.test(hash)) {
        let reg = new RegExp(`[^${sep}]+`, 'g');
        let val = hash.substring(1).match(reg);
        val.forEach((item, index) => {
            let ita = item.match(/[^=]+/g);
            ret[ita[0]] = ita[1];
        });
        return ret;
    }
    return ret;
}

function getQueryString(key) {
    return getSearchObject()[key] || null;
}

function getHashObject(key) {
    return getSearchObject()[key] || null;
}

function updateSearch(url, key, value) {
	let host = url.split('?')[0];
	let search = url.split('?')[1].split('#')[0];
	let hash = url.split('?')[1].split('#')[1];
	let reg = new RegExp(`([^|&])${key}=(.*)&?`, 'g');
	search = search.replace(reg, function($0, $1, $2){
		return [$1, key, '=', value].join('');
	});

	return host + search + hash;
}

function updateHash(url, key, value) {}






