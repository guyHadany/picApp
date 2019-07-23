class Render {

    renderData(unsplash, pexels, pixabay) {
        $('.unsplashBox').empty()
        $('.pexelsBox').empty()
        $('.pixabayBox').empty()

        const source = $('#unsplash-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({unsplash});
        $('.unsplashBox').append(newHTML);

        const source = $('#pexels-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({pexels});
        $('.pexelsBox').append(newHTML);

        const source = $('#pixabay-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({pixabay});
        $('.pixabayBox').append(newHTML);
    }


    renderDB(data) {
        $('.picturs').empty()

        const source = $('#favorite-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.picturs').append(newHTML);
    }






}