import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const routerModules: { path: string; routes: Router }[] = [
  {
    path: "/user",
    routes: UserRoutes,
  },
];

routerModules.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
