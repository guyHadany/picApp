class Render {

    renderData(data) {
        $('.unsplashBox').empty()

        const source = $('#unsplash-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.unsplashBox').append(newHTML);
    }


    renderDB(data) {
        $('.picturs').empty()

        const source = $('#favorite-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.picturs').append(newHTML);
    }






}