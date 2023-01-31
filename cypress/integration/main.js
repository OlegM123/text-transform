import cypress from "cypress";

describe("Transform main", () => {
    it("Should open app on localhost:3000", () => {
        cypress.visit("http://localhost:3000")
    })
})