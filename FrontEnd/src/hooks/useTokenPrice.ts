import { useReadContract } from "wagmi";
import unipoolv3 from "@/abis/unipoolv3.json";
import { useQuery } from "@tanstack/react-query";

export function useETHPrice() {
    const fetchData = async () => {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        return response.json();
    };

    const { data, isSuccess } = useQuery({ queryKey: ["eth"], queryFn: fetchData });

    return isSuccess && data && data.ethereum ? parseFloat(data.ethereum.usd) : 0;
}

export function useTokenPrice() {
    const { data: slot0Data } = useReadContract({
        address: "0xc45a81bc23a64ea556ab4cdf08a86b61cdceea8b",
        abi: unipoolv3,
        functionName: "slot0",
    });

    const ethUsdPrice = useETHPrice(); // 类似于 3231.98 这样的一个字符串

    if (!slot0Data || !ethUsdPrice) return;

    const sqrtPriceX96 = slot0Data[0];
    const priceRatio = sqrtPriceX96 ** 2n / 2n ** 192n;
    const tokenValueInUSD = (priceRatio * BigInt(ethUsdPrice * 1e18)) / BigInt(1e18);

    return tokenValueInUSD;
}
