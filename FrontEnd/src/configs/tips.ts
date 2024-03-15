const TIPS = {
    mine: {
        pageHeadingTips:
            "You mine TITAN X with ETH + Time, the longer your Miner Length, the more TITAN X you get at a lower cost. Longer is better, more power is better. A 'max' miner is 100 power & 280 length.",
        singleMinerLength:
            "Number of days you want your miner to run for before becoming claimable. This determines how much TITAN X you're getting, in general: longer is better, always.",
        singleMinerPower:
            "The power you want your miner to have, from 1 to 100. this determines the ETH cost for this miner. Cost per titan stays the same, 1 power is just cheaper than 100, can also do 28, 53, etc... any number between and up to 1 and 100. general rule: higher is always better. Also easier to manage.",
        batchMinerLength: "Length (in number of days) you want all the miners to have.",
        batchMinerPower:
            "The power you want yours miner to have, from 1 to 100. this determines the ETH cost for all miners made. Cost per titan stays the same, 1 power is just cheaper than 100, can also do 28, 53, etc... any number between and up to 1 and 100. general rule: higher is always better. Also easier to manage.",
        batchMinerNumber:
            "The number of miners you want to create in one batch transaction, this determines how many miners you want to create in 1 transaction, saving gas. This does not create a big miner, this creates x number of single miners.",
        estEndOfMiner:
            "Estimated TITAN X to be given at the end of your miner(s). Includes EAA bonuses (if any) + Burn Bonus Amplifiers.",
        ethToStartMiner: "ETH cost to start miner(s)",
        marketValue:
            "Total # of TITAN X * Current Market Price. this number will change with time as the TITAN X price goes up or down on the market, this is NOT set in stone, just a projected estimation if all stays the same as now. Which it will not. Price can go up or it can go down.",
        roi: "Total Cost vs Total $ Value at end of mint, the ROI displayed here is not a guarantee or a promise, this depends on the market price of TITAN X at the end of your mint. You should not have any expectation of profit, none of this is a guarantee. By mining you're just very heavily increase your odds of winning.",
        marketPrice: "Current market price of TITAN X in WETH/TITANX Uniswap v3 pool.",
        globalTRank: "",
        currentTokenPerDay: "",
        eaa: "First 350 days of TITAN X, you get an early adoption amplifier on the # of TITAN X tokens you can mine, this works its way down to 0% on day 350.",
        burnAmp:
            "When you burn TITAN X to participate in other protocols, it gets recorded in the smart contract. Based on your # of total TITAN X token burns, you get an amplifier on the amount of TITAN X you get per miner, up to 8%. The 8% max is hit when you've burned 80B TITAN X tokens.",
        nextIncrease:
            "Every day it becomes a little bit harder to mine TITAN X, you get a little bit less & pay a little bit more. This creates scarcity & is more aggressive than a Bitcoin halving, and happens every day. Read 'The Daily Update' in the docs for more info. general rule is: today is always better than tomorrow.",
    },
    stake: {
        pageHeadingTips:
            "28% of all ETH spent on creating mints gets given to TITAN X stakers in the form of 'Payout Cycles'. When you create a stake, your stake has shares attached to it. Longer gets you more shares, Bigger gets you more shares. Your % of shares compared to all users shares determines the % of all payouts you get.",
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
        pageHeadingTips:
            "You get shares by staking your titan. See details on the stakes page of the dApp.",
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
        pageHeadingTips:
            "Decentralized functions for distributing to staker payout pools + buy and burning. TITAN X is not a company or an organisation. It's code that lives on the blockchain and is completely community owned. The community runs the functions, the community has the power & gets all the rewards for doing so. No middle-men.",
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
        pageHeadingTips:
            "When you burn TITAN X to participate in other projects, you become part of the 28-day rolling burn pool. Based on what % of TITAN X you burn compared to all other burners (in same 28-day rolling period), you get that % of the total ETH burn pool payout. Example: if you burn 1B TITAN X and the total burn for the 28-day period is 100B, you get 1% of the total payout. This pays out & resets every 28 days.",
        poolPayout:
            "ETH in this burn pool. This changes constantly as more miners get started, 3% of all ETH goes to this pool to be paid out to users burning TITAN X to participate in other projects built on top of TITAN X.",
        tokenBurnThisCycle: "The amount of TITAN X you've burned during this 28-day cycle.",
        estBonusThisCycle:
            "Your % of the ETH burn pool when it gets paid out (every 28 days, never stops), this is based on your % of TITAN X burned vs global # of TITAN X burned by all users in this 28-day period.",
        claimableETH:
            "Your claimable ETH from previous burn pool payout cycles. Once claimed, it gets sent to your wallet and removed from the smart contract.",
    },
    stats: {
        pageHeadingTips: "",
    },
    calculator: {
        mining: {
            estTokenAtEnd:
                "Estimated TITAN X to be given at the end of your miner(s). Includes EAA bonuses (if any) + Burn Bonus Amplifiers.",
            ethToStart: "ETH cost to start miner(s)",
            marketValue:
                "Total # of TITAN X * Current Market Price. this number will change with time as the TITAN X price goes up or down on the market, this is NOT set in stone, just a projected estimation if all stays the same as now. Which it will not. Price can go up or it can go down.",
        },
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
