import flaskServer from "../../../settings.json";
const flaskIP = flaskServer.flaskServer;

// Add User
const addUser = async (username, email, hashedPassword) => {
    fetch(`http://${flaskIP}/addUser`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email, password: hashedPassword})
    })
};

// Get Specific User
const getUser = async (email) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getSpecificUser`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

// Update User Info
const updateUserDetails = async (email, username, contact, address) => {
    fetch(`http://${flaskIP}/updateUserDetails`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email, contact: contact, address: address})
    })
}

// Update User Password
const updateUserPassword = async (email, password) => {
    fetch(`http://${flaskIP}/updateUserPassword`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
}

// Update User Face Verification
const updateUserFace = async (email, faceImage, face) => {
    fetch(`http://${flaskIP}/updateUserFace`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, faceImage: faceImage, face: face})
    })
}

export default { addUser, getUser, updateUserDetails, updateUserPassword, updateUserFace };