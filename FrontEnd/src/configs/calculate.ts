import {
    MAX_MINT_POWER_CAP,
    MINT_DAILY_REDUCTION,
    PERCENT_BPS,
    SCALING_FACTOR_1e6,
    SCALING_FACTOR_1e18,
} from "@/configs/constants";

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

/**
 * the formula to calculate mint reward at create new mint
 * @param mintPower 铸币算力
 * @param numOfDays 铸币天数
 * @param mintableTitan 可铸造的 Titan 数量
 * @param EAABonus 早期采纳者奖励
 * @param burnAmpBonus 燃烧放大奖励
 * @returns
 */
export const calculateMintReward = (
    mintPower: number,
    numOfDays: number,
    mintableTitan: number | bigint,
    EAABonus: number | bigint,
    burnAmpBonus: number | bigint
) => {
    let baseReward = BigInt(mintableTitan) * BigInt(mintPower) * BigInt(numOfDays);

    if (numOfDays !== 1) {
        baseReward -=
            (baseReward * BigInt(MINT_DAILY_REDUCTION) * (BigInt(numOfDays) - BigInt(1))) /
            BigInt(PERCENT_BPS);
    }

    let reward = baseReward;
    if (EAABonus !== 0) {
        reward += (baseReward * BigInt(EAABonus)) / BigInt(100) / BigInt(SCALING_FACTOR_1e6);
    }

    if (burnAmpBonus !== 0) {
        reward += (baseReward * BigInt(burnAmpBonus)) / BigInt(100) / BigInt(SCALING_FACTOR_1e18);
    }

    reward /= BigInt(MAX_MINT_POWER_CAP);

    return reward;
};

/**
 * calculate ROI
 * @param marketValue 矿工结束时的 TITAN X 市场价值
 * @param minterCostValue 启动挖矿时需要的成本
 * @returns
 */
export const calculateROI = (marketValue: number, minterCostValue: number) => {
    // （矿工结束时的 TITAN X 市场价值 - 挖矿成本）/ 挖矿成本 × 100%
    return (marketValue - minterCostValue) / minterCostValue;
};
