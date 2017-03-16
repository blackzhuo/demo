function getSearchObject() {
    return (search = location.search) => {
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
}

function getHashObject(sep = '&') {
    return (hash = location.hash) => {
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
}

function getQueryString() {
    return (key, search) => {
        return getSearchObject.call(this)(search)[key] || null;
    }
}

function getHashString() {
    return (key, hash) => {
        return getHashObject.call(this)(hash)[key] || null;
    }
}

function updateSearch() {
    return (url, key, value) => {
        let host = url.split('?')[0];
        let other = url.split('?')[1];
        let hash = url.split('#')[1];
        if (other) {
            let search = other.split('#')[0];
            let reg = new RegExp(`(^|&)${key}=(.*?)(&|$)`, 'g');
            if (search.match(reg)) {
                search = search.replace(reg, ($0, $1, $2, $3) => {
                    return [$1, key, '=', value, $3].join('');
                });
            } else {
                search += (search ? `&${key}=${value}` : `${key}=${value}`);
            }
            return [`${host}?${search}`, hash ? `#${hash}` : ''].join('');
        } else {
            return [`host?${key}=${value}`, hash ? `#${hash}` : ''].join('');
        }
    }
}

function updateHash() {
    return (url, key, value, sep = '&') => {
        let host = url.split('#')[0];
        let hash = url.split('#')[1];
        if (hash) {
            let reg = new RegExp(`(^|${sep})${key}=(.*?)(${sep}|$)`, 'g');
            if (hash.match(reg)) {
                hash = hash.replace(reg, ($0, $1, $2, $3) => {
                    return [$1, key, '=', value, $3].join('');
                });
            } else {
                hash += (hash ? `${sep}${key}=${value}` : `${key}=${value}`);
            }
            return [`${host}`, hash ? `#${hash}` : ''].join('');
        } else {
            return `${host}#${key}=${value}`;
        }
    }
}