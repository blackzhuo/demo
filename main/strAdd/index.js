// 没有考虑小数的情况,可以把整数部分和小数部分分开计算，小数在后面补0
// '8697968685869855884948586686' + '8697968685869855884948586686' = 'xxx';
// 考虑字符串转成数字后会超出最大限
let addStr = function(a, b) {
    let aa = a.split('.')[0];
    let bb = b.split('');
    ml = aa.length > bb.length ? aa.length : bb.length;
    let mid = Array(ml).fill(0);
    aa.reverse().length = ml;
    bb.reverse().length = ml;
    for (let i = 0; i < ml; i++) {
        mid[i + 1] = parseInt((parseInt(mid[i] || 0) + parseInt(aa[i] || 0) + parseInt(bb[i] || 0)) / 10, 10);
        mid[i] = (parseInt(mid[i] || 0) + parseInt(aa[i] || 0) + parseInt(bb[i] || 0)) % 10;
    }
    let result = parseInt(mid.reverse()[0], 10) === 0 ? mid.slice(1) : mid;
    return result.join('')
}
addStr('8697968685869855884948586686', '888');