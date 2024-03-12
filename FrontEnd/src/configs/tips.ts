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
        longerPaysMore: "Current share rate (moves up by 0.03% every day up until 2800 cap.",
        biggerPaysMore:
            "This would be your number of shares in this stake without any Longer Pays More or Bigger Pays More bonuses.",
        effectiveShareRate:
            "The longer you stake for, the more shares you get. This bonus starts at 0% and goes all the way up to 350% more shares at day 2888, you can go up to day 3500 to keep your shares for longer (called share preservation).",
        effectiveShares:
            "The bigger your stake is, you get more shares. This goes up to 8% max at 100B TITAN X in 1 stake. This is linear - so if you stake 12.5B for example, it would be 1%.",
        increase:
            "Every day it becomes a little bit harder to get shares by staking. It increases by 0.03% every day, meaning that with every passing day, you need more TITAN X to create shares & get ETH payouts, general rule is: today is always better than tomorrow.",
    },
    payout: {},
} as const;

export default TIPS;
