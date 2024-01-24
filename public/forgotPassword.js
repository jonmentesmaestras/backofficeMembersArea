const urlForgot = "http://localhost:3000/forgotPassword"
async function forgotPassword() {

    fetch(urlForgot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({
            email: document.getElementById('input-email').value
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
    let labelMsg = document.getElementById('link-msg');
    if (status !== 200) {
        // controlar error
        labelMsg.innerHTML = data.message;
    } else {
        labelMsg.innerHTML = data.data;
    }
}