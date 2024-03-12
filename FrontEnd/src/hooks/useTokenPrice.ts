import { useReadContract } from "wagmi";
import unipoolv3 from "@/abis/unipoolv3.json";
import { useQuery } from "@tanstack/react-query";
import { formatEther, parseEther } from "viem";

export function useETHPrice() {
    const fetchData = async () => {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&precision=18"
        );
        return response.json();
    };

    const { data, isSuccess } = useQuery({ queryKey: ["eth"], queryFn: fetchData });

    return isSuccess && data && data.ethereum ? parseFloat(data.ethereum.usd) : 0;
}

export function useTokenPrice() {
    const { data: slot0Data }: { data: { [key: number]: bigint } | undefined } = useReadContract({
        address: "0xc45a81bc23a64ea556ab4cdf08a86b61cdceea8b",
        abi: unipoolv3,
        functionName: "slot0",
    });

    const ethUsdPrice = useETHPrice();

    if (!slot0Data || !ethUsdPrice) return;

    const sqrtPriceX96 = slot0Data[0];
    const priceRatio = sqrtPriceX96 ** 2n / 2n ** 192n; // P = (sqrtPriceX96 / 2^96) ** 2

    const ethUsdPriceBigint = parseEther(ethUsdPrice.toString());
    const tokenValueInUSD = ethUsdPriceBigint / priceRatio;

    return tokenValueInUSD;
}

export function useTokenUsdValue(tokenAmount: bigint) {
    const tokenValueInUSD = useTokenPrice();
    const tokenValue = tokenValueInUSD ? tokenAmount * tokenValueInUSD : 0n;
    return formatEther(tokenValue);
}
