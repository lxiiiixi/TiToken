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
