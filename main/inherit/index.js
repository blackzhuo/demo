// prototype, __proto__, constructor
// https://github.com/creeperyang/blog/issues/9
// 借用构造函数继承
let Parent = function (name, age, school = ['cclg', 'jtyz']) {
    this.name = name;
    this.age = age;
    this.school = school;
    this.showName = () => {
        console.log(this.name);
        return this.name;
    }
}
Parent.prototype.showAge = function () {
    console.log(this.age);
    return this.age;
}
let Child = function (name, age, school) {
    Parent.call(this, name, age, school); // 通过改变Parent中的this, 来实现子类中this也可以调用到父类中的属性和方法。
}
let me = new Child('wwz', 26, ['cclg', 'jtyz']);
let you = new Child('llx', 26, ['cclg', 'jhyz']);
console.log(me.name); // 可以向父类传参
console.log(me.age);
console.log(me.school);
me.showName();
// me.showAge(); // 无法继承到原形链上的属性方法
console.log(you.name);
console.log(you.age);
console.log(you.school);
you.showName();
// you.showAge();
console.log(me.showName === you.showName) // 每个实例都有一个新的showName方法引用，没有复用父类中方法，浪费内存。
me.school.push('jtjz'); // 实例间的引用属性也是相互隔离的
console.log(me.school);
console.log(you.school);
console.log(me.__proto__ === Parent.prototype);

// 原型继承
// 子类于父类之间的原型上的方法，动态修改后都会自动继承，并且引用同一位置。
// __protp__ 和 prototype 的关系是什么
let Parent = function (name = 'wz', age = 25, school = ['cclg', 'jtyz']) {
    this.name = name;
    this.age = age;
    this.school = school;
    this.showName = () => {
        console.log(this.name);
        return this.name;
    }
}
Parent.prototype.showAge = function () {
    console.log(this.age);
    return this.age;
}
let Child = function () { }

Child.prototype = new Parent(); // 通过把子类的原型指向父类的实例，子类的__proto__ 指向父类的 prototype

let me = new Child(); // 无法向父类传参数
let you = new Child();

console.log(me.name); // 可以访问父类属性
console.log(me.age);
console.log(me.school);
me.showName(); // 可以访问父类实例方法
me.showAge(); // 可以访问父类原型方法

console.log(you.name);
console.log(you.age);
console.log(you.school);
you.showName();
you.showAge();

console.log(me.showName === you.showName) // 子类共享父类的实例方法
console.log(me.showAge === you.showAge) // 子类共享父类的原型方法

me.school.push('jtjz');
console.log(me.school); // 子类间的引用传递是共享的
console.log(you.school);

me.name = 'lxx';
console.log(me.name); // 子类间的值传递是隔断的
console.log(you.name);


Parent.prototype.showSchool = function () {
    console.log(this.school);
    return this.school;
}
me.showSchool(); // 父类中添加新的方法，子类自动继承
you.showSchool();


Parent.prototype.showAge = function () {
    console.log(28);
}
me.showAge(); // 修改父类原型上的方法，子类也会改变
you.showAge();
console.log(me.showAge === you.showAge); // 子类引用同一个方法


me.showName = function () {
    console.log('xxx');
}
me.showName(); // 修改子类的实例方法，另外的子类不会改变
you.showName();
console.log(me.showName === you.showName); // 修改后，子类的继承方法不再引用同一个方法


me.__proto__.sayHi = function () {
    console.log('hi');
}
me.sayHi();
you.sayHi();
console.log(me.sayHi === you.sayHi) // 通过修改 __proto__ 原形链上的方法，子类都会自动继承，并且引用同一个方法
console.log(me.__proto__ === Parent.prototype);

// 组合继承
let Parent = function (name = 'wz', age = 25, school = ['cclg', 'jtyz']) {
    this.name = name;
    this.age = age;
    this.school = school;
    this.showName = () => {
        console.log(this.name);
        return this.name;
    }
}
Parent.prototype.showAge = function () {
    console.log(this.age);
    return this.age;
}

let Child = function (name, age, school) {
    Parent.call(this, name, age, school); // 调用父类构造函数
}

Child.prototype = new Parent(); // 通过把子类的原型指向父类的实例，子类的__proto__ 指向父类的 prototype // 调用父类构造函数

