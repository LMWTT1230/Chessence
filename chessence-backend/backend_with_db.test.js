import userServices from "./models/user-services.js";

test("test addUser", async () => {
    let user = {
        firstname: "Will",
        lastname: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };
    const deleteUser = await userServices.deleteUser("LMWTT");
    const add = await userServices.addUser(user);

    expect(add).toBeTruthy();

    expect(add.firstName).toBe("Will");
    expect(add.lastName).toBe("Kang");
});
