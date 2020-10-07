



//数字格式化，会返回带逗号的数字格式。
//number:   number 要格式化的数字
//digits:   number 小数位数

module.exports = function(number,digits,use0){
    digits = (digits || digits==0)? digits : 2;  //小数位数
    if(!use0){
        number = number??0;
    }

    if(!number){
        return number;
    }

    let option = {
//          “ decimal”用于纯数字格式。
//          “ currency”用于货币格式。        数字前面会显示货币符号
//          “ percent”用于百分比格式化
//          “ unit”用于单位格式化
        style: 'decimal',
        //货币格式中使用的货币。
        currency: 'CNY',
        //小数位数
        minimumFractionDigits:digits,
        maximumFractionDigits:digits
    };

    return new Intl.NumberFormat('zh',option).format(number);
}