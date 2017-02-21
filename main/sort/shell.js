/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 按照同步长进行排序，然后按一定规则缩小步长再排序，直到最后步长为1，排序完成
 */
function shell(arr = [11, 16, 2, 5, 44, 12, 56, 43, 7]) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let len = arr.length;
    for (let fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
        for (let i = fraction; i < len; i++) {
            for (let j = i - fraction; j >= 0 && arr[j] > arr[fraction + j]; j -= fraction) {
                [arr[j], arr[fraction + j]] = [arr[fraction + j], arr[j]];
            }
            console.log(arr)
        }
    }
    return arr;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('shell');
arr = shell(arr);
console.timeEnd('shell');
console.log(arr);
// 推导 
// 时间复杂度 平均 O(n log n) 最快 O(n log 2 n) 最慢 O(n log 2 n)
// 空间复杂度 O(1)
// 稳定性 不稳定