function throttle(func, later, i, g) {}

function debounce(func, later, i) {
    let context, args, timestamp, timer, result;
    let done = function() {
        let remain = +new Date() - timestamp;
        if (remain < later) {
            timer = setTimeout(done, remain);
        } else {
            if (!i) {
                result = func.call(context, args);
            }
            timer = context = args = null;
        }
    }
    return function() {
        context = this;
        args = arguments;
        timestamp = +new Date();
        if (!timer && i) {
            result = func.call(context, args);
            context = args = null;
        }
        if (!timer) {
            timer = setTimeout(done, later);
        }
        return result;
    }
}
// debounce
function handleQuery() {
    console.log(2)
}
let lazyQuery = debounce(handleQuery, 300);
$('#search').click(lazyQuery);
let lazyQuery1 = debounce(handleQuery, 300, true);
$('#search1').click(lazyQuery1);
// throttle
$('body').height(10000);

function handleScroll() {
    console.log(1)
}
let throttled = throttle(handleScroll, 100, {
    leading: false,
    trailing: false
});
$(window).scroll(throttled);