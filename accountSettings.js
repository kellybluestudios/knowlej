// r__upload_input
$(".r__upload_label").attr("for", "r__upload_input");
$(".r__upload_input").attr("type", "file")
$('.r__upload_input').change(function(e) {
    console.log("change working");
    value = e.target.value;
    console.log(value);
    $(".r__upload_img_prev").attr("src", value);
})