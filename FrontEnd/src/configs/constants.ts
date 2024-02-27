import buyandburn from "@/abis/buyandburn.json";
import token from "@/abis/titanx.json";

export const TOKEN_PRICE = 1;
export const TOKEN_PRICE_PRECESION = 10000000000000000000000000;

export const SUPPORTED_CHAINS = [168587773];

export const BUYANDBURN_CONTRACT_CONFIG = {
    address: "0xD1Eb23B8a9AE7FE2426cf8093253fe17e4f604E8" as `0x${string}`,
    abi: buyandburn,
} as const;

export const TOKEN_CONTRACT_CONFIT = {
    address: "0xA44473bbff67036d16D2B907e07d6cD49D547EF5" as `0x${string}`,
    abi: token,
} as const;

// ===================== common ==========================================
export const SECONDS_IN_DAY = 86400;
export const SCALING_FACTOR_1e3 = 1e3;
export const SCALING_FACTOR_1e6 = 1e6;
export const SCALING_FACTOR_1e7 = 1e7;
export const SCALING_FACTOR_1e11 = 1e11;
export const SCALING_FACTOR_1e18 = 1e18;

//Cycle Variables
export const DAY8 = 8;
export const DAY28 = 28;
export const DAY90 = 90;
export const DAY369 = 369;
export const DAY888 = 888;
export const CYCLE_8_PERCENT = 28_00;
export const CYCLE_28_PERCENT = 28_00;
export const CYCLE_90_PERCENT = 18_00;
export const CYCLE_369_PERCENT = 18_00;
export const CYCLE_888_PERCENT = 8_00;
export const PERCENT_BPS = 100_00;

// ===================== mintInfo ==========================================
export const MAX_MINT_POWER_CAP = 100;
export const MAX_MINT_LENGTH = 280;
export const CLAIM_MINT_GRACE_PERIOD = 7;
export const MAX_BATCH_MINT_COUNT = 100;
export const MAX_MINT_PER_WALLET = 1000;
// export const MAX_BURN_AMP_BASE = 80 * 1e9 * 1 ether;
// export const MAX_BURN_AMP_PERCENT = 8 ether;
export const MINT_DAILY_REDUCTION = 11;
