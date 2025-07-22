import envVars from "../config/envvars.config";
import { Role } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  const superAdminExists = await User.findOne({
    email: envVars.SUPER_ADMIN_EMAIL,
    role: Role.SUPERADMIN,
  });
  if (superAdminExists) {
    console.log("Super admin already exists");
    return;
  }
  console.log("Trying to create a super admin...");
  await User.create({
    name: "Super Admin",
    email: envVars.SUPER_ADMIN_EMAIL,
    password: envVars.SUPER_ADMIN_PASS,
    role: Role.SUPERADMIN,
  });
  console.log("Super admin created successfully");
};
