import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";


class RemoveItemController {
  async handle(req: Request, res: Response) {
    const itemId = req.query.itemId as string;

    const removeItem = new RemoveItemService();

    const item = await removeItem.execute({ itemId })

    res.json(item);
  }
}

export { RemoveItemController }