const mongoose = require("mongoose")


// validation  of name 
const validName = (name) =>
{
    const nameRegex = 
    /^[a-zA-Z0-9\s]+$/
    return nameRegex.test(name)
} 


// validation of email 
const isValidEmail = (email) =>
{
    const emailRegex = 
    /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}


 //validation for ObjectId
const isvalidObjectid = (objectId) =>
{
    return mongoose.Types.ObjectId.isValid(objectId)
}

//validation for mobile
const isvalidMobile = (mobile)=>
{
    const mobileRegex = /^[0-9]\d{9}$/
    return mobileRegex.test(mobile)
}

module.exports = { validName, isValidEmail , isvalidObjectid, isvalidMobile }
