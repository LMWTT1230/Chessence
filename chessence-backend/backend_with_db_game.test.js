import gameServices from "./models/game-services";

test("test getGames", async () => {
    const game1 = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };

    const game2 = {
        blackID: "1234",
        whiteID: "abcd",
        gameHistory: "c3b2a1",
        date: "2023-11-18T02:00:00Z",
        winner: "1234",
    };

    const addedGame1 = await gameServices.addGame(game1);
    const addedGame2 = await gameServices.addGame(game2);

    const games = await gameServices.getGames();

    expect(games[0]["blackID"]).toBe(game1.blackID);
    expect(games[1]["blackID"]).toBe(game2.blackID);
    await gameServices.deleteGame(addedGame1["_id"]);
    await gameServices.deleteGame(addedGame2["_id"]);
});

test("test get one Game", async () => {
    const game1 = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };

    const game2 = {
        blackID: "1234",
        whiteID: "abcd",
        gameHistory: "c3b2a1",
        date: "2023-11-18T02:00:00Z",
        winner: "1234",
    };

    const addedGame1 = await gameServices.addGame(game1);
    const addedGame2 = await gameServices.addGame(game2);

    const games = await gameServices.getGames(addedGame1["_id"]);

    expect(games["blackID"]).toBe(game1.blackID);
    await gameServices.deleteGame(addedGame1["_id"]);
    await gameServices.deleteGame(addedGame2["_id"]);
});

test("test getGamesById exists", async () => {
    const game = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };
    const addedGame = await gameServices.addGame(game);
    const addedGameByID = await gameServices.getGames(addedGame["_id"]);

    expect(addedGameByID).toBeTruthy;
    await gameServices.deleteGame(addedGame["_id"]);
});

test("test getGamesById doesn't exists", async () => {
    const game = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };
    const addedGame = await gameServices.addGame(game);
    const gameId = addedGame["_id"];
    await gameServices.deleteGame(gameId);
    const addedGameByID = await gameServices.getGames(gameId);

    expect(addedGameByID).toBeFalsy;
});

test("test addGame", async () => {
    const game = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };

    const addedGame = await gameServices.addGame(game);

    expect(addedGame).toBeTruthy();
    expect(addedGame.blackID).toBe("abcd");
    expect(addedGame.whiteID).toBe("1234");
    await gameServices.deleteGame(addedGame["_id"]);
});

test("test add same Game", async () => {
    const game = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };

    const addedGame1 = await gameServices.addGame(game);
    const addedGame2 = await gameServices.addGame(game);

    const games = await gameServices.getGames();

    expect(games[0]["blackID"]).toBe(game.blackID);
    expect(games[1]["blackID"]).toBe(game.blackID);
    await gameServices.deleteGame(addedGame1["_id"]);
    await gameServices.deleteGame(addedGame2["_id"]);
});

test("test deleteGame", async () => {
    const game = {
        blackID: "abcd",
        whiteID: "1234",
        gameHistory: "a1b2c3",
        date: "2023-11-17T20:00:00Z",
        winner: "abcd",
    };

    const addedGame = await gameServices.addGame(game);
    const result = await gameServices.deleteGame(addedGame["_id"]);

    expect(result).toBeTruthy();
});
