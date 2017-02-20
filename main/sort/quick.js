/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 取一个中间位置，把数组分成两份，大的在一边，小的在一边，然后利用递归去完成排序
 */
function quick(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let left = [];
    let right = [];
    let middle = Math.floor(arr.length / 2);
    let middleVal = arr.splice(middle, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < middleVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quick(left).concat([middleVal], quick(right));
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('quick');
arr = quick(arr);
console.timeEnd('quick');
console.log(arr);
// 推导 n + n/2 + n/4 + ... + n/n = n log n
// 时间复杂度 平均o(n log n) 最快 o(n log n) 最慢 o(n2)
// 空间复杂度 o(log n)
// 稳定性 不稳定