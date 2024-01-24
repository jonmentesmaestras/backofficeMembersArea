const currentUrl = window.location.href;

// Create a URLSearchParams object from the query string
const searchParams = new URLSearchParams(currentUrl.split('?')[1]);

// Get individual parameters

const token = searchParams.get('token');



if(token === "expired"){
    console.log("token is", token)
    const divSessionExpiredMsg = document.getElementById("tokenexpiredmsg")
    divSessionExpiredMsg.style.display = "grid"

}

/*
    This is for the login form
*/
document.querySelector('.mylogin-form').addEventListener('submit', event =>{

    event.preventDefault()
    const email = document.querySelector('#email').value
    const pass = document.querySelector('#password').value
  
    if(email ==="" || pass ===""  ){
      document.getElementById('errorMsg').style.display = "block"
      document.getElementById('greetingMsg').style.display = "none"    
      return
    }
    
    
    if(email && password){
        console.log("the email is " + email)
        console.log("the pwd is " + pass)
        
    } 
    var user_info= {email: email, 
                  pass:pass}

    flip_user_status(user_info)
  
 })


 async function flip_user_status(user_info){
    
    try {
        const response = await fetch('https://nodeapi.tueducaciondigital.site/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${user_info.email}:${user_info.pass}`)
            }
        })
        const res = await response.json();
        


        return await new Promise(resolve => {
            
            
            
            if (res.error) {

                let labelMsg = document.getElementById('result-msg');
                labelMsg.innerHTML = res.msg;
                resolve('fail')
                

            }

            console.log("res token is " + res.token)
            resolve('success')

            if(res.token){
                window.location.href = "https://tueducaciondigital.site/dashboard?token="+res.token;
            }
            

        })
    } catch (err) {
        return console.log("could not get the host " + err)
    }



    

}


