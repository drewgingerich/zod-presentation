import { getHello } from "./part_06";

describe("getHello", () => {
    it("returns a hello string when person is valid", () => {
        const someValidPerson = { name: "Jake" };

        const hello = getHello(someValidPerson);

        expect(hello).toContain("Hello");
    });

    it("throws an error when person is not valid", () => {
        const someNonValidPerson = { type: "dog", sound: "woof" };

        const act = () => getHello(someNonValidPerson);

        expect(act).toThrow();
    });
});
