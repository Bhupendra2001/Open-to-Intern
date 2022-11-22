const internModel = require('../models/InternModel')
const collegeModel = require('../models/collegeModel')
const validation = require('../validations/validation')
const { isValidEmail, validName, isvalidMobile } = validation



const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data must be present" });
        let { name, email, mobile, collegeName } = data;
        if (!name) return res.status(400).send({ status: false, message: "name is mandatory" })
        if (!email) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (!mobile) return res.status(400).send({ status: false, message: "mobile is mandatory" })
        if (!collegeName) return res.status(400).send({ status: false, message: "collegeName is mandatory" })

        if (!validName(name)) { return res.status(400).send({ status: false, message: "Invalid format of Name" }); }
        if (!validName(collegeName)) { return res.status(400).send({ status: false, message: "Invalid format of College name" }); }
        if (!isvalidMobile(mobile)) { return res.status(400).send({ status: false, message: "Invalid format of Mobile Number" }); }
        if (!isValidEmail) { return res.status(400).send("Email id is invalid.") }

        let emailUnique = await internModel.findOne({ email: email })
        if (emailUnique) return res.status(400).send({ status: false, message: "Email already exists , please provide other." })
        let mobileUnique = await internModel.findOne({ mobile: mobile })
        if (mobileUnique) return res.status(400).send({ status: false, message: "Mobile number already exists , please provide other." })

        let collegeExists = await collegeModel.findOne({ "name": collegeName })
        if (!collegeExists) return res.status(404).send({ status: false, mesage: "No such college found" })
        let intern = await internModel.create({
            name, email, mobile, collegeId: collegeExists._id, isDeleted: data.isDeleted
        })
        return res.status(201).send({ status: true, data: intern });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createIntern }