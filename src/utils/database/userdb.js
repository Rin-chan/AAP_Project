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
        body: JSON.stringify({ username: username, email: email, password: hashedPassword })
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
        body: JSON.stringify({ email: email })
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
        body: JSON.stringify({ username: username, email: email, contact: contact, address: address })
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
        body: JSON.stringify({ email: email, password: password })
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
        body: JSON.stringify({ email: email, faceImage: faceImage, face: face })
    })
}

const updateUserProfilePic = async (email, profilePic) => {
    fetch(`http://${flaskIP}/updateUserProfilePic`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, profilePic: profilePic })
    })
}

// Get User Points
const getUserPoints = async (email) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getUserPoints`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => response.json())
        .then(data => {
            result = data.result;
        })
        .catch(err => console.error(err));

    return result
}


// Forget Password
const addForgotPassword = async (email) => {
    fetch(`http://${flaskIP}/forgotPassword`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
};

// Update User Points
const updateUserPoints = async (email, points) => {
    fetch(`http://${flaskIP}/updateUserPoints`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, points: points })
    })
};

// Email Verification
const addEmailVerification = async (email) => {
    fetch(`http://${flaskIP}/emailVerification`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
};

// Get Specific User
const getAllGifts = async (offset, pagelimit) => {
    console.log('entered getAllGitfts');
    let result1 = undefined;

    await fetch(`http://${flaskIP}/getAllGifts`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ offset: offset, pagelimit: pagelimit })
    })
        .then(response => response.json())
        .then(data => {
            result1 = data.result;
            

        })
        .catch(err => console.error(err));

    console.log("result11 =" + result1);
    return result1;

};


export default { addUser, getUser, updateUserDetails, updateUserPassword, updateUserFace, updateUserProfilePic, addForgotPassword, addEmailVerification, updateUserPoints, getUserPoints, addForgotPassword, addEmailVerification, getAllGifts };
