const imgcontainer = document.getElementById("imgcontainer");
const csrf = document.getElementsByName("csrfmiddlewaretoken");
var num_input = 0;


/* return null if invalid or base64String if valid */
function isImageSizeValid(image){
  // console.log(image)
  var startIndex = image.indexOf("base64,") + 7;
  var base64str = image.substr(startIndex);
  var decoded = atob(base64str);
  if(decoded.length>=10485760){
    return null
  }
  return base64str
}


window.addEventListener("DOMContentLoaded", function () {

  var url1 = "https://pixy.ma/api/createphoto/";

  var input_1 = document.getElementById("input_1");
  input_1.addEventListener("change", function () { 
    if (input_1.files && input_1.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_1.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url: url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_1')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_1" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(1)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_2 = document.getElementById("input_2");
  input_2.addEventListener("change", function () { 
    if (input_2.files && input_2.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_2.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_2')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_2" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(2)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_3 = document.getElementById("input_3");
  input_3.addEventListener("change", function () { 
    if (input_3.files && input_3.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_3.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_3')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_3" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(3)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_4 = document.getElementById("input_4");
  input_4.addEventListener("change", function () { 
    if (input_4.files && input_4.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_4.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()  
            imagebox=document.getElementById('imagebox_4')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_4" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(4)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_5 = document.getElementById("input_5");
  input_5.addEventListener("change", function () { 
    if (input_5.files && input_5.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_5.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_5')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_5" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(5)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_6 = document.getElementById("input_6");
  input_6.addEventListener("change", function () { 
    if (input_6.files && input_6.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_6.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_6')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_6" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(6)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_7 = document.getElementById("input_7");
  input_7.addEventListener("change", function () { 
    if (input_7.files && input_7.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_7.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_7')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_7" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(7)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_8 = document.getElementById("input_8");
  input_8.addEventListener("change", function () { 
    if (input_8.files && input_8.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_8.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_8')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_8" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(8)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_9 = document.getElementById("input_9");
  input_9.addEventListener("change", function () { 
    if (input_9.files && input_9.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_9.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_9')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_9" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(9)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_10 = document.getElementById("input_10");
  input_10.addEventListener("change", function () { 
    if (input_10.files && input_10.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_10.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_10')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_10" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(10)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_11 = document.getElementById("input_11");
  input_11.addEventListener("change", function () { 
    if (input_11.files && input_11.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_11.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput()
            imagebox=document.getElementById('imagebox_11')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_11" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(11)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

  var input_12 = document.getElementById("input_12");
  input_12.addEventListener("change", function () { 
    if (input_12.files && input_12.files[0]) {   
      $('#uploadModal').modal('show')

    img_data = input_12.files[0];
    var reader = new FileReader();
    reader.onload = function (readerEvent) {

      base64ImageString=isImageSizeValid(reader.result);
      var requestData = {
				"csrfmiddlewaretoken":csrf[0].value,
				"image": base64ImageString,
        'datacrop':'',
			}

      $.ajax({
				type: 'POST',
				dataType: "json",
				url:url1,
				data: requestData,
				success: function(response) {
            addinput() 
            imagebox=document.getElementById('imagebox_12')
            imagebox.innerHTML = `<img src="${response['image']}" id="image_12" data-id='${response['id']}' class="imgsrc img-fluid" alt="Responsive image">`;
            cropImage(12)
            $('#uploadModal').modal('hide')
				},
			});
    }
    reader.readAsDataURL(img_data);
  } 
  });

});

function showmodal(p) {
  var src = $(`#image_${p}`).attr("src");
  imgcontainer.innerHTML =
    '<img id="modalimage" src="" class="img-fluid">';
  editImage(p, src);
}

function deleteimage(p){
  num_input -= 1
  document.getElementById(`btngrp_${p}`).innerHTML=''
  document.getElementById(`imgcropped_${p}`).setAttribute('src','/static/camera/assets/img/void.png')
  document.getElementById(`input_${p}`).value=''
  document.getElementById(`imagebox_${p}`).innerHTML=''


}

function addinput(){
  num_input += 1
  console.log(num_input)
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
          console.log('updated')
        },        
        cache: false,
        contentType: false,
        processData: false,
      });
    }
    var fd1={
      "csrfmiddlewaretoken": csrf[0].value,
      "listphoto":listphoto,
      "typec":'Photos Carrées (5cm x 5cm)',
      'nbre':12,
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
          "typec":'Photos Carrées (5cm x 5cm)',
          'nbre':12,
          'prix':120,
        })
        }
        ).then(function(response){                 
          var id1 = response['id']
          addCookieItem(id1,12,120,'Photos Carrees (5cm x 5cm)')
          document.getElementById('btnredirect').setAttribute('href',`https://pixy.ma/${id}/ajoutercarre/`)
          $('#uploadModal').modal('hide')
          $('#addModal').modal('show')
        })

  }else(
    alert('Complétez 12 photos pour continuer !')
  )
}
