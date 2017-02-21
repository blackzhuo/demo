/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 生成m个桶，按照一定规则把固定范围的数字，放在对应的桶中，然后对每个桶排序(可以选择一种算法),然后把桶内的数据合并成结果返回
 */
// 这里是用插入排序
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

function bucket(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    let min = arr[0];
    let max = arr[0];
    let bucketSize = 5;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        } else if (arr[i] > max)  {
            max = arr[i]
        }
    }
    let buckets = [];
    let bucketCount = Math.ceil((max - min) / bucketSize);
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }
    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
    }
    arr.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        insert(buckets[i]);
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }
    return arr;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('bucket');
arr = bucket(arr);
console.timeEnd('bucket');
console.log(arr);
// 推导 
// 时间复杂度 平均 O(n+k) 最快 O(n+k) 最慢 O(n2)
// 空间复杂度 O(n+k)
// 稳定性 稳定