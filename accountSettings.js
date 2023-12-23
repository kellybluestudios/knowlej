Webflow.push(function () {
  // Disable submitting form fields during development
  $('form').submit(function () {
    // console.log('Form submissions have been disabled during development.');
    return false;
  });
});



// r__upload_input
$(".r__upload_label").attr("for", "r__upload_input");
$(".r__upload_input").attr("type", "file");
$(".r__upload_input").attr("accept", "image/*");
$('.r__upload_input').hide();

const chooseFile = document.getElementById("r__upload_input");
const imgPreview = document.querySelector('.r__upload_img_prev');
let imgValue;



$('.r__upload_input').change(function (e) {
  console.log("change working");
  // value = e.target.value;
  // console.log(value);
  // $(".r__upload_img_prev").attr("src", value);
  // $(".r__upload_img_prev").attr("srcset", "");
  getImgData();
})

function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgValue = this.result;

      // imgPreview.style.display = "block";
      // imgPreview.innerHTML = '<img src="' + this.result + '" />';
      $(".r__upload_img_prev").attr("src", this.result);
      $(".r__upload_img_prev").attr("srcset", "");

      let width = $(".r__upload_img_prev").prop("naturalWidth");
      let height = $(".r__upload_img_prev").prop("naturalHeight");
      console.log(width)
      console.log(height)
      console.log(imgValue);

      if (width == height && width >= 100) {
        console.log("chalega")
      } else {
        console.log("nai chalega")
      }

    });
  }
}


console.log(imgValue);
let user = JSON.parse(localStorage.getItem('user'));

console.log(user.id);

$("#profile_update_form").submit(function (e) {
  e.preventDefault();
  console.log("submit happens")

  var form = new FormData();
  form.append("id", user.id);
  form.append("name", "Rezak Ali");
  // form.append("user_img", $('.r__upload_input')[0].files[0]);
  form.append("bio", $(".r_user_bio_input").val());
  // form.append("phone", "912432398");
  // form.append("user_role", "Teacher");
  form.append("location", $(".r_user_location_input").val());
  // form.append("website", "https://www.bestrandoms.com/random-los%20angeles-address");

  var settings = {
    "url": "https://dev.k12hosting.io/api/profile",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    },
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });








})