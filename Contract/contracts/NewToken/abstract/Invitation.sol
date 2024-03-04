// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "../interfaces/IInvitation.sol";

abstract contract Invitation {
    mapping(address => address) private user_inviter;
    mapping(address => uint8) private inviter_bonus_percent;
    
    event InviterSet(address indexed _user, address indexed _inviter);
    event InviterBonusPercentSet(address indexed _inviter, uint8 _percent);

    function setUserInviter(address _user, address _inviter) private {
        require(getUserInviter(_user) == address(0), "User already has an inviter");
        require(_inviter != address(0), "Inviter address cannot be 0");
        require(_user != _inviter, "Inviting yourself is not allowed");
        user_inviter[_user] = _inviter;

        emit InviterSet(_user, _inviter);
    }

    function setInviterBonusPercent(address _inviter, uint8 _percent) internal {
        require(_percent == 2 || _percent == 5, "Percent must be 2 or 5");
        inviter_bonus_percent[_inviter] = _percent;

        emit InviterBonusPercentSet( _inviter, _percent);
    }

    function assignInviter(address user, address firstInviter) internal returns(address){
        address inviter = user_inviter[user];
        if (inviter == address(0) && firstInviter != address(0)) {
            setUserInviter(user, firstInviter);
            if(getInviterBonusPercent(firstInviter) == 0){
                setInviterBonusPercent(firstInviter, 2);
            }
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
