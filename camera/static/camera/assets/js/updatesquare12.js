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
    imagebox=document.getElementById(`imagebox_${i+1}`)
    imagebox.innerHTML = `<img src="${photos[i]['image']}" id='image_${i+1}' data-id='${photos[i]['id']}' data-crop='${photos[i]['datacrop']}' class="imgsrc img-fluid" alt="Responsive image">`;
    displayImage(i+1)
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

function displayImage(p){
  $(`#input_${p}`).attr("disabled", true)
  var croppedImage = document.getElementById(`imgcropped_${p}`);
  var image = document.getElementById(`image_${p}`);
  var $image = $(`#image_${p}`);
  var datacrop= JSON.parse(image.getAttribute('data-crop'))
  $image.cropper({
    aspectRatio: 9 / 9,
    cropBoxResizable: false,
    ready: function () {
      //Should set crop box data first here
      cropper.setData(datacrop)
    },
    crop: function (event) {
      const canvas = this.cropper.getCroppedCanvas(); 
      var resizedCanvas = document.createElement("canvas");
      var resizedContext = resizedCanvas.getContext("2d");              
      resizedCanvas.height = "1024";
      resizedCanvas.width = "1024";              
      resizedContext.drawImage(canvas, 0, 0, 1024, 1024);
      croppedImage.src = resizedCanvas.toDataURL("image/png");          
    },
  });

  var cropper = $image.data("cropper");
    var btngrp = document.getElementById(`btngrp_${p}`);
    btngrp.innerHTML = `
      <button class="btn btn1" name="edit" class="btn btn-sm btn-outline-secondary shadow-lg" data-id='${p}'
      data-target="#modal" data-toggle="modal" onclick="showmodal(${p})"><i class="fas fa-crop-alt fa-2x"></i></button>

      <button class="btn btn2" name="delete" class="btn btn-sm btn-outline-secondary shadow-lg" onclick="deleteimage(${p})"><i class="fas fa-trash-alt fa-2x"></i></button>`;
      

}

function showmodal(p) {

  var src = $(`#image_${p}`).attr("src");
  imgcontainer.innerHTML =
    '<img id="modalimage" src="" class="img-fluid">';
  editImage(p, src);
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
  if(num_input == 12){
    $('#confirm_btn').removeClass('disabled')
  }
}

function cropImage(p){
  var croppedImage = document.getElementById(`imgcropped_${p}`);
  var image = document.getElementById(`image_${p}`);
  var $image = $(`#image_${p}`);
  $image.cropper({
    aspectRatio: 9 / 9,
    cropBoxResizable: false,
    crop: function (event) {
      const canvas = this.cropper.getCroppedCanvas(); 
      var resizedCanvas = document.createElement("canvas");
      var resizedContext = resizedCanvas.getContext("2d");              
      resizedCanvas.height = "1024";
      resizedCanvas.width = "1024";              
      resizedContext.drawImage(canvas, 0, 0, 1024, 1024);
      croppedImage.src = resizedCanvas.toDataURL("image/png");    
      $('#uploadimageModal').modal('hide')
      image.setAttribute(
        "data-cropdata",
        JSON.stringify(cropper.getCropBoxData())
      );
      image.setAttribute(
        "data-canvasdata",
        JSON.stringify(cropper.getCanvasData())
      );
      image.setAttribute(
        "data-crop",
        JSON.stringify(cropper.getData())
      );      
    },
  });

  var cropper = $image.data("cropper");
    var btngrp = document.getElementById(`btngrp_${p}`);
    btngrp.innerHTML = `
      <button class="btn btn1" name="edit" class="btn btn-sm btn-outline-secondary shadow-lg" data-id='${p}'
      data-target="#modal" data-toggle="modal" onclick="showmodal(${p})"><i class="fas fa-crop-alt fa-2x"></i></button>

      <button class="btn btn2" name="delete" class="btn btn-sm btn-outline-secondary shadow-lg" onclick="deleteimage(${p})"><i class="fas fa-trash-alt fa-2x"></i></button>`;
      

}


function editImage(p, src) {
  var imgcontainer = document.getElementById("imgcontainer");
  var image = document.getElementById("imagemodal");
  var cropBoxData;
  var canvasData;
  var cropper;
  var croppedImage = document.getElementById(`imgcropped_${p}`);
  myimage=document.getElementById(`image_${p}`)
  $("#modalimage").attr("src", src);
  var $image = $("#modalimage");
  $("#modal")
    .on("shown.bs.modal", function () {
      $image.cropper({
        aspectRatio: 9 / 9,
        cropBoxResizable: false,
        viewMode: 1,
        center: true,
        dragMode: "move",
        movable: true,
        scalable: true,
        guides: true,
        zoomOnWheel: true,
        cropBoxMovable: true,
        wheelZoomRatio: 0.1,
        ready: function () {
          //Should set crop box data first here
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        },
        cropend: function (event) {
          const canvas = this.cropper.getCroppedCanvas(); 
          var resizedCanvas = document.createElement("canvas");
          var resizedContext = resizedCanvas.getContext("2d");              
          resizedCanvas.height = "1024";
          resizedCanvas.width = "1024";              
          resizedContext.drawImage(canvas, 0, 0, 1024, 1024);
          croppedImage.src = resizedCanvas.toDataURL("image/png");            
          myimage.setAttribute(
                "data-crop",
                JSON.stringify(cropper.getData())
          );           
        },
      });
      var cropper = $image.data("cropper");
    })
    .on("hidden.bs.modal", function () {
      imgcontainer.innerHTML = "";
    });
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
          imagebox=document.getElementById(`imagebox_${p}`)
          imagebox.innerHTML = `<img src="${response['image']}" id="image_${p}" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
          cropImage(p)
      },
    });
  }
  reader.readAsDataURL(img_data);
} 
}

}


function confirm() {
  if (num_input == 12) {
    var listphoto=''
    $('#uploadModal').modal('show')
    for (let i = 1; i < 13; i++) {
      var id=parseInt(document.getElementById(`image_${i}`).getAttribute('data-id'))
      listphoto += `${id}/`
      const fd = new FormData();
      fd.append("csrfmiddlewaretoken", csrf[0].value);
      fd.append("datacrop", document.getElementById(`image_${i}`).getAttribute('data-crop'));
      $.ajax({
        type: "POST",
        url: `https://pixy.ma/api/${id}/updatephoto/`,
        enctype: "multipart/form-data",
        data: fd,
        success: function (response) {
        },        
        cache: false,
        contentType: false,
        processData: false,
      });
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
    alert('Complétez 12 photos pour continuer !')
  )
}
