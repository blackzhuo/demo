/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 生成m个桶，按照一定规则把固定范围的数字，放在对应的桶中，然后对每个桶排序(可以选择一种算法),然后把桶内的数据合并成结果返回
 */
function bucket(arr) {
	if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('bucket');
arr = bucket(arr);
console.timeEnd('bucket');
console.log(arr);
// 推导 
// 时间复杂度 平均  最快  最慢 
// 空间复杂度 
// 稳定性 