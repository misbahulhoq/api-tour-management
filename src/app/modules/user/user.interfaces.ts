import { Types } from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

interface IAuthProvider {
  provider: string;
  providerId: string;
}
export interface IUser {
  name: string;
  email: string;
  password?: string; // Optional as it might not be needed for auth provider logins
  phone?: string; // Optional
  picture?: string; // Optional
  address?: string; // Optional
  isDeleted?: boolean; // Optional
  isActive: isActive;
  isVerified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookings: Types.ObjectId[];
  guides: Types.ObjectId[];
}
