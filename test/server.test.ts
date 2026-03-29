import app from "../src/app";

describe("Express App", () => {
    test("app should be defined", () => {
        expect(app).toBeDefined();
    });

    test("app should be an Express application", () => {
        expect(typeof app).toBe("function");
    });
});
