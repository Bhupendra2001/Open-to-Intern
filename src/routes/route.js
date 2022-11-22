const collegeController = require('../controllers/collegeController')
const internController = require("../controllers/internController")
const express = require('express')
const router = express.Router()


router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createIntern)
router.get('/functionup/collegeDetails', collegeController.getCollegeData)

module.exports = router


