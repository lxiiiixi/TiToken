import { MAX_MINT_POWER_CAP } from "@/configs/constants";

/**
 * calculate mint cost
 * @param mintCost 当前的 mint cost（通过读取合约中的 getCurrentMintCost 函数）
 * @param power 算力
 * @param number 批量创建的矿工个数
 * @returns
 */
export const calculateMintCost = (mintCost: number | bigint, power: number, number: number = 1) => {
    // getBatchMintCost in contract
    // (mintCost * mintPower * count) / MAX_MINT_POWER_CAP

    if (!mintCost) return BigInt(0);

    return (BigInt(mintCost) * BigInt(power) * BigInt(number)) / BigInt(MAX_MINT_POWER_CAP);
};
