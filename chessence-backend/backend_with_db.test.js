import userServices from "./models/user-services.js";
import mongoose from "mongoose";

test("test addUser", async () => {
    let user = {
        firstname: "Will",
        lastname: "Kang",
        username: "LMWTT",
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
        firstname: "Will",
        lastname: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    let user2 = {
        firstname: "John",
        lastname: "Doe",
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
        firstname: "Will",
        lastname: "Kang",
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
        firstname: "Will",
        lastname: "Kang",
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
        firstname: "Will",
        lastname: "Kang",
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
        firstname: "Will",
        lastname: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user1);

    let user2 = {
        firstname: "John",
        lastname: "Doe",
        username: "test",
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
        firstname: "Will",
        lastname: "Kang",
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
        firstname: "Will",
        lastname: "Kang",
        username: "LMWTT",
        password: "test",
        email: "ykang08@calpoly.edu",
    };

    const savedUser = await userServices.addUser(user1);

    let user2 = {
        firstname: "John",
        lastname: "Doe",
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
