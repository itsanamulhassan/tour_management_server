export interface JWTCredentialProps {
  credentialId: string;
  email: string;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      user: JWTCredentialProps;
    }
  }
}
