
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
    $(".projectName").empty()
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

 });


$(".pictures").on("click", ".fa-trash-alt",  async function () {
    let projectName = $(this).closest(".projectAlbum").text()
    await picmanager.removeProject(projectName)
    let projectsNames = await picmanager.getProjectName()
    renderer.renderPName(projectsNames)

})


 //delete from DB
 $(".picturs").on("click", ".remove",  async function () {
    let picId = $(this).closest(".picBox").attr("id")
    let projectName = $(this).closest("#container").find(".Pname").text()
    await picmanager.removePic(picId, projectName)
    let pictures = await picmanager.getProjectPics(projectName)
    renderer.renderProject(pictures)

})



$(".favorite").on("click", async function () {
    $(".projectName").empty()
    let projectsNames = await picmanager.getProjectName()
    renderer.renderPName(projectsNames)
})


$(".picturs").on("click", ".projectAlbum", async function () {
    let projectName = $(this).closest(".projectAlbum").text()
    let pictures = await picmanager.getProjectPics(projectName)
    renderer.renderProject(pictures)
    if (pictures.length == 0) {
        $(".picturs").prepend(`<span class="PnameEmpty"></span><span class="PnameEmpty">${projectName} project folder is empty</span>`)
    }
    $(".projectName").prepend(`<span class="Pname">${projectName}</span>`)
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



