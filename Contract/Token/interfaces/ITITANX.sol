// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface ITITANX {
    // —————— event ——————
    event ProtocolFeeRecevied(address indexed user, uint256 indexed day, uint256 indexed amount);
    event ETHDistributed(address indexed caller, uint256 indexed amount);
    event CyclePayoutTriggered(
        address indexed caller,
        uint256 indexed cycleNo,
        uint256 indexed reward,
        uint256 burnReward
    );
    event RewardClaimed(address indexed user, uint256 indexed reward);
    event ApproveBurnStakes(address indexed user, address indexed project, uint256 indexed amount);
    event ApproveBurnMints(address indexed user, address indexed project, uint256 indexed amount);

    // —————— Erc20 function ——————
    // function balanceOf(address account) external returns (uint256);
    // function getBalance() external view returns (uint256);
    function mintLPTokens() external;
    function burnLPTokens() external;
}
