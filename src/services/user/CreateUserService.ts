import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}
1
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //Verificar se enviou um email
    if (!email || email === "") {
      throw new Error("Email incorrect")
    }

    //verificar se esse email já esta cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return user;
  }
}

export { CreateUserService }