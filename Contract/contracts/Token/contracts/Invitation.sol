// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "./OwnerInfo.sol";
import "../interfaces/IInvitation.sol";

contract Invitation is IInvitation,OwnerInfo {
    // address private owner;
    address private tokenAddress;
    mapping(address => address) private user_inviter;
    mapping(address => uint8) private inviter_bonus_percent;
    
    event InviterSet(address indexed _user, address indexed _inviter);
    event InviterBonusPercentSet(address indexed _inviter, uint8 _percent);

    modifier onlyToken() {
        require(msg.sender == tokenAddress, "Only token contract");
        _;
    }

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }

    function setUserInviter(address _user, address _inviter) public onlyToken {
        require(getUserInviter(_user) == address(0), "User already has an inviter");
        require(_inviter != address(0), "Inviter address cannot be 0");
        require(_user != _inviter, "User cannot invite themselves");
        user_inviter[_user] = _inviter;

        // if(inviter_bonus_percent[_inviter] == 0){
        //     inviter_bonus_percent[_inviter] = 2;
        // }

        emit InviterSet(_user, _inviter);
    }

    function setInviterBonusPercent(address _inviter, uint8 _percent) public onlyToken {
        require(_percent == 2 || _percent == 5, "Percent must be 2 or 5");
        inviter_bonus_percent[_inviter] = _percent;

        emit InviterBonusPercentSet( _inviter, _percent);
    }

    function assignInviter(address user, address firstInviter) public onlyToken returns(address){
        address inviter = user_inviter[user];
        if (inviter == address(0) && firstInviter != address(0)) {
            // 如果此时调用的时候传入了邀请者，并且这个用户之前没有过邀请者，就设置记录新的邀请者
            setUserInviter(user, firstInviter);
            inviter = firstInviter;
        }
        return inviter;
    }   

     function getUserInviter(address _user) public view returns (address) {
        return user_inviter[_user];
    }

    function getInviterBonusPercent(address _inviter) public view returns (uint8) {
        return inviter_bonus_percent[_inviter];
    }
}