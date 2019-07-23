class Render {

    renderData(unsplash, pixabay, pexels) {
        $('.unsplashBox').empty()
        $('.pexelsBox').empty()
        $('.pixabayBox').empty()



        const source = $('#unsplash-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({website: unsplash});
        $('.unsplashBox').append(newHTML);

    

        const source1 = $('#unsplash-template').html();
        const template1 = Handlebars.compile(source1);
        const newHTML1 = template1({website: pixabay});
        $('.pixabayBox').append(newHTML1);

        const source2 = $('#unsplash-template').html();
        const template2 = Handlebars.compile(source2);
        const newHTML2 = template2({website: pexels});
        $('.pexelsBox').append(newHTML2);



    }

    

    renderDB(data) {
        $('.picturs').empty()

        const source = $('#favorite-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.picturs').append(newHTML);
    }






}