// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract TitanXErrors {
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
}
