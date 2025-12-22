import { Router } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";

const router = Router();

// Rotas users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

router.get("/me", new DetailUserController().handle);

export { router };
