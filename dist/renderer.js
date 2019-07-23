class Render {

    renderData(data) {
        $('.unsplash').empty()

        const source = $('#unsplash-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.unsplash').append(newHTML);
    }


    renderDB(data) {
        $('.picturs').empty()

        const source = $('#favorite-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('.picturs').append(newHTML);
    }






}