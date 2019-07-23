const express = require('express')
const router = express.Router()
// const request = require('request')
const Photo = require('../models/Picture')
const request = require('request-promise')


router.get('/pics/:keyWord', function (req, res) {
    let keyWord = req.params.keyWord
    let options = {
        url: `https://api.pexels.com/v1/search?query=${keyWord}&per_page=20&page=1`,
        headers: {
            'Authorization': '563492ad6f917000010000011bf7bad358394fb8aa5858f8e68e35b0'
        }
    }

    const unsplash = request.get(`https://api.unsplash.com/search/photos/?client_id=a80de5217171d5a4f7e0516dc0902fc68471c38646846101388181241416bbdb&page=1&per_page=20&query=${keyWord}`)
    const pixabay = request.get(`https://pixabay.com/api/?key=13102825-42ed16841cc268f756b460bf0&q=${keyWord}&image_type=photo`)
    const pexels = request.get(options)


    Promise.all([unsplash, pixabay, pexels]).then(function (result) {
        const allPics = result.map(a => a = JSON.parse(a))
        const unsplashPics = allPics[0].results.map(a => {
            return {
                name: keyWord,
                largeUrl: a.urls.regular,
                smallUrl: a.urls.small,
                apiId: a.id,
                likes: a.likes,
                webURL: a.links.html,
                photographer: a.user.name,
                project: null,
                isSaved: false

            }
        })
        const pixabayPics = allPics[1].hits.map(a => {
            return {
                name: keyWord,
                largeUrl: a.largeImageURL,
                smallUrl: a.webformatURL,
                apiId: a.id,
                likes: a.likes,
                webURL: a.pageURL,
                photographer: a.user,
                project: null,
                isSaved: false

            }
        })

        const pexelsPics = allPics[2].photos.map(a => {
            return {
                name: keyWord,
                largeUrl: a.src.large,
                smallUrl: a.src.medium,
                apiId: a.id,
                likes: null,
                webURL: a.url,
                photographer: null,
                project: null,
                isSaved: false

            }
        }
        )
        res.send([unsplashPics, pixabayPics, pexelsPics])
    })
})


router.post('/pic', function (req, res) {
    let data = req.body
    let picture = new Picture(data)
    picture.save()
    res.end()
})

router.get('/favorite', function (req, res) {
    Picture.find({}).exec(function (err, data) {
        res.send(data)
    })
})

router.delete('/pic/:picId', function (req, res) {
    let picId = req.params.picId
    res.send(picId)
})


module.exports = router




// const firstAPI = await request.get(`https://api.unsplash.com/search/photos/?client_id=a80de5217171d5a4f7e0516dc0902fc68471c38646846101388181241416bbdb&page=1&per_page=20&query=${keyWord}`);
    // console.log(firstAPI)

    // let unSplashData = JSON.parse(firstAPI)
    // console.log(unSplashData)
    // resp.send(firstAPI)

    // let unSplashArrey = firstAPI.results.map(a => {
    //     return {
    //         name: keyWord,
    //         largeUrl: a.urls.regular,
    //         smallUrl: a.urls.small,
    //         apiId: a.id,
    //         likes: a.likes,
    //         webURL: a.links.html,
    //         photographer: a.user.name,
    //         project: null,
    //         isSaved: false

    //     }
    // })

    // const secondAPI = await request.get(options);


    //const secnondAPI = await request.get('SECOND API')

    // request.get(`https://api.unsplash.com/search/photos/?client_id=a80de5217171d5a4f7e0516dc0902fc68471c38646846101388181241416bbdb&page=1&per_page=20&query=${keyWord}`, function (err, res, body) {
    //     let unSplashData = JSON.parse(body)
        // let unSplashArrey = unSplashData.results.map(a => {
        //     return {
        //         name: keyWord,
        //         largeUrl: a.urls.regular,
        //         smallUrl: a.urls.small,
        //         apiId: a.id,
        //         likes: a.likes,
        //         webURL: a.links.html,
        //         photographer: a.user.name,
        //         project: null,
        //         isSaved: false

        //     }
        // })
    // })



    // request.get(options, function (err, response, body) {
    //     let pexelsData = JSON.parse(body)
    //     let pexelsArrey = pexelsData.photos.map(a => {
    //         return {
    //             name: keyWord,
    //             largeUrl: a.src.large,
    //             smallUrl: a.src.medium,
    //             apiId: a.id,
    //             likes: null,
    //             webURL: a.url,
    //             photographer: null,
    //             project: null,
    //             isSaved: false

    //         }
    //     }
    //     )
    //     resp.send(pexelsArrey)
    // })
