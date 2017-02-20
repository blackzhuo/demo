/* 
 * web worker
 */
if (window.Worker) {
    var info1 = document.getElementById('info1');
    info1.innerHTML += '<br>' + 'support web worker';
    console.log('support web worker');
    var worker = new Worker('work.js');
    worker.postMessage({
        method: 'each',
        args: ['work']
    });
    worker.addEventListener('message', function(e) {
        info1.innerHTML += '<br>' + JSON.stringify(e.data);
        console.log(e.data);
        worker.terminate();
    }, false);
    worker.addEventListener('error', function(e) {
        info1.innerHTML += '<br>' + JSON.stringify(e);
        console.log(e);
    }, false);
} else {
    info1.innerHTML += '<br>' + 'not support web worker';
    console.log('not support web worker');
}