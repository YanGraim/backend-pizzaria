import prismaClient from "../../prisma";

interface ListCategoryRequest {
  category_id: string;
}

class ListByCategoryService {
  async execute({ category_id }: ListCategoryRequest) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        categoryId: category_id
      }
    })
    return findByCategory;
  }
}

export { ListByCategoryService }