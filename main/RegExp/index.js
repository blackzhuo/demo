// 重新编译正则，重新定义正则，返回新的正则表达式
let reg = new RegExp('a', 'i');
reg.compile('b', 'i');

// 返回true false，表示有没有查找到
let reg1 = new RegExp('a', 'i');
reg1.test('aaaab')


let reg2 = new RegExp('a', 'ig');
reg2.exec('aaaab a'); // 每次执行都会向后继续查找
reg2.lastIndex; // 返回查找到内容的索引

//========================================

'aabb ab'.search(/a/ig); // 返回第一个匹配到元素的索引
'aabb ab'.search(/x/ig); // 没有匹配到返回 -1


'aabb ab'.match(/a/ig); // 返回数组，数组中包含所有匹配到的元素
'aabb ab'.match(/x/ig); // 返回null

'aa-bb-ab'.split(/-/ig); // 接收正则或者字符串

'aa-bb_ab'.replace(/(-).*(_)/ig, function($1, $2){
	console.log($1, $2);
	return $1+'x' + $2 + 'x';
});

'aaa bbb ccc'.replace(/\b\w+\b/g, function($1){
	console.log($1)
    return $1.substring(0,1).toUpperCase()+$1.substring(1);}
);

'"a", "b"'.replace(/"([^"]*)"/g, "'$1'");
'"a", "b"'.replace(/"([^"]*)"/g, function($0, $1){
	console.log($0, $1)
	return "'" + $1 + "'"
});

// $1 第一个组内匹配结果， $2 第二个组内匹配结果 ...
"Doe, John".replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
// $0 整体匹配的结果， $1 是第一个小组内匹配结果 ...
"Doe, John".replace(/(\w+)\s*, \s*(\w+)/, function($0, $1, $2){
	console.log($0, $1, $2)
	return $2 + $1;
});

// 返回的内容替换 $0 的结果
'aasd-basd-casd'.replace(/-([a-z])/g, function($0, $1){
	console.log($0, $1)
	return $1.toUpperCase();
})

// 第二个参数使用表达式，$1 第一个组内匹配结果， $2 第二个组内匹配结果 ... ，表达式匹配的结果组合 替换正则匹配到的全部内容 
// 第二个参数是方法， $0 整体匹配的结果， $1 是第一个小组内匹配结果 ... ，返回的结果替换 $0 的内容。


