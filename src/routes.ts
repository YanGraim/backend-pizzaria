import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer"
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";

const router = Router();

//utiliza como middleware
const upload = multer(uploadConfig.upload("./tmp"));

// rotas user //
//POST
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
//GET
router.get("/me", isAuthenticated, new DetailUserController().handle);

// rotas categories //
//POST 
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
//GET
router.get("/categorys", isAuthenticated, new ListCategoryController().handle);

// rotas products //
//POST
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
//GET
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);

// rotas orders //
//POST
router.post("/order", isAuthenticated, new CreateOrderController().handle);
//DELETE
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
//POST
router.post("/order/add", isAuthenticated, new AddItemController().handle);

export { router }