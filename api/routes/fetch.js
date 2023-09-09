const express = require('express')
const router = express.Router()
const urlModel = require('../models/url')
const mongoose = require('mongoose')


router.post('/', async (req, res) => {
    try{
        let UrlModel = mongoose.model("Url", urlModel)
        let urls = await UrlModel.find({})
        res.json(urls)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router