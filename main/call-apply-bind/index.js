// call apply bind 都能改变某个函数执行时上下文环境，就是函数体内this的指向。

let cls = {
	aa: 123,
	show(){
		console.log(this.aa);
	}
}
cls.show();

let cls1 = {
	aa: 987
}
cls.show.call(cls1);
cls.show.apply(cls1);
cls.show.bind(cls1);