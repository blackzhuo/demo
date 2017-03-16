// 接收一个数组，数组的内容是中间件方法
export default function compose(...funcs) {
    // 如果不存在中间件，则返回一个空函数
    if (funcs.length === 0) {
        return arg => arg
    }
    // 如果只有一个中间件，则返回这个中间件函数
    if (funcs.length === 1) {
        return funcs[0]
    }
    // 如果是多个中间件，使用reduce方法把中间件嵌套起来，最终返回一个方法，在执行过程中，所有中间件都会执行到
    return funcs.reduce((a, b) => (...args) => a(b(...args)))

    /*
	return funcs.reduce(function(a, b){
		return function(...args){
			return a(b(args));
		}
	});
    */
}