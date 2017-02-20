/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 遍历n次数组，把最大(最小的)冒泡到最最尾端(前端)
 */
function bubble(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let i;
    let j;
    let temp;
    let len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = 0; j < len - i - 1; j++) {
            (arr[j] > arr[j + 1]) && ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]);
        }
    }
    return sign;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('bubble');
arr = bubble(arr);
console.timeEnd('bubble');
console.log(arr);
// 推导 n + n + ... + n = n * n = n2
// 时间复杂度 平均 o(n2) 最快 o(n) 最慢 o(n2)
// 空间复杂度 o(1)
// 稳定性 稳定