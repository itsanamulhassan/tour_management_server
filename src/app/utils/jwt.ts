import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";
import env from "../configurations/env";

const signToken = (payload: JwtPayload): string => {
  return JWT.sign(payload, env.jwt_secret, {
    expiresIn: env.jwt_expires_in,
  } as SignOptions);
};

const verifyToken = (token: string): JwtPayload => {
  return JWT.verify(token, env.jwt_secret) as JwtPayload;
};

export const jwt = {
  signToken,
  verifyToken,
};
