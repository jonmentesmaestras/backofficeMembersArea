const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const autCode = urlParams.get("id");
const urlForgot = "http://localhost:3000/changePassword?id=" + autCode
async function assignPassword() {
    fetch(urlForgot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({
            key: document.getElementById('input-key').value
        })
    })
        .then(response =>
            response.json().then(data => ({
                    dataServer: data,
                    status: response.status
                })
            ).then(res => {
                dataProcessResponse(res.status, res.dataServer)
            }))
        .catch(response => dataProcessResponse(response.status, response))
}

function dataProcessResponse(status, data) {
    console.log("data " + data.message)
    console.log("status " + status)
    let labelMsg = document.getElementById('result-msg');
    
    labelMsg.innerHTML = data.message;
    
    
    
}

function comparePasswords() {
    // Get the values of the two input fields.
    var newPassword = document.getElementById('input-key').value;
    var repeatPassword = document.getElementById('repeat-password').value;
  
    // Compare the two values.
  
    
  if (newPassword !== repeatPassword) {
      // Display an error message.
      alert('Las dos claves no coinciden. Intenta nuevamente');
  
      // Clear the values of the two input fields.
  
      
  document.getElementById('input-key').value = '';
      document.getElementById('repeat-password').value = '';
    } else{
        //las dos claves coinciden
        assignPassword()
    }
  }