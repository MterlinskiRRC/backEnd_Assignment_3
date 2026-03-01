// Always mock firebase in every test
jest.mock("../firebase", () => ({
    db: {
        collection: jest.fn(() => ({
            get: jest.fn(),
            doc: jest.fn(() => ({
                get: jest.fn(),
                set: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }))
        }))
    }
}));

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});
