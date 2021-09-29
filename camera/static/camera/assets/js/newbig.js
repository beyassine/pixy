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
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadModal').modal('show')
        $('#imgcropped_1').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_1.files[0]);
    
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
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadModal').modal('show')
        $('#imgcropped_2').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_2.files[0]);
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
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadModal').modal('show')  
        $('#imgcropped_3').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_3.files[0]);
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
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadModal').modal('show')
        $('#imgcropped_4').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_4.files[0]);
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
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadModal').modal('show')
        $('#imgcropped_5').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_5.files[0]);
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
      var reader = new FileReader();
      reader.onload = function (e) {
      $('#uploadModal').modal('show')
        $('#imgcropped_6').attr('src', e.target.result);      
    }
    reader.onloadend=function(e){
      $('#uploadModal').modal('hide')
    }
    reader.readAsDataURL(input_6.files[0]);
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
    var fd1={
      "csrfmiddlewaretoken": csrf[0].value,
        "typec":'Photos Grand Format (15cm x 10cm)',
        'nbre':6,
        'prix':120,
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
                  addCookieItem(id,6,120,'Photos Grand Format (15cm x 10cm)')
                  window.location.href=`https://pixy.ma/${id}/ajouter/`
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
