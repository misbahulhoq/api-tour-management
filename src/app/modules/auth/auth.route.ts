import { NextFunction, Request, Response, Router } from "express";
import AuthController from "./auth.controller";
import passport from "passport";

const router = Router();

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.get("/google", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthController.loginWithGoogle
);
export const AuthRoutes = router;

export default router;
