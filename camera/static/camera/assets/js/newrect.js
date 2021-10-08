const imgcontainer = document.getElementById("imgcontainer");
const csrf = document.getElementsByName("csrfmiddlewaretoken");
var num_input = 0;

window.addEventListener("DOMContentLoaded", function () {
  var input_1 = document.getElementById("input_1");
  input_1.addEventListener("change", function () { 
    if (input_1.files && input_1.files[0]) {   

    img_data = input_1.files[0];

    if (img_data.size > 5242880){
      alert('Fichier Trop Volumineux !')
      input_1.value=null
    }else{
      if (!$(this).hasClass("changed")) {
        addinput()
      $(this).addClass("changed");
      }
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
                  if (width > height) {
                    height *= max_size / width;
                    width = max_size;
                  } else {
                    width *= max_size / height;
                    height = max_size;
                  }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_1').attr('width', width);    
              $('#imgcropped_1').attr('height', height);    
              $('#imgcropped_1').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
    }  

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
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
                  if (width > height) {
                    height *= max_size / width;
                    width = max_size;
                  } else {
                    width *= max_size / height;
                    height = max_size;
                  }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_2').attr('width', width);    
              $('#imgcropped_2').attr('height', height);    
              $('#imgcropped_2').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
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
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
                  if (width > height) {
                    height *= max_size / width;
                    width = max_size;
                  } else {
                    width *= max_size / height;
                    height = max_size;
                  }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_3').attr('width', width);    
              $('#imgcropped_3').attr('height', height);    
              $('#imgcropped_3').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
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
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
                  if (width > height) {
                    height *= max_size / width;
                    width = max_size;
                  } else {
                    width *= max_size / height;
                    height = max_size;
                  }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_4').attr('width', width);    
              $('#imgcropped_4').attr('height', height);    
              $('#imgcropped_4').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
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
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
                  if (width > height) {
                    height *= max_size / width;
                    width = max_size;
                  } else {
                    width *= max_size / height;
                    height = max_size;
                  }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_5').attr('width', width);    
              $('#imgcropped_5').attr('height', height);    
              $('#imgcropped_5').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
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
      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
          var image = new Image();
          image.onload = function (imageEvent) {
              // Resize the image
              var canvas = document.createElement('canvas'),
                  max_size = 700,// TODO : pull max size from a site config
                  width = image.width,
                  height = image.height;
              if (width > height) {
                height *= max_size / width;
                width = max_size;
              } else {
                width *= max_size / height;
                height = max_size;
              }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d').drawImage(image, 0, 0, width, height);
              var dataUrl = canvas.toDataURL('image/jpeg');
              $('#imgcropped_6').attr('width', width);    
              $('#imgcropped_6').attr('height', height);    
              $('#imgcropped_6').attr('src', dataUrl);      

          }
          image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(img_data);
    }    
  });
});


function addinput(){
  num_input += 1
  if(num_input == 6){
    $('#confirm_btn').removeClass('disabled')

  }
}

function uploadImage(img){



}

function confirm() {
  if (num_input == 6) {
    var fd1={
      "csrfmiddlewaretoken": csrf[0].value,
        "typec":'Photos Réctangles (10cm x 7cm)',
        'nbre':6,
        'prix':90,
    }
    $('#uploadModal').modal('show')
    $.ajax({
        type: "POST",
        url: "https://pixy.ma/api/createcommande/",
        enctype: "multipart/form-data",
        data: fd1,
        success: function (response) {
          var id = response['id']
          fd = new FormData();
          for (let i = 1; i < 7; i++) {
            const fd = new FormData();
            fd.append("csrfmiddlewaretoken", csrf[0].value);
            fd.append("commande", id);
            fd.append("image", $(`#imgcropped_${i}`).attr("src"));
            $.ajax({
              type: "POST",
              url: "https://pixy.ma/api/createphoto/",
              enctype: "multipart/form-data",
              data: fd,
              success: function (response) {
                if ( i == 6){
                  addCookieItem(id,6,90,'Photos Rectangles (10cm x 7cm)')
                  document.getElementById('btnredirect').setAttribute('href',`https://pixy.ma/${id}/ajouterrect/`)
                  $('#uploadModal').modal('hide')
                  $('#addModal').modal('show')
                  }
              },
              cache: false,
              contentType: false,
              processData: false,
            });
          }
        }
    })      
  }else(
    alert('Complétez 6 photos pour continuer !')
  )
}
