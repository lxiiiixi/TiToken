export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
if (typeof PROJECT_ID === "undefined") {
    throw new Error("Please provide PROJECT_ID in .env");
}

const BASE_URL_PRO = import.meta.env.VITE_BASE_URL_PRO;
const BASE_URL_DEV = import.meta.env.VITE_BASE_URL_DEV;
export const BASE_URL = process.env.NODE_ENV === "production" ? BASE_URL_PRO : BASE_URL_DEV;
if (typeof BASE_URL === "undefined") {
    throw new Error("Please provide BASE_URL in .env");
}

// export const INFURIA_PID = import.meta.env.VITE_INFURIA_PID;
// if (typeof INFURIA_PID === "undefined") {
//     throw new Error("Please provide INFURIA_PID in .env");
// }

// export const INFURIA_API = import.meta.env.VITE_INFURIA_API;
// if (typeof INFURIA_API === "undefined") {
//     throw new Error("Please provide INFURIA_API in .env");
// }

// export const IMGBB_API = import.meta.env.VITE_IMGBB_API;
// if (typeof INFURIA_API === "undefined") {
//     throw new Error("Please provide IMGBB_API in .env");
// }