let me = new Child('wwz', 26, ['cclg', 'jtyz']); // 可以向父类传参
let you = new Child('llx', 26, ['cclg', 'jhyz']);

console.log(me.name); // 可以访问父类属性
console.log(me.age);
console.log(me.school);
me.showName(); // 可以访问父类实例方法
me.showAge(); // 可以访问父类原型方法

console.log(you.name);
console.log(you.age);
console.log(you.school);
you.showName();
you.showAge();

console.log(me.showName === you.showName) // 子类不共享实例方法
console.log(me.showAge === you.showAge) // 子类共享父类的原型方法

me.school.push('jtjz');
console.log(me.school); // 子类间的引用传递不是共享的
console.log(you.school);

me.name = 'lxx';
console.log(me.name); // 子类间的值传递是隔断的
console.log(you.name);


Parent.prototype.showSchool = function () {
    console.log(this.school);
    return this.school;
}
me.showSchool(); // 父类中添加新的方法，子类自动继承，但是属性只读取自身的
you.showSchool();


Parent.prototype.showAge = function () {
    console.log(28);
}
me.showAge(); // 修改父类原型上的方法，子类也会改变
you.showAge();
console.log(me.showAge === you.showAge); // 子类引用同一个方法


me.showName = function () {
    console.log('xxx');
}
me.showName(); // 修改子类的实例方法，另外的子类不会改变
you.showName();
console.log(me.showName === you.showName); // 修改后，子类的继承方法不再引用同一个方法


me.__proto__.sayHi = function () {
    console.log('hi');
}
me.sayHi();
you.sayHi();
console.log(me.sayHi === you.sayHi) // 通过修改 __proto__ 原形链上的方法，子类都会自动继承，并且引用同一个方法
// 调用了两次构造函数,原型上多一份实例属性

// 组合寄生继承
let inherit = function(parentProto){
    let Func = function(){}
    Func.prototype = parentProto;
    return new Func();
}

let Parent = function (name, age, school = ['cclg', 'jtyz']) {
    this.name = name;
    this.age = age;
    this.school = school;
    this.showName = () => {
        console.log(this.name);
        return this.name;
    }
}
Parent.prototype.showAge = function () {
    console.log(this.age);
    return this.age;
}
let Child = function (name, age, school) {
    Parent.call(this, name, age, school); // 通过改变Parent中的this, 来实现子类中this也可以调用到父类中的属性和方法。
}

let proto = inherit(Parent.prototype); // 通过寄生修改原型，不需要再执行一次父类构造函数
proto.constructor = Child; // 修正子类原形链上的构造函数
Child.prototype = proto;

let me = new Child('wwz', 26, ['cclg', 'jtyz']); // 可以向父类传参
let you = new Child('llx', 26, ['cclg', 'jhyz']);

console.log(me.name); // 可以访问父类属性
console.log(me.age);
console.log(me.school);
me.showName(); // 可以访问父类实例方法
me.showAge(); // 可以访问父类原型方法

console.log(you.name);
console.log(you.age);
console.log(you.school);
you.showName();
you.showAge();

console.log(me.showName === you.showName) // 子类不共享实例方法
console.log(me.showAge === you.showAge) // 子类共享父类的原型方法

me.school.push('jtjz');
console.log(me.school); // 子类间的引用传递不是共享的
console.log(you.school);

me.name = 'lxx';
console.log(me.name); // 子类间的值传递是隔断的
console.log(you.name);


Parent.prototype.showSchool = function () {
    console.log(this.school);
    return this.school;
}
me.showSchool(); // 父类中添加新的方法，子类自动继承，但是属性只读取自身的
you.showSchool();


Parent.prototype.showAge = function () {
    console.log(28);
}
me.showAge(); // 修改父类原型上的方法，子类也会改变
you.showAge();
console.log(me.showAge === you.showAge); // 子类引用同一个方法


me.showName = function () {
    console.log('xxx');
}
me.showName(); // 修改子类的实例方法，另外的子类不会改变
you.showName();
console.log(me.showName === you.showName); // 修改后，子类的继承方法不再引用同一个方法


me.__proto__.sayHi = function () {
    console.log('hi');
}
me.sayHi();
you.sayHi();
console.log(me.sayHi === you.sayHi) // 通过修改 __proto__ 原形链上的方法，子类都会自动继承，并且引用同一个方法