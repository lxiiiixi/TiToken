import {
    MAX_MINT_POWER_CAP,
    MINT_DAILY_REDUCTION,
    PERCENT_BPS,
    SCALING_FACTOR_1e6,
    SCALING_FACTOR_1e18,
    LPB_MAX_DAYS,
    BPB_MAX_TITAN,
    SCALING_FACTOR_1e11,
    LPB_PER_PERCENT,
    BPB_PER_PERCENT,
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
export const calculateROI = (marketValue: bigint, minterCostValue: bigint) => {
    // if (marketValue - minterCostValue < 0)
    //     return -((minterCostValue - marketValue) / minterCostValue);
    // （矿工结束时的 TITAN X 市场价值 - 挖矿成本）/ 挖矿成本 × 100%
    if (minterCostValue === 0n) return 0n;
    if (marketValue > minterCostValue)
        return ((marketValue - minterCostValue) * 10000n) / minterCostValue;
    return -((minterCostValue - marketValue) * 10000n) / minterCostValue;
};

/** @notice calculate share bonus
 * @param amount titan amount
 * @param noOfDays stake length
 * @return shareBonus calculated shares bonus in 11 decimals
 */
export const calculateLongerPaysMoreBonus = (noOfDays: bigint): bigint => {
    const cappedExtraDays = noOfDays <= BigInt(LPB_MAX_DAYS) ? noOfDays : BigInt(LPB_MAX_DAYS);
    return (cappedExtraDays * BigInt(SCALING_FACTOR_1e11)) / BigInt(LPB_PER_PERCENT);
};

export const calculateBiggerPaysMoreBonus = (amount: bigint): bigint => {
    const cappedStakedTitan = amount <= BigInt(BPB_MAX_TITAN) ? amount : BigInt(BPB_MAX_TITAN);
    return (cappedStakedTitan * BigInt(SCALING_FACTOR_1e11)) / BigInt(BPB_PER_PERCENT);
};

export const calculateShareBonus = (amount: bigint, noOfDays: bigint): bigint => {
    // const cappedExtraDays = noOfDays <= BigInt(LPB_MAX_DAYS) ? noOfDays : BigInt(LPB_MAX_DAYS);
    // const cappedStakedTitan = amount <= BigInt(BPB_MAX_TITAN) ? amount : BigInt(BPB_MAX_TITAN);
    // const shareBonus =
    //     (cappedExtraDays * BigInt(SCALING_FACTOR_1e11)) / BigInt(LPB_PER_PERCENT) +
    //     (cappedStakedTitan * BigInt(SCALING_FACTOR_1e11)) / BigInt(BPB_PER_PERCENT);
    // return shareBonus;
    return calculateLongerPaysMoreBonus(noOfDays) + calculateBiggerPaysMoreBonus(amount);
};

/**
 * calculate shares
 * @param amount
 * @param noOfDays
 * @param shareRate
 * @returns
 */
export const calculateShares = (amount: bigint, noOfDays: bigint, shareRate: bigint): bigint => {
    let shares = amount;
    shares += (shares * calculateShareBonus(amount, noOfDays)) / BigInt(SCALING_FACTOR_1e11);
    shares /= shareRate / BigInt(SCALING_FACTOR_1e18);
    return shares;
};

export const calculateUserPayoutByShares = (
    userCurrentActiveShares: bigint,
    globalActiveShares: bigint,
    ethPayoutAmount: bigint
) => {
    // const radio = (userCurrentActiveShares * BigInt(SCALING_FACTOR_1e18)) / globalActiveShares;
    // return (ethPayoutAmount * radio) / BigInt(SCALING_FACTOR_1e18);

    return (userCurrentActiveShares * ethPayoutAmount) / globalActiveShares;
};
