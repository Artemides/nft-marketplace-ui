import pinataSDK from "@pinata/sdk";

const pinataJWT = process.env.PINATA_JWT || "";
const pinata = new pinataSDK({ pinataJWTKey: pinataJWT });

export default pinata;
