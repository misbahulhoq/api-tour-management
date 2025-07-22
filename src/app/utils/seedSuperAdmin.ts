/* eslint-disable no-console */
import envVars from "../config/envvars.config";
import { Role } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";
export const seedSuperAdmin = async () => {
  const superAdminExists = await User.findOne({
    email: envVars.SUPER_ADMIN_EMAIL,
    role: Role.SUPERADMIN,
  });
  if (superAdminExists) {
    console.log("Super admin already exists!");
    return;
  }
  console.log("Trying to create a super admin...");
  const hashedPass = await bcrypt.hash(envVars.SUPER_ADMIN_PASS as string, 10);
  await User.create({
    name: "Super Admin",
    email: envVars.SUPER_ADMIN_EMAIL,
    password: hashedPass,
    role: Role.SUPERADMIN,
    auths: [
      {
        provider: "email",
        providerId: envVars.SUPER_ADMIN_EMAIL,
      },
    ],
  });
  console.log("Super admin created successfully");
};
