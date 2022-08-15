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

// Get All Gifts
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

// Get Specific Gift
const getSpecificGift = async (code) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getSpecificGift`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => response.json())
        .then(data => {
            result = data.result;
        })
        .catch(err => console.error(err));

    console.log("SpecificGift =" + result);
    return result;

};

// Add Redeem Item
const addRedeemItem = async (itemcode, email) => {
    console.log("ADD REDEEM ITEM");
    await getSpecificGift(itemcode).then((result) => {
        if (result.length != 0) {
            const giftname = result[0][1];
            const img = result[0][7];
            const point = result[0][6];
            const industry = result[0][3];
            const company = result[0][4];
            const giftdesc = result[0][2]

            fetch(`http://${flaskIP}/addRedeemItem`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemcode: itemcode, email: email, giftname: giftname, industry: industry, company: company, points: point, img: img, description:giftdesc })
            })
        }
        else {
            console.log("GIFT NOT REDEEMED!");
            return;
        }
    });
    ;



};

// Use Redeem Item
const useRedeemItem = async (redeemcode) => {
    fetch(`http://${flaskIP}/useRedeemItem`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ redeemcode: redeemcode })
    })
};

// Get Unused Redeem Item
const getUnusedRedeemItems = async (email) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getUnusedRedeemItems`, {
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

    console.log("All Unused Items =" + result);
    return result;

};

// get Used Redeem Items
const getUsedRedeemItems = async (email) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getUsedRedeemItems`, {
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

    console.log("All Used Items =" + result);
    return result;

};



export default { addUser, getUser, updateUserDetails, updateUserPassword, updateUserFace, updateUserProfilePic, addForgotPassword, addEmailVerification, updateUserPoints, getUserPoints, addForgotPassword, addEmailVerification, getAllGifts, getSpecificGift, addRedeemItem, useRedeemItem, getUnusedRedeemItems, getUsedRedeemItems };
