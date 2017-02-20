/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 根据数组key唯一，然后写入key，最终获取这些key
 */
function count(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let i;
    let j;
    let index = 0;
    let arrLen = arr.length;
    let result = [];
    for (i = 0; i < arrLen; i++) {
        if (!result[arr[i]]) {
            result[arr[i]] = 0;
        }
        result[arr[i]]++;
    }
    let resLen = result.length;
    for (j = 0; j < resLen; j++) {
        while (result[j] && result[j] > 0) {
            arr[index++] = j;
            result[j]--;
        }
    }
    return sign;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('count');
arr = count(arr);
console.timeEnd('count');
console.log(arr);
// 推导 n + k
// 时间复杂度 平均 o(n+k) 最快 o(n+k) 最慢 o(n+k)
// 空间复杂度 o(k)
// 稳定性 稳定