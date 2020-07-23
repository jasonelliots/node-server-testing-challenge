const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    remove,
    getAll,
    findById,
};

async function insert(user) {
    try {
        const [id] = await db("users").insert(user, "id");
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function remove(id){
    const found = await findById(id)
    return db("users")
        .where({ id })
        .delete()
        .then(() => {
            return found  
        })
}

function getAll() {
    return db("users");
}

function findById(id) {
    return db("users").where({ id }).first();
}

