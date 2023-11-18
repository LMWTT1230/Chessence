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

    await gameServices.addGame(game1);
    await gameServices.addGame(game2);

    const games = await gameServices.getGames();
    console.log(games);

    expect(games.length).toBe(2);
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
