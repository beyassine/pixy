
  const order_id = JSON.parse(document.getElementById('order_id').textContent); 
  const nbre = JSON.parse(document.getElementById('nbre').textContent); 
  const prix = JSON.parse(document.getElementById('prix').textContent); 
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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
      img_data = input_1.files[0];
  
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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
                    max_size = 500,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    console.log('paysage')
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                      console.log('portrait')
                        width *= max_size / height;
                        height = max_size;
                    }
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


  function confirm() {
    if (num_input == 6) { 
            $('#uploadModal').modal('show')
            fd = new FormData();
            for (let i = 1; i < 7; i++) {
              const fd = new FormData();
              fd.append("csrfmiddlewaretoken", csrf[0].value);
              fd.append("commande", order_id);
              fd.append("image", $(`#imgcropped_${i}`).attr("src"));
              $.ajax({
                type: "POST",
                url: "https://pixy.ma/api/createphoto/",
                enctype: "multipart/form-data",
                data: fd,
                success: function (response) {
                  if ( i == 6){
                    nbrep=parseInt(nbre)+6
                    prixp=parseInt(prix)+70
                      var url=`https://pixy.ma/api/${order_id}/updatecommande/`
                        fetch(url, {
                        method:'POST',
                        headers:{
                          'Content-type':'application/json',
                          'X-CSRFToken':csrf[0].value,
                        },
                        body:JSON.stringify({'nbre':nbrep,'prix':prixp})
                      }
                      ).then(function(response){     
                        addCookieItem(order_id,6,70,'Photos Réctangles (10cm x 7cm)')
                        document.getElementById('btnredirect').setAttribute('href',`https://pixy.ma/${order_id}/ajouterrect/`)
                        $('#uploadModal').modal('hide')
                        $('#addModal').modal('show')
                      })
                    
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
              });
            }      
    }else(
      alert('Complétez 6 photos pour continuer !')
    )
  }
