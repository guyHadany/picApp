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
    savePic(picId, projectName) {
        let picInfo 
        if (this.unsplashPics.find(p => p.apiId == picId)) {
            picInfo = this.unsplashPics.find(p => p.apiId == picId)
        } else if (this.pexelsPics.find(p => p.apiId == picId)) {
            picInfo = this.pexelsPics.find(p => p.apiId == picId)
        } else {
            picInfo = this.pixabayPics.find(p => p.apiId == picId)
        }
  
        picInfo.isSaved = true
        $.post(`/pic/${projectName}`, picInfo)
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



    async getProjectName() {
      let names = await $.get('/projectsNames')
      console.log(names);
      
       return names
    }



     addToProject(name, picId) {
        let picInfo 

        if (this.unsplashPics.find(p => p.apiId == picId)) {
            picInfo = this.unsplashPics.find(p => p.apiId == picId)
        } else if (this.pexelsPics.find(p => p.apiId == picId)) {
            picInfo = this.pexelsPics.find(p => p.apiId == picId)
        } else {
            picInfo = this.pixabayPics.find(p => p.apiId == picId)
        }
        
        picInfo.isSaved = true
        $.post(`/projects/${name}`, picInfo )

        
    }





}