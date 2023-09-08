const express = require('express')
const router = express.Router()
const urlModel = require('../models/url')
const mongoose = require('mongoose')

router.get('/:url', async (req, res) => {
    if (!req.params['url']) {
        const resp = JSON.parse('{ "status": "failed", "message": "Must include url" }')
        res.json(resp)
        return
    }
    try{
        const url = req.params['url'];
        let UrlModel = mongoose.model("Url", urlModel)
        let foundUrl = await UrlModel.findOne({'shortened': url })
        if(foundUrl){
            return res.redirect(foundUrl.url);
        }else{
            res.status(404).json('url not found in the db');
    }
    }catch(err){
        res.status(500).json('Server Error');
    }
})
module.exports = router