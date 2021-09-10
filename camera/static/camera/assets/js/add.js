
  const order_id = JSON.parse(document.getElementById('order_id').textContent); 
  const nbre = JSON.parse(document.getElementById('nbre').textContent); 
  const prix = JSON.parse(document.getElementById('prix').textContent); 
  const imgcontainer = document.getElementById("imgcontainer");
  const csrf = document.getElementsByName("csrfmiddlewaretoken");
  var num_input = 0;

  window.addEventListener("DOMContentLoaded", function () {
    var input_1 = document.getElementById("input_1");
    input_1.addEventListener("change", function () {                  
      img_data = input_1.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_1.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }        
        url = URL.createObjectURL(img_data);
        uploadImage(1, url);
      }      
    });

    var input_2 = document.getElementById("input_2");
    input_2.addEventListener("change", function () {      
      img_data = input_2.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_2.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }        
        url = URL.createObjectURL(img_data);
        uploadImage(2, url);
      } 
    });

    var input_3 = document.getElementById("input_3");
    input_3.addEventListener("change", function () {      
      img_data = input_3.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_3.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }      
        url = URL.createObjectURL(img_data);
        uploadImage(3, url);
      } 
    });

    var input_4 = document.getElementById("input_4");
    input_4.addEventListener("change", function () {      
      img_data = input_4.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_4.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }        
        url = URL.createObjectURL(img_data);
        uploadImage(4, url);
      } 
    });

    var input_5 = document.getElementById("input_5");
    input_5.addEventListener("change", function () {           
      img_data = input_5.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_5.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }
        url = URL.createObjectURL(img_data);
        uploadImage(5, url);
        } 
    });

    var input_6 = document.getElementById("input_6");
    input_6.addEventListener("change", function () {      
      img_data = input_6.files[0];
      if (img_data.size > 5242880){
        alert('Fichier Trop Volumineux !')
        input_6.value=null
      }else{
        if (!$(this).hasClass("changed")) {
          addinput()
        $(this).addClass("changed");
        }        
        url = URL.createObjectURL(img_data);
        uploadImage(6, url);
      } 
    });
  });

  function addinput(){
    num_input += 1
    if(num_input == 6){
      $('#confirm_btn').removeClass('disabled')

    }
  }

  
  function showmodal(p) {
    var src = $(`#image_${p}`).attr("src");
    imgcontainer.innerHTML =
      '<img id="modalimage" src="" alt="Picture" style="max-width: 100%">';
    editImage(p, src);
  }

  function uploadImage(p, url) {
    var imagebox = document.getElementById(`imagebox_${p}`);
    var croppedImage = document.getElementById(`imgcropped_${p}`);
    imagebox.innerHTML = `<img src="${url}" id="image_${p}"  class="imgsrc img-fluid" alt="Responsive image">`;
    var image = document.getElementById(`image_${p}`);
    var $image = $(`#image_${p}`);
    $image.cropper({
      aspectRatio: 9 / 9,
      cropBoxResizable: false,
      crop: function (event) {
        const canvas = this.cropper.getCroppedCanvas();
        croppedImage.src = canvas.toDataURL("image/png");
        image.setAttribute(
          "data-cropdata",
          JSON.stringify(cropper.getCropBoxData())
        );
        image.setAttribute(
          "data-canvasdata",
          JSON.stringify(cropper.getCanvasData())
        );
      },
    });
    var cropper = $image.data("cropper");
    var btngrp = document.getElementById(`btngrp_${p}`);
    btngrp.innerHTML = `<button class="btn btn1" name="edit" class="btn btn-sm btn-outline-secondary shadow-lg" data-id='${p}'
      data-target="#modal" data-toggle="modal" onclick="showmodal(${p})"><i class="fas fa-crop-alt fa-2x"></i></button>`;
  }

  function editImage(p, src) {
    var imgcontainer = document.getElementById("imgcontainer");
    var image = document.getElementById("imagemodal");
    var cropBoxData;
    var canvasData;
    var cropper;
    var croppedImage = document.getElementById(`imgcropped_${p}`);
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
          crop: function (event) {
            const canvas = this.cropper.getCroppedCanvas();
            croppedImage.src = canvas.toDataURL("image/png");
          },
        });
        var cropper = $image.data("cropper");
      })
      .on("hidden.bs.modal", function () {
        imgcontainer.innerHTML = "";
      });
  }

  function confirm() {
    if (num_input == 6) { 
        
            fd = new FormData();
            for (let i = 1; i < 7; i++) {
              const fd = new FormData();
              fd.append("csrfmiddlewaretoken", csrf[0].value);
              fd.append("commande", order_id);
              fd.append("image", $(`#imgcropped_${i}`).attr("src"));
              $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/api/createphoto/",
                enctype: "multipart/form-data",
                data: fd,
                success: function (response) {
                  if ( i == 6){
                    nbrep=parseInt(nbre)+6
                    prixp=parseInt(prix)+40
                      var url=`http://127.0.0.1:8000/api/${order_id}/updatecommande/`
                        fetch(url, {
                        method:'POST',
                        headers:{
                          'Content-type':'application/json',
                          'X-CSRFToken':csrf[0].value,
                        },
                        body:JSON.stringify({'nbre':nbrep,'prix':prixp})
                      }
                      ).then(function(response){     
                        window.location.href=`http://127.0.0.1:8000/${order_id}/commande/`  
                      })
                    
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
              });
            }      
    }else(
      alert('Complétez 6 photos pour passer la commande !')
    )
  }
