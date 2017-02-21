/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 先基于个位数字，一样的进桶，然后按顺序取出，再按照十位数字，一样的进桶，然后按顺序取出，以此类推
 */
let counter = [];

function radix(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let mod = 10;
    let dev = 1;
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    let maxDigit = max.toString().length;
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (let j = 0; j < arr.length; j++) {
            let bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        let pos = 0;
        for (let j = 0; j < counter.length; j++) {
            let value = null;
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('radix');
arr = radix(arr);
console.timeEnd('radix');
console.log(arr);
// 推导 
// 时间复杂度 平均 O(n X k) 最快 O(n+k) 最慢 O(n+k)
// 空间复杂度 O(n+k)
// 稳定性 稳定