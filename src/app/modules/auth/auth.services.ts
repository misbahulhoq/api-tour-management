import { createNewAccessTokenByRefreshToken } from "../../utils/userTokens";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenByRefreshToken(refreshToken);
  return newAccessToken;
};

export const AuthServices = {
  getNewAccessToken,
};

export default AuthServices;
