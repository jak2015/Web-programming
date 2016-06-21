var exports = module.exports = {};

exports.shallowClone = function(tempObj) {
    var copyObj = {};
    for(var i in tempObj) {
        if(tempObj.hasOwnProperty(i)) {
            copyObj[i] = tempObj[i];
        }
    }
    return copyObj;
}

exports.deepClone = function(tempObj) {
    var copyObj = tempObj;
    if (tempObj && typeof tempObj === 'object') {
        copyObj = Object.prototype.toString.call(tempObj) === "[object Array]" ? [] : {};
        for (var i in tempObj) {
            copyObj[i] = exports.deepClone(tempObj[i]);
        }
    }
    return copyObj;
}




