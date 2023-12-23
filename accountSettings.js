// r__upload_input
$(".r__upload_label").attr("for", "r__upload_input");
$(".r__upload_input").attr("type", "file");
$(".r__upload_input").attr("accept", "image/*");
$('.r__upload_input').hide();

const chooseFile = document.getElementById("r__upload_input");
const imgPreview = document.querySelector('.r__upload_img_prev');
let imgValue;



$('.r__upload_input').change(function(e) {
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

        let width = this.result.naturalWidth;
        let height = this.result.naturalHeight;

        if(width == height && width >= 64){
            console.log("chalega")
        }else{
            console.log("nai chalega")
        }
        // imgPreview.style.display = "block";
        // imgPreview.innerHTML = '<img src="' + this.result + '" />';
        $(".r__upload_img_prev").attr("src", this.result);
        $(".r__upload_img_prev").attr("srcset", "");
        imgValue = this.result;
      });    
    }
  }


  console.log(imgValue);