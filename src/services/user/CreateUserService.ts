interface UserRequest {
  name: String;
  email: String;
  password: String;
}
1
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    console.log(name)
    return { name: name }
  }
}

export { CreateUserService }