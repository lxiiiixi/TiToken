// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Invitation {
    mapping(address => address) private invite_code;
    mapping(address => address) private invite_user;

    function getInviteUserAndBonusPercent(address _user) public view returns (address user, uint256 bonus) {
        user = invite_user[_user];
        if(true){
            bonus = 2;
        }else{
            bonus = 5;
        }
    }

    function getInviteCode(address _user) public view returns (address) {
        return invite_code[_user];
    }
}