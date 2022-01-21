import { Router } from "express";
import { CreateProductController } from "../modules/_products/useCases/createProduct/CreateProductController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListProductController } from "../modules/_products/useCases/listProducts/ListProductController";
import { ShowProductController } from "../modules/_products/useCases/productDetails/ShowProductController";
import { UpdateProductController } from "../modules/_products/useCases/updateProduct/UpdateProductController";
import { DeleteClientController } from "../modules/_clients/useCases/deleteClient/DeleteClientController";

const productRoutes = Router()

const createProductController = new CreateProductController();

const listProductController = new ListProductController();

const showProductController = new ShowProductController();

const updateProductController = new UpdateProductController();

const deletedProductController = new DeleteClientController();

productRoutes.use(ensureAuthenticated)

productRoutes.post('/', createProductController.handle)

productRoutes.get('/', listProductController.handle)

productRoutes.get('/show/:id', showProductController.handle )

productRoutes.put('/update/:id', updateProductController.handle )

productRoutes.delete('/deleted/:id', deletedProductController.handle )

export { productRoutes }