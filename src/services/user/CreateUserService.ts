import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });

    return `Usuário ${user.name} criado com sucesso!`;
  }
}

export { CreateUserService };
