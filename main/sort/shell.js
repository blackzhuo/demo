/*
 * arr 待排序数组
 * result 返回顺序的数组
 */
function shell(arr) {
	if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('shell');
arr = shell(arr);
console.timeEnd('shell');
console.log(arr);
// 推导 
// 时间复杂度 平均  最快  最慢 
// 空间复杂度 
// 稳定性 