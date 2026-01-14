import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
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

router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas category
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle,
);

export { router };
