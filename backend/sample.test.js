const { registerUser, loginUser } = require("./src/SocketFunctions");

describe("Backend Test", () => {
  const user = {
    username: "test1",
    email: "test1@hotmail.com",
    password: "123456",
    images: [],
  };

  const loggedUser = {
    _email: "test1@hotmail.com",
  };

  test("Register User Success", async () => {
    const response = registerUser(user);
    expect(response).toMatchObject({ user });
  });

  test("Register User Failed", async () => {
    registerUser(user);
    const response = registerUser(user);
    expect(response).toMatchObject({ error: "User already exists!" });
  });

  test("Login User Success", async () => {
    registerUser(user);
    const response = loginUser(user);
    expect(response).toMatchObject({ user: loggedUser });
  });
});
