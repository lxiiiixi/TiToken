import {
    useGetCurrentEAABonus,
    useGetUserBurnAmplifierBonus,
    useGetCurrentMintableTitan,
    useGetCurrentMintCost,
    useGetCurrentMintPowerBonus,
} from "@/hooks/useReadTokenContract";
import { useETHPrice, useTokenPrice } from "@/hooks/useTokenPrice";
import { calculateMintCost, calculateMintReward, calculateROI } from "@/configs/calculate";
import { PERCENT_BPS } from "@/configs/constants";
import { parseEther } from "viem";

export type MinerInputData = {
    number: number;
    length: number;
    power: number;
};

export default function useMiningCalculator(miningData: MinerInputData) {
    const { currentMintPowerBonus } = useGetCurrentMintPowerBonus();
    const { currentEAABonus } = useGetCurrentEAABonus();
    const { currentMintableTitan } = useGetCurrentMintableTitan();
    const { userBurnAmplifierBonus } = useGetUserBurnAmplifierBonus();
    const { currentMintCost } = useGetCurrentMintCost();
    const ethUsdPrice = useETHPrice();
    const tokenPrice = useTokenPrice();

    let mintReward = calculateMintReward(
        miningData.power,
        miningData.length,
        currentMintableTitan,
        userBurnAmplifierBonus,
        currentEAABonus
    );

    const ethCost = calculateMintCost(
        currentMintCost,
        miningData.power,
        miningData.number ? miningData.number : 1
    );

    if (miningData.number) mintReward = mintReward * BigInt(miningData.number);

    const mintRewardWithBonus =
        mintReward + (mintReward * currentEAABonus) / BigInt(PERCENT_BPS) / 10000n;
    const ethUsdValue = (ethCost * parseEther(ethUsdPrice.toString())) / BigInt(1e18);
    const marketValue = tokenPrice ? (tokenPrice * mintReward) / BigInt(1e18) : 0n;
    const roi = calculateROI(marketValue, ethUsdValue);

    return {
        currentMintableTitan,
        currentMintPowerBonus,
        userBurnAmplifierBonus,
        currentEAABonus,
        ethUsdPrice,
        tokenPrice,
        mintReward,
        ethCost,
        mintRewardWithBonus,
        ethUsdValue,
        marketValue,
        roi,
    };
}
