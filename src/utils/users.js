users = []

const addUser = ({ id , username , room }) => {
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error : "Username and Room is required"
        }
    }

    //Check existing user
    const existingUser = users.find((user) => {
        return user.room == room && user.username === username
    })

    //Validate username
    if(existingUser){
        return {
            error : "Username in use!"
        }
    }

    //Store user
    const user = { id , username , room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    const profile = users.find((user) => user.id === id)
    if(!profile){
        return {
            error : "User not found"
        }
    }

    return profile
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    const res = users.filter((user) => user.room === room)

    return res
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}