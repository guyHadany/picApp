class PicManager {
    constructor() {
        this.unsplashPics = []
        this.pexelsPics = []
        this.pixabayPics = []
        this.savedPics = []
    }
    //Passes a keyword to the pics GET routh and expects some picsObjects to push into the unsplashPics array
    async getPics(keyWord) {
        let ThreeApiArrey = await $.get(`/pics/${keyWord}`)
        this.unsplashPics = ThreeApiArrey[0]
        this.pixabayPics = ThreeApiArrey[1] // this.unsplashPics.push(...unspleshPicsData)
        this.pexelsPics = ThreeApiArrey[2]
    }
    //Loop trough unsplashPics array to match id's (with the one you pressed) add passes the id as an argument to the pic POST routh to be saved in the DB 
    async savePic(picId) {
        const picInfo = this.unsplashPics.find(p => p.apiId == picId)
        await $.post(`/pic`, picInfo)
    }
  // makes a GET request to the DBpics routh to get the saved pics from the DB - fills savedPics array & clear all the other arrays 
    async getPicsFromDB() {
        let PicsFromDB = await $.get(`/DBpics`)
        this.unsplashPics = []
        this.pexelsPics = []
        this.pixabayPics = []
        this.savedPics = PicsFromDB
    }
    //makes a DELETE request to pic routh with the picture id (apiId) as an argument, and then calls getPicsFromDB to rerander the page with the new changes
    async removePic(picId) {
        await $.ajax({
            type: "DELETE",
            url: `/pic/${picId}`,
        })
        await this.getPicsFromDB()
    }
}