const express = require('express')
const router = express.Router()
const short = require('shortid');
const isValidUrl = require('../util/validateurl')
const urlModel = require('../models/url')
const mongoose = require('mongoose')


router.post('/', async (req, res) => {
    if (!req.body.url) {
        const resp = JSON.parse('{ "status": "failed", "message": "Must include url" }')
        res.json(resp)
        return
    }
    try{
        let UrlModel = mongoose.model("Url", urlModel);
        const url = req.body.url;
        let id = short()
        if(isValidUrl(url)){
            let isFound = await UrlModel.findOne({'url' : url })
            if(isFound){
                res.json(isFound)
            }else{
                const shortened = `cr.${id}`           
                let newUrl = new UrlModel()
                newUrl.url = url;
                newUrl.shortened = shortened
                await newUrl.save()
                res.json(newUrl)
            }
        } else {
            res.status(400).json('Invalid Url');
          }
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router