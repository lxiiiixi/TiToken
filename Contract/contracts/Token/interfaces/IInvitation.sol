// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface IInvitation {
    function setUserInviter(address _user, address _inviter) external;
    function setInviterBonusPercent(address _inviter, uint8 _percent) external;
    function getUserInviter(address _user) external view returns (address);
    function getInviterBonusPercent(address _inviter) external view returns (uint8);
    function assignInviter(address user, address firstInviter) external returns(address);
}
