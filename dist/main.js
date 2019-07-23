const renderer = new Render
const picManager = new PicManager


// add picturs from the input val
let searchPic = async function (keyword) {
  await picManager.getPics(keyword)
  renderer.renderData(picManager.unsplashPics, picManager.pexelsPics, picManager.pixabayPics)
}

// input click 
$(".searchButton").on("click", async function () {
  let keyword = $(".input").val();
  await searchPic(keyword)
  $(".input").val('')
})

// save click
$(".picturs").on("click", ".save", function () {
  let picId = $(this).closest(".picBox").find("#id").attr()
  picManager.savePic(picId)
})

// click delete from DB
$(".picturs").on("click", ".remove", function () {
  let picId = $(this).closest(".picBox").find("#id").attr()
  tempmanager.removePic(picId)
})

//
$(".favorite").on("click", function () {
  tempmanager.getPicsFromDB()
  renderer.renderDB(tempmanager.savedPics)
})


//click with enter
var input = document.getElementById("myInput")
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    document.getElementById("myBtn").click()
  }
});
