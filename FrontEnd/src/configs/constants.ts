import buyandburn from "@/abis/buyandburn.json";
import token from "@/abis/titanx.json";

export const SUPPORTED_CHAINS = [168587773];

export const BUYANDBURN_CONTRACT_CONFIG = {
    address: "0xD1Eb23B8a9AE7FE2426cf8093253fe17e4f604E8" as `0x${string}`,
    abi: buyandburn,
};

export const TOKEN_CONTRACT_CONFIT = {
    address: "0xA44473bbff67036d16D2B907e07d6cD49D547EF5" as `0x${string}`,
    abi: token,
};
