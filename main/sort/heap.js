/*
 * arr 待排序数组
 * result 返回顺序的数组
 * 先构建大根堆，保证父节点都比子节点大，然后交换最后元素和根顶元素，然后把最后的元素排除掉，再构建大根堆，直到最后所有元素都排出掉，排除的元素是有序的
 */
let len;

function buildMaxHeap(arr) {
    len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    console.log(largest, left, right)
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, largest);
    }
}

function heap(arr) {
    if (!arr || !arr.length || arr.length === 1) {
        return arr;
    }
    buildMaxHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        len--;
        heapify(arr, 0);
    }
    return arr;
}
let arr = [11, 16, 2, 5, 44, 12, 56, 43, 7];
console.time('heap');
arr = heap(arr);
console.timeEnd('heap');
console.log(arr);
// 推导 
// 时间复杂度 平均 O(n log n) 最快 O(n log n) 最慢 O(n log n)
// 空间复杂度 O(1)
// 稳定性 不稳定