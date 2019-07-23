const express = require( 'express' ) 
const router = express.Router()
const request = require('request') 
const Photo = require('../models/Picture')

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
        project: null,
        isSaved: false
    
    }})
   
    resp.send(unSplashArrey)
    }) 
})


  module.exports = router




//   /For each city code, push Flight request to array
    const requestArr  = [];
       cityCodes.forEach(c => cityCodesReq.push(request(
           `https://api.skypicker.com/flights?flyFrom=${c.airportCode}&date_from=${reqParams.fromDate}&date_to=${reqParams.toDate}&price_to=${reqParams.maxPrice}&max_fly_duration=${reqParams.dur}`
       )))

       const cityCodesRes = await Promise.all(cityCodesReq);

       //Set all the results to airportsResults
       cityCodesRes.forEach(r => {
           airportsResults.push(JSON.parse(r).data);
       })