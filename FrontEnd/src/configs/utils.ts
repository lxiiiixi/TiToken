import { PERCENT_BPS } from "./constants";

/**
 * short address
 * @param address
 * @returns
 */
export function shortAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * convert timestamp to date
 * @param timestampBigInt
 * @returns
 */
export function timestampToDate(timestampBigInt: bigint) {
    const timestamp = Number(timestampBigInt);
    const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回0-11
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
}

export function formatPrice(price: number | bigint | string, decimalPlaces: number = 2) {
    let formattedPrice = "";
    let decimalPart = "";

    if (typeof price === "string") {
        // 分割整数部分和小数部分
        const parts = price.split(".");
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (!parts[1]) return integerPart;
        let decimalPart = parts[1].substring(0, decimalPlaces);
        if (Number(parts[1].substring(decimalPlaces, decimalPlaces + 1)) >= 5) {
            const temp = Number(decimalPart) + 1;
            decimalPart = String(temp);
        }
        return integerPart + "." + decimalPart;
    }

    // 处理 bigint 类型
    if (typeof price === "bigint") {
        formattedPrice = price.toString();
    } else {
        // number 类型处理小数部分
        let decimalPlaces = 2;
        if (price < 1) {
            decimalPlaces = 4;
        }
        decimalPart = price.toFixed(decimalPlaces).split(".")[1];
        formattedPrice = parseInt(price.toFixed(decimalPlaces)).toString();
    }

    // 对整数部分进行格式化加入逗号
    formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (typeof price === "number" && decimalPart) {
        formattedPrice += "." + decimalPart;
    }

    return formattedPrice;
}

export function formatPercentage(value: number | bigint) {
    const numericValue = typeof value === "bigint" ? Number(value) : value;

    if (numericValue === 0) {
        return "0.00 %";
    }

    // 将值转换为基本的百分比形式
    const percentage = numericValue / (PERCENT_BPS * 100);

    return `${percentage.toFixed(2)} %`;
}
