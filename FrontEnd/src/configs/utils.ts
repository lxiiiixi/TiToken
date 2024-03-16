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

    return `${month}/${day}/${year}`;
}

export function formatPrice(price: number | bigint | string, decimalPlaces: number = 2) {
    let formattedPrice = "";
    let decimalPart = "";

    if (typeof price === "string") {
        const roundedPrice = Number(price).toFixed(decimalPlaces);
        const parts = roundedPrice.split(".");
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const decimalPart = parts[1] ? "." + parts[1] : "";
        return integerPart + decimalPart;
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

/**
 * 将数字转换为百分比形式字符串。
 * @param {number} value 要转换的数字。
 * @param {number} decimalPlaces 保留的小数位数，默认为2。
 * @return {string} 转换后的百分比形式字符串。
 */
export function formatPercentage(
    value: number | bigint,
    needDivBps: boolean = true,
    decimalPlaces: number = 2
): string {
    const numericValue = typeof value === "bigint" ? Number(value) : value;
    const percentage = numericValue * 100;
    if (needDivBps) {
        return `${(percentage / PERCENT_BPS).toFixed(decimalPlaces)}%`;
    }
    return `${percentage.toFixed(decimalPlaces)}%`;
}

/**
 * 计算当前时间相对于开始和结束时间的进度。
 * @param {number} mintStartTs 开始时间戳（秒级）。
 * @param {number} maturityTs 结束时间戳（秒级）。
 * @return {number} 当前进度，范围从0（未开始）到1（已结束），超出范围时按边界处理。
 */
export function calculateProgress(mintStartTs: number, maturityTs: number) {
    const nowTs = Date.now() / 1000;
    const totalDuration = maturityTs - mintStartTs;
    const elapsedSinceStart = nowTs - mintStartTs;
    let progress = elapsedSinceStart / totalDuration;
    progress = Math.max(0, Math.min(1, progress));
    return Math.floor(progress * 100) / 100; // progress.toFixed(2);
}
