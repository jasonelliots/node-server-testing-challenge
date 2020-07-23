const supertest = require("supertest");

const server = require("./server.js");

const Users = require("../users/usersModel");
const db = require("../data/dbConfig.js");


describe("create", function() {

    beforeEach(async () => {
        await db("users").truncate();
    });

    it("can create a new user", async () => {
       await Users.insert({ username: "tester"});

       const users = await db('users');

       expect(users).toHaveLength(1)
    })

    it("should response with json", function () {
        return supertest(server)
            .get("/users")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
    })

})


describe("delete", function() {
    beforeEach(async () => {
        await db("users").truncate();
    });

    describe("can delete a new user", () => {
        it("can create a new user", async () => {
            await Users.insert({ username: "tester"});
     
            const users = await db('users');
     
            expect(users).toHaveLength(1)
         })

         it("can delete a new user", async () => {
            await Users.remove(1);
     
            const users = await db('users');
     
            expect(users).toHaveLength(0)
         })
    })

    
})