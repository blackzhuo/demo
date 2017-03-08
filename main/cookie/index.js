function cookie(key, value, options) {
    if (arguments.length > 1 && String(value) !== '[object Object]') {
        options = Object.assign({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            let day = options.expires;
            let t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [encodeURIComponent(key), '=', encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    return decodeURLComponent(new RegExp(`(?:^|; )${encodeURIComponent(key)}=([^;]*)`).exec(document.cookie)[1]) || null;
}