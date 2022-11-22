
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/InternModel")
const validation = require('../validations/validation')
const { validName } = validation


const createCollege = async (req, res) => {

    try {
        let body = req.body
        let { name, fullName, logoLink } = body
        if (Object.keys(body).length == 0)
            return res.status(400).send({ status: false, msg: "All field is mandatory" })
        if (!name) return res.status(400).send({ status: false, msg: "name is required" })
        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is required" })
        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is required" })
        if (!validName(name)) return res.status(400).send({ status: false, msg: "inValid name" })
        let checkname = await collegeModel.find({ name })
        if (checkname.length != 0) return res.status(400).send({ status: false, msg: "Pls provide a unique name" })
        if (!validName(fullName)) return res.status(400).send({ status: false, msg: "inValid fullName" })
        const saveData = await collegeModel.create(body)
            return res.status(201).send({ status: true, msg: "data successfully created", data: saveData })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}

const getCollegeData = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        if(!collegeName)return res.status(400).send({status:false,msg:"Pls provide College Name"})
        let findcollege = await collegeModel.findOne({ name: collegeName })
        if (!findcollege) { return res.status(404).send({ status: false, msg: "No college exists with this collegeName" }) }
        if(findcollege.isDeleted==true){return res.status(404).send({status:false,msg:"No college found"})}
        let collegeId = findcollege._id
        let interAvailable = await internModel.find({ collegeId,isDeleted : false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (interAvailable.length == 0) { return res.status(404).send({ status: false, msg: `No intern found with this collegeName - ${collegeName}` }) }
        let { name, fullName, logoLink } = findcollege
        let obj = {
            name, fullName, logoLink, interns: interAvailable
        }
        return res.status(200).send({ status: true, data: obj })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createCollege, getCollegeData }

