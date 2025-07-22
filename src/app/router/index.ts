import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const routerModules: { path: string; routes: Router }[] = [
  {
    path: "/user",
    routes: UserRoutes,
  },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
];

routerModules.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
