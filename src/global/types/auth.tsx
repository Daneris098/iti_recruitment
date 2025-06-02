export interface UserDataStore {
  data: JWTPayload | undefined;
  setData: (value: JWTPayload) => void;
}

export type JWTPayload = {
  sub?: string;
  Name: string;
  admin?: true;
  iat?: number;
};
