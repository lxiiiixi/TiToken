// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract TitanXErrors {
// TitanX
error TitanX_InvalidAmount();
error TitanX_InsufficientBalance();
error TitanX_NotSupportedContract();
error TitanX_InsufficientProtocolFees();
error TitanX_FailedToSendAmount();
error TitanX_NotAllowed();
error TitanX_NoCycleRewardToClaim();
error TitanX_NoSharesExist();
error TitanX_EmptyUndistributeFees();
error TitanX_InvalidBurnRewardPercent();
error TitanX_InvalidBatchCount();
error TitanX_InvalidMintLadderInterval();
error TitanX_InvalidMintLadderRange();
error TitanX_MaxedWalletMints();
error TitanX_LPTokensHasMinted();
error TitanX_InvalidAddress();
error TitanX_InsufficientBurnAllowance();
// MintInfo
error TitanX_InvalidMintLength();
error TitanX_InvalidMintPower();
error TitanX_NoMintExists();
error TitanX_MintHasClaimed();
error TitanX_MintNotMature();
error TitanX_MintHasBurned();

// StakeInfo
error TitanX_InvalidStakeLength();
error TitanX_RequireOneMinimumShare();
error TitanX_ExceedMaxAmountPerStake();
error TitanX_NoStakeExists();
error TitanX_StakeHasEnded();
error TitanX_StakeNotMatured();
error TitanX_StakeHasBurned();
error TitanX_MaxedWalletStakes();
}
