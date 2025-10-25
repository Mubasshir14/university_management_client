export interface IUser {
  userId: string;
  email: string;
  password: string;
  image?: string;
  name: string;
  role: "user" | "student" | "admin" | "advisor";
  phone: string;
  address: string;
}
