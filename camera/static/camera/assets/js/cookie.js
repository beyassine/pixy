function getCookie(name){
    // Split cookie string and get all individual name=value pairs in array
    var cookieArr = document.cookie.split(";");

    // Loop through thr array elements
    for(var i = 0; i < cookieArr.length; i++){
      var cookiePair = cookieArr[i].split("=");

      /* Remmoving whitespace at the beginning of the cookie name and compare it with the given string */
      if(name == cookiePair[0].trim()){
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;

  }

  var cart=JSON.parse(getCookie('cart'))      
  

  if(cart == undefined){
    cart={}            
    document.cookie = 'cart=' + JSON.stringify(cart) + `;domain=;path=/` 
  }    

  function addCookieItem(id,qte,prix,typec){

    cart[id] = {'quantite' : qte , 'prix' : prix ,'typec':typec}

    document.cookie = 'cart=' + JSON.stringify(cart) + `;domain=;path=/` 
  }
