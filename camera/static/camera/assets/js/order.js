
const order_id = JSON.parse(document.getElementById('order_id').textContent); 
const prix = JSON.parse(document.getElementById('prix').textContent); 
const csrf = document.getElementsByName("csrfmiddlewaretoken");
window.addEventListener("DOMContentLoaded", function () {
  $('#addModal').modal('show')
  total= parseInt(prix) + 40
  document.getElementById('total').innerHTML=`${total.toFixed(2)} DH`

})
function confirm(){
  var nom = document.getElementById('input_nom').value
  if (nom == ''){
    document.getElementById('validate_nom').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Veuillez renseigner votre nom et prénom</p>`
    return false;
  }else{
    document.getElementById('validate_nom').innerHTML=''
   
  }
  var tel = document.getElementById('input_tel').value
  if (tel == ''){
    document.getElementById('validate_tel').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Veuillez renseigner votre numéro de téléphone</p>`
    return false;
  }else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(tel) == false){
    document.getElementById('validate_tel').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Format incorrect du numéro de téléphone</p>`
    return;
  }else{
    document.getElementById('validate_tel').innerHTML=''
  

  }
  var ville = document.getElementById('input_ville').value
  if (ville == ''){
    document.getElementById('validate_ville').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Veuillez renseigner votre ville</p>`
    return false;
  }else{
    document.getElementById('validate_ville').innerHTML=''
  
  }
  var adresse = document.getElementById('input_adresse').value
  if (adresse == ''){
    document.getElementById('validate_adresse').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Veuillez renseigner votre adresse</p>`
    return false;
  }else{
    document.getElementById('validate_adresse').innerHTML=''

  }
  var url=`https://pixy.ma/api/${order_id}/updatecommande/`
        fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrf[0].value,
        },
        body:JSON.stringify({'nom':nom,'tel':tel,'ville':ville,'adresse':adresse,'complete':true})
      }
      ).then(function(response){       
        $('#finiModal').modal('show')
      })
}
