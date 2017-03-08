function getSearchObject() {
    let search = location.search;
    if (/^\?.+/g.test(search)) {
    	let val = search.substring(1).match(/[^&]+/g);
    	val.forEach((item, index) => {

    	});
    }
    return {}
}

function getHashObject() {}

function updateSearch(url, key, value) {
	
}

function updateHash(url, key, value) {}