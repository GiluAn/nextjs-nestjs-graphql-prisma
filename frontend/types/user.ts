export interface User {
  id: string;
  userId: string;
  password?: string;
  name: string;
  salt?: string;
}
