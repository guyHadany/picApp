class Render {

    renderData(unsplash, pixabay, pexels) {
        $('.unsplashBox').empty()
        $('.pexelsBox').empty()
        $('.pixabayBox').empty()
        $('.projectAlbum').remove()
        $('.PnameEmpty').remove()

        const source = $('#all-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({website: unsplash});
        $('.unsplashBox').append(newHTML);

        const source1 = $('#all-template').html();
        const template1 = Handlebars.compile(source1);
        const newHTML1 = template1({website: pixabay});
        $('.pixabayBox').append(newHTML1);

        const source2 = $('#all-template').html();
        const template2 = Handlebars.compile(source2);
        const newHTML2 = template2({website: pexels});
        $('.pexelsBox').append(newHTML2);
    }

    renderPName(projectsNames) {
        $('.picBox').remove()
        $('.PnameEmpty').remove()
        $(".unsplash").css("display", "none")
        $(".pexels").css("display", "none")
        $(".pixabay").css("display", "none")
        
        const source3 = $('#favorite-template').html();
        const template3 = Handlebars.compile(source3);
        const newHTML3 = template3({projectsNames});
        $('.picturs').append(newHTML3);
    }

    renderProject(pictures) {
        $('.projectAlbum').remove()
        $('.picBox').remove()
        $('.PnameEmpty').remove()
        const source3 = $('#project-template').html();
        const template3 = Handlebars.compile(source3);
        const newHTML3 = template3({website: pictures});
        $('.picturs').append(newHTML3);
    }

     renderPopup (namesArr) {
        const sourcePopup = $('#popup-template').html();
        const templatePopup = Handlebars.compile(sourcePopup);
        let newHTML = templatePopup({namesArr});
        $('.popUp').append(newHTML);
        $("#container").css({"filter": "blur(8px)","-webkit-filter": "blur(8px)"})
    }
 
     removePopup(){
        $(".popUp").empty()
        $("#container").css({"filter": "blur(0px)","-webkit-filter": "blur(0px)"})
    }




}