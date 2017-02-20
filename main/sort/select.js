/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 遍历数据，找到最小数据的索引，然后和初始位置交换，一直到结束
 */
function select(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let i;
    let j;
    let len = arr.length;
    let minIndex = 0;
    for (i = 0; i < len; i++) {
        minIndex = i;
        for (j = i; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return sign;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('select');
arr = select(arr);
console.timeEnd('select');
console.log(arr);
// 推导 n + (n-1) + (n-2) + ... + (n-n) = n2 - (1 + 2 + ... + n) = n2 - n(n+1)/2
// 时间复杂度 平均 o(n2) 最快 o(n2) 最慢 o(n2)
// 空间复杂度 o(1)
// 稳定性 不稳定