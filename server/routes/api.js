const express = require( 'express' ) 
const router = express.Router()
const request = require('request') 
const Picture = require('../models/Picture.js')

router.get('/pics/:keyWord', function (req, resp) {
    let keyWord = req.params.keyWord
    request.get(`https://api.unsplash.com/search/photos/?client_id=a80de5217171d5a4f7e0516dc0902fc68471c38646846101388181241416bbdb&page=1&per_page=20&query=${keyWord}`, function(err, res, body){
    let unSplashData = JSON.parse(body)
    let unSplashArrey = unSplashData.results.map(a => 
        {return {name: keyWord, 
        largeUrl: a.urls.regular,
        smallUrl: a.urls.small,
        apiId: a.id,
        likes: a.likes,
        webURL: a.links.html,
        photographer: a.user.name,
        collection: null}})
   
    resp.send(unSplashArrey)
    }) 
})


  module.exports = router