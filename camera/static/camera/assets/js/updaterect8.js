const order_id = JSON.parse(document.getElementById('order_id').textContent); 
const photos = JSON.parse(document.getElementById('photos').textContent); 
e= document.getElementById('listphotos')
var url1 = "https://pixy.ma/api/createphoto/";
const imgcontainer = document.getElementById("imgcontainer");
const csrf = document.getElementsByName("csrfmiddlewaretoken");
var num_input = 0;


window.addEventListener("DOMContentLoaded", function () {
  if (Object.keys(cart).includes(order_id.toString())){
    $('#uploadimageModal').modal('show')  
  for(let i = 0; i < photos.length ; i++) {
    $(`#imgcropped_${i+1}`).attr('src',photos[i]['image']); 
    $(`#imgcropped_${i+1}`).attr('data-id',photos[i]['id']);  
    $(`#input_${i+1}`).attr("disabled", true)
    document.getElementById(`btngrp_${i+1}`).innerHTML = `<button class="btn btn1" name="delete" class="btn btn-sm btn-outline-secondary shadow-lg" onclick="deleteimage(${i+1})"><i class="fas fa-trash-alt fa-2x"></i></button>`;
    addinput()
  }

  $('#uploadimageModal').modal('hide')     
}
else{  
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


}

function addinput(){
  num_input += 1
  if(num_input == 8){
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
    if (num_input == 8) {
      var listphoto=''
      $('#uploadModal').modal('show')
      for (let i = 1; i < 9; i++) {
        var id=parseInt(document.getElementById(`imgcropped_${i}`).getAttribute('data-id'))
        listphoto += `${id}/`
      }
      var url2=`https://pixy.ma/api/${order_id}/updatecommande/`
            fetch(url2, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken':csrf[0].value,
            },
            body:JSON.stringify({ 
            "listphoto":listphoto,
          })
          }
          ).then((resp) => resp.json())
          .then(function(data){           
            $('#uploadModal').modal('hide')
            $('#addModal').modal('show')
          })
  
    }else(
      alert('Complétez 8 photos pour continuer !')
    )
  }