
const renderer = new Render
const picmanager = new PicManager



// add picturs from the input val
let searchPic =  async function(keyword) {
    await picmanager.getPics(keyword)
         renderer.renderData(picmanager.unsplashPics, picmanager.pixabayPics, picmanager.pexelsPics )
 }
 
 
 // input click 
 $(".searchButton").on("click", async function () {
     $(".unsplash").css("display", "block")
     $(".pexels").css("display", "block")
     $(".pixabay").css("display", "block")

     let keyword = $(".input").val();
     await searchPic(keyword)
     $(".input").val('')
 
   });

//save click
$(".picturs").on("click", ".save",  function () {
    let picId = $(this).closest(".picBox").attr("id")
    let projectName = "jojo"
    picmanager.savePic(picId, projectName)




 });


 //clivc delete from DB
 $(".picturs").on("click", ".remove",  function () {
    let picId = $(this).closest(".picBox").attr("id")
    tempmanager.removePic(picId)

})



$(".favorite").on("click", function () {
    tempmanager.getPicsFromDB()
    renderer.renderDB(tempmanager.savedPics)

})





//click with enter
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});



// pic box hover
       $(".picturs").on( "mouseenter", ".picBox", function() {
        $(this).closest(".picBox").find( ".content" ).css( "display", "block");
    });

    $(".picturs").on( "mouseleave", ".picBox", function() {
        $(this).closest(".picBox").find( ".content" ).css( "display", "none");
    });
      


// Pop Up 
$(".picturs").on("click", ".fa-plus-circle",  function () {
    let data = {project: "elevation"}
    let picId = $(this).closest(".picBox").attr("id")
    console.log(picId);
    renderer.renderPopup(data)

})



$(".popUp").on("click", ".close",  function () {
    renderer.removePopup()
})


$(".popUp").on("click", ".creatPro",  function () {
    $(".popUp-input").append("<div class='inputpop'><input type='text'><button>click</button></div>");
})