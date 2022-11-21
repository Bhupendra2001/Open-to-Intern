
const CollegeModel = require("../models/collegeModel")
const validation = require('../validations/validation')
const   { validName } = validation


const createCollege = async (req, res) => {

    try{

    let body = req.body
    let { name , fullName , logoLink } = body

    if(Object.keys(body).length == 0){
        return res.status(404).send({status : false , msg : "All field is mandatory"})
    }

    if(!name){
        return res.status(404).send({status : false, msg : "name is required"})
    }

    if(!fullName){
        return res.status(404).send({status : false, msg : "fullName is required"})
    }

    if(!logoLink){
        return res.status(404).send({status : false, msg : "logoLink is required"})
    }

    if(!validName(name))  return res.status(404).send({status : false, msg : "inValid name"})

    if(!validName(fullName)) return res.status(404).send({status : false, msg : "inValid fullName"})


    const saveData = await CollegeModel.create(body)
    return res.status(201).send({status : true, msg : "data successfully created", data : saveData})
    }
    
    catch(err)
    {
    return res.status(500).send({status : false, msg : err.message })
    }

}


module.exports = { createCollege}

