
const calculateMintCost = (mintCost, power, number = 1) => {
    const MAX_MINT_POWER_CAP = 100;
    if (!mintCost) return BigInt(0);
    return (BigInt(mintCost) * BigInt(power) * BigInt(number)) / BigInt(MAX_MINT_POWER_CAP);
};

const calculateMintReward = (
    mintPower,
    numOfDays,
    mintableTitan,
    EAABonus,
    burnAmpBonus
) => {
    const MINT_DAILY_REDUCTION = 11;
    const SCALING_FACTOR_1e6 = 1e6
    const SCALING_FACTOR_1e18 = 1e18;
    const MAX_MINT_POWER_CAP = 100
    const PERCENT_BPS = 100_00;
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

const calculateShareBonus = (amount, noOfDays) => {
    const LPB_MAX_DAYS = 2888;
    const LPB_PER_PERCENT = 825;
    const BPB_MAX_TITAN = 100 * 1e9 * 1e18; //100 billion
    const BPB_PER_PERCENT = 1_250_000_000_000 * 1e18;

    const cappedExtraDays = noOfDays <= BigInt(LPB_MAX_DAYS) ? noOfDays : BigInt(LPB_MAX_DAYS);
    const cappedStakedTitan = amount <= BigInt(BPB_MAX_TITAN) ? amount : BigInt(BPB_MAX_TITAN);
    const shareBonus =
        (cappedExtraDays * BigInt(1e11)) / BigInt(LPB_PER_PERCENT) +
        (cappedStakedTitan * BigInt(1e11)) / BigInt(BPB_PER_PERCENT);
    return shareBonus;
};

const calculateShares = (amount, noOfDays, shareRate) => {
    let shares = amount;
    shares += (shares * calculateShareBonus(amount, noOfDays)) / BigInt(1e11);
    shares /= shareRate / BigInt(1e18);
    return shares;
};


module.exports = {
    calculateMintCost,
    calculateMintReward,
    calculateShares
}