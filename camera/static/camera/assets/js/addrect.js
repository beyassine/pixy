const imgcontainer = document.getElementById("imgcontainer");
const csrf = document.getElementsByName("csrfmiddlewaretoken");
var num_input = 0;
var url1 = "https://pixy.ma/api/createphoto/";

window.addEventListener("DOMContentLoaded", function () {
  console.log(cart)
  if (Object.keys(cart).length == 0){
    $('#errorModal').modal('show')     
}
});


/* return null if invalid or base64String if valid */
function isImageSizeValid(image){
  var startIndex = image.indexOf("base64,") + 7;
  var base64str = image.substr(startIndex);
  var decoded = atob(base64str);
  if(decoded.length>=10485760){
    return null
  }
  return base64str
}


function deleteimage(p){
  $(`#input_${p}`).attr("disabled", false) 
  num_input -= 1
  document.getElementById(`btngrp_${p}`).innerHTML=''
  document.getElementById(`imgcropped_${p}`).setAttribute('src','/static/camera/assets/img/void.png')
  document.getElementById(`input_${p}`).value=''
  document.getElementById(`imagebox_${p}`).innerHTML=''


}

function addinput(){
  num_input += 1
  if(num_input == 4){
    $('#confirm_btn').removeClass('disabled')
  }
}

function uploadImage(p){
  var input=document.getElementById(`input_${p}`)

  if (input.files && input.files[0]) {   
    img_data = input.files[0];
    if (img_data.size >10485760){
      input.value=null
      $('#bigsizeModal').modal('show')
    }else{
    $('#uploadimageModal').modal('show')
    $(`#input_${p}`).attr("disabled", true)    
  var reader = new FileReader();
  reader.onload = function (readerEvent) {
    base64ImageString=isImageSizeValid(reader.result);
    var requestData = {
      "csrfmiddlewaretoken":csrf[0].value,
      "image": base64ImageString,
      "origin": base64ImageString,
      'datacrop':'',
    }
    $.ajax({
      type: 'POST',
      dataType: "json",
      url:url1,
      data: requestData,
      success: function(response) {
        addinput()
        $(`#imgcropped_${p}`).attr('src', response['image']); 
        $(`#imgcropped_${p}`).attr('data-id', response['id']); 
        document.getElementById(`btngrp_${p}`).innerHTML = `<button class="btn btn1" name="delete" class="btn btn-sm btn-outline-secondary shadow-lg" onclick="deleteimage(${p})"><i class="fas fa-trash-alt fa-2x"></i></button>`;
        $('#uploadimageModal').modal('hide')
      },
    });
  }
  reader.readAsDataURL(img_data);
} 
}

}

function confirm() {
  if (num_input == 4) {
    var listphoto=''
    $('#uploadModal').modal('show')
    for (let i = 1; i < 5; i++) {
      var id=parseInt(document.getElementById(`imgcropped_${i}`).getAttribute('data-id'))
      listphoto += `${id}/`
    }
    var fd1={
      "csrfmiddlewaretoken": csrf[0].value,
      "listphoto":listphoto,
      "typec":'Photos Rectangles (10cm x 7cm)',
      'nbre':8,
      'prix':120,
    }

    var url2=`https://pixy.ma/api/createcommande/`
          fetch(url2, {
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrf[0].value,
          },
          body:JSON.stringify({ 
          "listphoto":listphoto,
          "typec":'Photos Rectangles (10cm x 7cm)',
          'nbre':4,
          'prix':40,
        })
        }
        ).then((resp) => resp.json())
        .then(function(data){  
          var id1 = data['id']
          console.log(id1)
          addCookieItem(id1,4,40,'Photos Rectangles (10cm x 7cm)')
          document.getElementById('btnredirect').setAttribute('href',`https://pixy.ma/rect/ajouter/`)
          $('#uploadModal').modal('hide')
          $('#addModal').modal('show')
        })

  }else(
    alert('Complétez 4 photos pour continuer !')
  )
}
