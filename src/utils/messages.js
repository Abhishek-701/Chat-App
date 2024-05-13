const generateMessage = (username,text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocation = (username, loc) => {
    return {
        username,
        location: loc,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocation
}