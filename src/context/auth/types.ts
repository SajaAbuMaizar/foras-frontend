export interface User {
  name: string;
  type: string;
}

export interface AuthContextType {
  user: User | null | undefined;
  signin: (phone: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
}
