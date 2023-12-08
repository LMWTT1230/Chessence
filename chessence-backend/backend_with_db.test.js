import userServices from "./models/user-services.js";
import mongoose from "mongoose";

test("test addUser", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT1",
        password: "test",
        email: "ykang08@calpoly.edu",
    };
    const add = await userServices.addUser(user);

    expect(add).toBeTruthy();

    expect(add.firstName).toBe("Will");
    expect(add.lastName).toBe("Kang");
    await userServices.deleteUser(user.username);
});

test("test addUser already exist", async () => {
    let user1 = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    let user2 = {
        firstName: "John",
        lastName: "Doe",
        username: "LMWTT",
        password: "1234",
        email: "hello@test.com",
    };
    await userServices.addUser(user1);
    const add = await userServices.addUser(user2);

    expect(add).toBeFalsy();
    await userServices.deleteUser(user1.username);
});

test("test login", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };
    await userServices.addUser(user);
    const email = "ykang08@calpoly.edu";
    const pwd = "test";

    const login = await userServices.login(email, pwd);

    expect(login).toBeTruthy();
    await userServices.deleteUser(user.username);
});

test("test login user not found", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };
    await userServices.addUser(user);
    const email = "ykang08@calpoly.ed";
    const pwd = "test";

    const login = await userServices.login(email, pwd);

    expect(login).toBeFalsy();
    await userServices.deleteUser(user.username);
});

test("test login password don't match", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };
    await userServices.addUser(user);
    const email = "ykang08@calpoly.edu";
    const pwd = "1234";

    const login = await userServices.login(email, pwd);

    expect(login).toBeFalsy();
    await userServices.deleteUser(user.username);
});

test("test updateProfile", async () => {
    let user1 = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user1);

    let user2 = {
        firstName: "John",
        lastName: "Doe",
        username: "newname",
        password: "1234",
        email: "hello@test.com",
    };

    const oldPwd = "test";
    const update = await userServices.updateProfile(
        savedUser.id,
        user2,
        oldPwd
    );

    expect(update).toBeTruthy();
    await userServices.deleteUser(update.username);
});

test("test updateProfile not exist", async () => {
    let user2 = {};

    const oldPwd = "test";
    const update = await userServices.updateProfile(
        new mongoose.Types.ObjectId("649beed348b20e1b8e7bca95"),
        user2,
        oldPwd
    );

    expect(update).toBeFalsy();
});

test("test updateProfile null", async () => {
    let user1 = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user1);

    let user2 = {};

    const oldPwd = "test";
    const update = await userServices.updateProfile(
        savedUser.id,
        user2,
        oldPwd
    );

    expect(update).toBe(null);
    console.log(savedUser.username);
    await userServices.deleteUser(savedUser.username);
});

test("test updateProfile pwd fail", async () => {
    let user1 = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user1);

    let user2 = {
        firstName: "John",
        lastName: "Doe",
        username: "test",
        password: "1234",
        email: "hello@test.com",
    };

    const oldPwd = "1234";
    const update = await userServices.updateProfile(
        savedUser.id,
        user2,
        oldPwd
    );

    expect(update).toBeFalsy();
    await userServices.deleteUser(savedUser.username);
});

test("test username exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user);
    const exists = await userServices.existUsername(user);

    expect(exists).toBeTruthy;
    await userServices.deleteUser(savedUser.username);
});

test("test username doesn' exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT12",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const exists = await userServices.existUsername(user);

    expect(exists).toBeFalsy;
});

test("test email exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user);
    const exists = await userServices.existEmail(user);

    expect(exists).toBeTruthy;
    await userServices.deleteUser(savedUser.username);
});

test("test email doesn' exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT12",
        password: "test",
        email: "ykang09@calpoly.edu",
    };

    const exists = await userServices.existEmail(user);

    expect(exists).toBeFalsy;
});

test("test findID exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang10@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user);
    const exists = await userServices.findID(user.email);

    expect(exists).toBeTruthy;
    await userServices.deleteUser(savedUser.username);
});

test("test findID doesn't exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang11@calpoly.edu",
    };

    const exists = await userServices.findID(user.email);

    expect(exists).toBeFalsy;
});

test("test get username by id exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang10@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user);
    const expected = await userServices.getUsernameById(savedUser["_id"]);

    expect(expected).toBe(user.username);
    await userServices.deleteUser(savedUser.username);
});

test("test get username by id doesn't exists", async () => {
    let user = {
        firstName: "Will",
        lastName: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang10@calpoly.edu",
    };
    const savedUser = await userServices.addUser(user);
    const userId = savedUser["_id"];
    await userServices.deleteUser(savedUser.username);

    const expected = await userServices.getUsernameById(userId);

    expect(expected).toBe(null);
});
