const p= document.getElementById('produit')
const csrf = document.getElementsByName("csrfmiddlewaretoken");
var listcommande=''
var total=0

function construct(cart){
    p.innerHTML=``
    total=0
    if (Object.keys(cart).length == 0){
        if ($('#details').hasClass("hidden")) {
            $('#details').removeClass('hidden')
            $('#contact').addClass('hidden')        
        }     
         
    }else{
        if ($('#contact').hasClass("hidden")) {
            $('#contact').removeClass('hidden')
            $('#details').addClass('hidden')        
        }     
        for (var key of Object.keys(cart)) {  
            listcommande += `${key}/`
            td1=document.createElement('td')
            td1.setAttribute('style','width: 56%')
            td1.innerHTML=cart[key]['quantite'] + ' ' + cart[key]['typec']
    
            td2=document.createElement('td')
            td2.setAttribute('style','width: 40%')
            td2.innerHTML=cart[key]['prix'] + ' DH'
    
            td3=document.createElement('td')
            td3.setAttribute('style','width: 2%')
            a=document.createElement('a')
            if(cart[key]['typec'] == 'Photos Carrees (5cm x 5cm)'){
              url=`https://pixy.ma/carre/modifier?order_id=${key}&nbre=${cart[key]['quantite']}`
            }else{
              url=`https://pixy.ma/rect/modifier?order_id=${key}&nbre=${cart[key]['quantite']}`
            }
            
            a.setAttribute('href',url)
            a.innerHTML=`<i class='bx bx-edit text-info'></i>`
            td3.appendChild(a)

            td4=document.createElement('td')
            td4.setAttribute('style','width: 2%')
            td4.addEventListener("click",show.bind(this,key))
            td4.innerHTML=`<i class='bx bx-trash text-info'></i>`
    
            tr = document.createElement('tr')
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)   
            tr.appendChild(td4)        
    
            p.appendChild(tr)
    
            total+= parseInt(cart[key]['prix'])
          
        }
            document.getElementById('total_produit').innerHTML=`${total.toFixed(2)}`
    
    
    }

}

window.addEventListener("DOMContentLoaded", function () {
    construct(cart)
})

function edit(p){
    delete cart[p]
    construct(cart)
    $('#editModal').modal('hide')
    document.cookie = 'cart=' + JSON.stringify(cart) + `;domain=;path=/` 

}

function show(p){
    document.getElementById('deletebtn').addEventListener("click",edit.bind(this,p))
    $('#editModal').modal('show')
    
}

function confirm(){
    var nom = document.getElementById('input_nom').value
    if (nom == ''){
      document.getElementById('validate_nom').innerHTML=`<p class='text-xs font-weight-bold text-danger text-uppercase '> Veuillez renseigner votre nom et prénom</p>`
      return false;
    }else{
      document.getElementById('validate_nom').innerHTML=''
     
    }
    var tel = document.getElementById('input_tel').value
    var tel=tel.replace(/ /g,'')
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
    var url=`https://pixy.ma/api/createpanier/`
          fetch(url, {
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrf[0].value,
          },
          body:JSON.stringify({'listcommande':listcommande,'nom':nom,'tel':tel,'ville':ville,'adresse':adresse,'prix':total,'complete':true})
        }
        ).then(function(response){       
          cart={}            
          document.cookie = 'cart=' + JSON.stringify(cart) + `;domain=;path=/` 
          $('#finiModal').modal('show')
        })
  }
  