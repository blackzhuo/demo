$(function() {
    const _ = {
        now() {
            return (new Date()).getTime();
        },
        debounce(func, wait, immediate) {
            let timeout, args, context, timestamp, result;
            let later = function() {
                let last = _.now() - timestamp;
                if (last < wait && last >= 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    }
                }
            };
            return function() {
                context = this;
                args = arguments;
                timestamp = _.now();
                let callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }
                return result;
            };
        },
        throttle(func, wait, options) {
            let context, args, result;
            let timeout = null;
            let previous = 0;
            if (!options) options = {};
            let later = function() {
                previous = options.leading === false ? 0 : _.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            };
            return function() {
                let now = _.now();
                if (!previous && options.leading === false) previous = now;
                let remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        }
    };
    // debounce
    function handleQuery() {
        console.log(2)
    }
    let lazyQuery = _.debounce(handleQuery, 300);
    $('#search').click(lazyQuery);
    // throttle
    $('body').height(10000);

    function handleScroll() {
        console.log(1)
    }
    let throttled = _.throttle(handleScroll, 100, {
        leading: false,
        trailing: false
    });
    $(window).scroll(throttled);
});

$(function(){
  
});