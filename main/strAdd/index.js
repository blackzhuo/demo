let addStr = function(a, b) {
    if (!a && !b) return '';
    if (!a) return b;
    if (!b) return a;
    // 小数
    let ditaa = a.split('.')[1] ? a.split('.')[1].split('') : [0];
    let ditbb = b.split('.')[1] ? b.split('.')[1].split('') : [0];
    let ditml = ditaa.length > ditbb.length ? ditaa.length : ditbb.length;
    let ditmid = Array(ditml).fill(0);
    ditaa.length = ditml;
    ditbb.length = ditml;
    ditaa.reverse();
    ditbb.reverse();
    for (let i = 0; i < ditml; i++) {
        ditmid[i + 1] = parseInt((parseInt(ditmid[i] || 0) + parseInt(ditaa[i] || 0) + parseInt(ditbb[i] || 0)) / 10, 10);
        ditmid[i] = (parseInt(ditmid[i] || 0) + parseInt(ditaa[i] || 0) + parseInt(ditbb[i] || 0)) % 10;
    }
    let carry = ditmid.reverse()[0];
    let ditresult = ditmid.slice(1);
    // 整数
    let aa = a.split('.')[0].split('');
    let bb = b.split('.')[0].split('');
    let ml = aa.length > bb.length ? aa.length : bb.length;
    let mid = Array(ml).fill(0);
    mid[0] = carry;
    aa.reverse().length = ml;
    bb.reverse().length = ml;
    for (let i = 0; i < ml; i++) {
        mid[i + 1] = parseInt((parseInt(mid[i] || 0) + parseInt(aa[i] || 0) + parseInt(bb[i] || 0)) / 10, 10);
        mid[i] = (parseInt(mid[i] || 0) + parseInt(aa[i] || 0) + parseInt(bb[i] || 0)) % 10;
    }
    let result = parseInt(mid.reverse()[0], 10) === 0 ? mid.slice(1) : mid;
    if (ditresult && ditresult.length === 1 && ditresult[0] === 0) {
        return result.join('');
    }
    return result.concat('.', ditresult).join('')
}
addStr('8697968685869855884948586686.9', '888.876');
addStr('8697968685869855884948586686', '888');