let func1 = function(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val * 1);
        }, 1000);
    });
}
let func2 = function(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val * 2);
        }, 1000);
    });
}
let func3 = function(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val * 3);
        }, 1000);
    });
}
let func4 = function(val) {
    if (val > 10) {
        return Promise.resolve(val * 4);
    } else {
        return Promise.reject(0);
    }
}
func1(2).then(func2).then(func3).then(func4).then((val) => {
    console.log(val)
}).catch((val) => {
    console.log(val)
});