//不支持+/-符号



//数字转货币格式，并保留5位小数
function toCurrency5(money) {
    money = money.toString();
    if (/[^0-9\.]/.test(money)){
        return '0.00000';
    }

    money = money.replace(/^(\d*)$/, "$1.");
    money = (money + "00000").replace(/(\d*\.\d\d\d\d\d)\d*/, "$1");
    money = money.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(money)) {
        money = money.replace(re, "$1,$2");
    }
    money = money.replace(/,(\d\d\d\d\d)$/, ".$1");

    return '' + money.replace(/^\./, "0.");
}

//数字转货币格式，并保留2位小数
function toCurrency2(money) {
    money = money.toString();
    if (/[^0-9\.]/.test(money)){
        return '0.00';
    }

    money = money.replace(/^(\d*)$/, "$1.");
    money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    money = money.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(money)) {
        money = money.replace(re, "$1,$2");
    }
    money = money.replace(/,(\d\d)$/, ".$1");

    return '' + money.replace(/^\./, "0.");
}


module.exports = {toCurrency5,toCurrency2};