
const renderer = new Render
const picmanager = new PicManager

let picId 


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

// save input pop up 
$(".popUp").on("click", ".saveProject", async function () {
    let projectName = $(".inputpopup").val();
    $(".inputpopup").val('')
    await picmanager.savePic(picId, projectName)
    let namesArr = await picmanager.getProjectName()
    renderer.renderPopup(namesArr)
    $(".inputpop").remove()
    // $("popUp-input").empty()

 });

//  $(".popUp").on("click", ".saveProject", async function () {
//     let projectName =$(".inputpopup").val();
//     console.log(projectName)
//     if(!projectName){
//         $(".inputpopup").val('')
//     alert("must enter somthing")
//     }
//     else{
//     $(".inputpopup").val('')
//     await picmanager.savePic(picId, projectName)
//     let namesArr = await picmanager.getProjectName()
//     renderer.renderPopup(namesArr)
//     }
//    });











 //clivc delete from DB
 $(".picturs").on("click", ".remove",  function () {
    let picId = $(this).closest(".picBox").attr("id")
    picmanager.removePic(picId)

})



$(".favorite").on("click", async function () {
    let projectsNames = await picmanager.getProjectName()
    renderer.renderPName(projectsNames)
})


$(".picturs").on("click", ".projectAlbum", async function () {
    let projectName = $(this).closest(".projectAlbum").text()
    let pictures = await picmanager.getProjectPics(projectName)
    renderer.renderProject(pictures)
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
      


// click on the + and show Pop Up 
$(".picturs").on("click", ".fa-plus-circle", async function () {
    picId = $(this).closest(".picBox").attr("id")
    let namesArr = await picmanager.getProjectName()
    renderer.renderPopup(namesArr)

})



$(".popUp").on("click", ".close",  function () {
    renderer.removePopup()
})


$(".popUp").on("click", ".creatPro",  function () {
    $(".inputpop").remove()
    $(".popUp-input").empty()
    $(".popUp-input").append("<div class='inputpop'><input class='inputpopup' placeholder='Name your project' type='text'><button class='btn saveProject'>Save</button></div>");
})


$(".popUp").on("click", ".project",  function () {
    let projectName = $(this).closest(".project").text()
    picmanager.addToProject( projectName, picId)
 
})



