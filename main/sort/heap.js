/*
 * arr 待排序数组
 * result 返回顺序的数组
 */
function heap(arr) {
	if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('heap');
arr = heap(arr);
console.timeEnd('heap');
console.log(arr);
// 推导 
// 时间复杂度 平均  最快  最慢 
// 空间复杂度 
// 稳定性 