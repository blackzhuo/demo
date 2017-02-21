/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 把数组中每个数据插入到合适的位置，即在前后两个数范围之间
 */
function insert(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let i;
    let preIndex;
    let current;
    let len = arr.length;
    for (i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('insert');
arr = insert(arr);
console.timeEnd('insert');
console.log(arr);
// 推导 1 + 2 + ... + n = n(n+1)/2 = 0.5n2 + 0.5n
// 时间复杂度 平均 o(n2) 最快 o(n) 最慢 o(n2)
// 空间复杂度 o(1)
// 稳定性 稳定