import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.email({ message: "Precisa ser um email válido" }),
    password: z
      .string({ message: "A senha é obrigatoria" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  }),
});
