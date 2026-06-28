const users = [];

async function getUserById(id) {
    const user = users.find(u => u.id === id);
    return user || null;
}

async function createUser(name, email) {
    const newUser = {
        id: users.length,
        name: name,
        email: email,
        createdAt: Date.now()
    };
    users.push(newUser);
    return newUser;
}

async function updateUserEmail(id, email) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.email = email;
        console.log("User updated: " + user.name);
        return user;
    } else {
        console.warn(`User with id ${id} not found for update.`);
        return null;
    }
}

async function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    } else {
        return false;
    }
    return true;
}

async function getAllUsers() {
    return users;
}

module.exports = { getUserById, createUser, updateUserEmail, deleteUser, getAllUsers };
