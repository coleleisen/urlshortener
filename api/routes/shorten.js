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
        let UrlModel = mongoose.model("Url", urlModel)
        const url = req.body.url
        let id = short()
        console.log(isValidUrl(url))
        if(isValidUrl(url)){
            let isFound = await UrlModel.findOne({'url' : url })
            if(isFound){
                res.status(500).json("URL already exists") 
                return
            }else{
                let newUrl = new UrlModel()
                newUrl.url = url
                if(req.body.custom && req.body.shortened){
                    let foundShortened = await UrlModel.findOne({'shortened' : req.body.shortened})    
                    if(foundShortened){
                        res.status(500).json("Short URL already exists") 
                        return                
                    }else{
                        newUrl.shortened = req.body.shortened
                    }                       
                }else{
                    const shortened = `cr.${id}`                            
                    newUrl.shortened = shortened
                }
                await newUrl.save()
                res.json(newUrl)
            }
        } else {
            res.status(400).json('Invalid Url')
          }
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router