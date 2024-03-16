export interface UserMint {
    mId: bigint;
    tRank: bigint;
    gMintPower: bigint;
    mintInfo: UserMintInfo;
}

export enum MintStatus {
    ACTIVE,
    CLAIMED,
    BURNED,
}

export interface UserMintInfo {
    mintPower: number;
    numOfDays: number;
    mintableTitan: bigint;
    mintStartTs: bigint;
    maturityTs: bigint;
    mintPowerBonus: number;
    EAABonus: number;
    mintedTitan: bigint;
    mintCost: bigint;
    status: MintStatus;
}

// ——————————————————————————————————————
export interface UserStake {
    globalStakeId: bigint;
    sId: bigint;
    stakeInfo: UserStakeInfo;
}

export enum StakeStatus {
    ACTIVE,
    ENDED,
    BURNED,
}
export interface UserStakeInfo {
    titanAmount: bigint;
    shares: bigint;
    numOfDays: number;
    stakeStartTs: number;
    maturityTs: number;
    status: StakeStatus;
}
