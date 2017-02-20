/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 利用递归，先把数组无限的划分为两份，然后按大小顺序组合成一个新数组
 */
function merge(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    console.log(left, right)
    return sort(merge(left), merge(right));
}

function sort(lv, rv) {
    let result = [];
    while (lv.length && rv.length) {
        if (lv[0] < rv[0]) {
            result.push(lv.shift());
        } else {
            result.push(rv.shift());
        }
    }
    while (lv.length) {
        result.push(lv.shift());
    }
    while (rv.length) {
        result.push(rv.shift());
    }
    return result;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('merge');
arr = merge(arr);
console.timeEnd('merge');
console.log(arr);
// 推导 n/2 + n/4 + ... + n/n = n(1/2 + 1/4 + ... + 1/n) = n log n
// 时间复杂度 平均o(n log n) 最快 o(n log n) 最慢 o(n log n)
// 空间复杂度 o(n)
// 稳定性 稳定