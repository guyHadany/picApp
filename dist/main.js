
const renderer = new Render
const picmanager = new PicManager



// add picturs from the input val
let searchPic =  async function(keyword) {
    await picmanager.getPicture(keyword)
         renderer.renderData(picmanager.unsplashData, picmanager.pexelsData, picmanager.pixabayData )
 }
 
 
 // input click 
 $(".searchButton").on("click", async function () {
     let keyword = $(".input").val();
     await searchPic(keyword)
     $(".input").val('')
 
   });

//save click
$(".picturs").on("click", ".save",  function () {
    let picId = $(this).closest(".picBox").find("#id").attr()
    picmanager.savePic(cityName)
    // $(this).closest(".picBox").find( ".saveDelete" ).append( "<div class='remove'><i class='fas fa-heart'></i></div>" );
    // $(this).closest(".picBox").find( ".saver" ).remove()

 });


 //clivc delete from DB
 $(".picturs").on("click", ".save",  function () {
    let picId = $(this).closest(".picBox").find("#id").attr()
    tempmanager.removeCity(picId)
    // $(this).closest(".picBox").remove()
    // $(this).closest(".cityBox").find( ".saveDelete" ).append( "<div class='saver'><i class='far fa-heart'></i></div>" );
    // $(this).closest(".cityBox").find( ".remove" ).remove()
})



















//click with enter
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});
