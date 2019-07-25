const express = require('express')
const router = express.Router()
const Picture = require('../models/Picture')
const Project = require('../models/Project')
const request = require('request-promise')


//api requests

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
                isSaved: false

            }
        }
        )


        res.send([unsplashPics, pixabayPics, pexelsPics])
    })
})


//saves a picture into pictures and creates a new project with a ref id

router.post('/pic/:name', function (req, res) {
    let projectName = req.params.name
    let picture = new Picture(req.body)
    let project = new Project({ name: projectName })
    project.pictures.push(picture)
    picture.save()
    project.save()
    res.end()
})



// router.get('/favorite', function (req, res) {
//     Picture.find({}).exec(function (err, data) {
//         res.send(data)
//     })
// })


// populating the pictures in the relevant project and sends them back

router.get('/project/:name', function (req, res) {
    let name = req.params.name
    Project.findOne({ name: name })
        .populate('pictures')
        .exec(function (err, project) {
            res.send(project.pictures)
        })
})

// saves a picture to pictures and to the relevant project (as a ref)

router.post('/projects/:name', function (req, res) {
    let name = req.params.name
    let picture = new Picture(req.body)
    picture.save()
    Project.findOne({ name: name }, function (err, project) {
        project.pictures.push(picture)
        project.save()
    })
    res.end()
})

// gets the names of the existed projects

router.get('/projectsNames', async function (req, res) {
    let data = await Project.find({})
    let names = data.map(p => p.name)
    res.send(names)
})

// delets from both collections

router.delete('/pic/:picId/:project', function (req, res) {
    let picId = req.params.picId
    let project = req.params.project
    Project.findOne({ name: project }, function (err, project) {
        let index = project.pictures.findIndex(a => a == picId)
        project.pictures.splice(index, 1)
        project.save()
    })

    Picture.findOne({ _id: picId }, function (err, picture) {
        picture.remove(function (err) {
            console.log(err)
            res.end()
        })
    })

})

router.delete('/project/:projectName', function(req, res){
    let projectName = req.params.projectName
    Project.findOneAndRemove({name: projectName}, function(err, project){
        res.end()
    })
})


module.exports = router


