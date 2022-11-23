const mongoose = require("mongoose")


// validation  of name 
const validName = (name) => {
    const nameRegex =
        /^[a-zA-Z\s]+$/
    return nameRegex.test(name)
}



// validation of email 
const isValidEmail = (email) => {
    const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return emailRegex.test(email)
}


//validation for ObjectId
const isvalidObjectid = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}


//validation for mobile
const isvalidMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(mobile)
}


module.exports = { validName, isValidEmail, isvalidObjectid, isvalidMobile }