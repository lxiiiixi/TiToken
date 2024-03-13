const TIPS = {
    mine: {},
    stake: {
        amount: "How much TITAN X you want to stake. Bigger pays more so instead of creating 10 individual stakes, do one big one and you get an amplifier.",
        length: "Number of days you want to stake for. In general: longer is always better because of the longer pays more bonus.",
        inStake: "Total TITAN X in Stake.",
        shares: "Total shares your stake will give you, including Longer Pays More & Bigger Pays More bonuses. Minimum 1 share is required per stake, you cannot create stakes that have less than 1 share.",
        currentShareRate: "Current share rate (moves up by 0.03% every day up until 2800 cap.",
        baseShares:
            "This would be your number of shares in this stake without any Longer Pays More or Bigger Pays More bonuses.",
        longerPaysMore:
            "The longer you stake for, the more shares you get. This bonus starts at 0% and goes all the way up to 350% more shares at day 2888, you can go up to day 3500 to keep your shares for longer (called share preservation).",
        biggerPaysMore:
            "The bigger your stake is, you get more shares. This goes up to 8% max at 100B TITAN X in 1 stake. This is linear - so if you stake 12.5B for example, it would be 1%.",
        effectiveShareRate:
            "This is your effective share rate including all bonuses. This is what will be used (estimated) to give you your shares in your stake.",
        effectiveShares:
            "This is the number of shares in your stake and includes the Bigger Pays More and Longer Pays More bonuses.",
        increase:
            "Every day it becomes a little bit harder to get shares by staking. It increases by 0.03% every day, meaning that with every passing day, you need more TITAN X to create shares & get ETH payouts, general rule is: today is always better than tomorrow.",
    },
    payout: {
        yourActiveShares:
            "Your active shares from your TITAN X stakes. Once you end a stake, the shares become inactive and are not counted. This determines your % rewards from the payouts.",
        ethClaimable:
            "your unclaimed amount of ETH from all payout cycles (excl. ETH you have already claimed)",
        globalCyclePayout:
            "Total ETH currently in this cycle payout waiting to be paid out to stakers of TITAN X.",
        yourEstPayout:
            "Your estimated payout when this cycle changes, this constantly changes based on the amount of ETH in the cycle & your % of total user shares. Keep an eye on this. You can get more by staking more TITAN X & staking more TITAN X for longer.",
        countDown:
            "Countdown until this payout cycle triggers & pays out all TITAN X stakers. These cycles are 'rolling', meaning that once the cycle has paid out, a next cycle starts. The payout cycles NEVER end, they are forever & will keep running forever.",
    },
    buynburn: {
        toBeDistribute:
            "ETH ready to be distributed to Buy & Burn, Payout Pools, and User Burn Pools",
        distributeUserReward:
            "Earn a % of total ETH for executing this function. TITAN X is decentralized, there is no company running these functions, users run these functions & are incentivised to do so.",
        balance:
            "62% of all ETH gets sent to the buy & burn pool. This will buy TITAN X on market from the WETH/TITANX pool and forever burn it out of existence. This provides on-market buy pressure pushing up the price & removes the bought supply off the market forever by burning it.",
        buynburnUserReward:
            "Earn a % of total ETH for executing this function. TITAN X is decentralized, there is no company running these functions, users run these functions & are incentivised to do so.",
    },
    burnPoolBonuses: {
        poolPayout:
            "ETH in this burn pool. This changes constantly as more miners get started, 3% of all ETH goes to this pool to be paid out to users burning TITAN X to participate in other projects built on top of TITAN X.",
        tokenBurnThisCycle: "The amount of TITAN X you've burned during this 28-day cycle.",
        estBonusThisCycle:
            "Your % of the ETH burn pool when it gets paid out (every 28 days, never stops), this is based on your % of TITAN X burned vs global # of TITAN X burned by all users in this 28-day period.",
        claimableETH:
            "Your claimable ETH from previous burn pool payout cycles. Once claimed, it gets sent to your wallet and removed from the smart contract.",
    },
    calculator: {
        mining: {},
        staking: {
            amount: "How much TITAN X you want to stake. Bigger pays more so instead of creating 10 individual stakes, do one big one and you get an amplifier.",
            length: "Number of days you want to stake for. In general: longer is always better bcause of the longer pays more bonus.",
            effectiveShareRate:
                "This is your effective share rate including all bonuses. This is what will be used (estimated) to give you your shares in your stake.",
            effectiveShares:
                "This is the number of shares in your stake and includes the Bigger Pays More and Longer Pays More bonuses.",
            globalActiveShares:
                "This is the number of shares in your stake and includes the Bigger Pays More and Longer Pays More bonuses.",
        },
    },
} as const;

export default TIPS;
