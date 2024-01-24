const urlIssuesSuggestions = "http://localhost:3000/suggestions"
async function crearIssueSuggestion() {
    fetch(urlIssuesSuggestions, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({
            suggestion: document.getElementById('input-issues-suggestions').value
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
    let labelMsg = document.getElementById('result-msg');
    if (status !== 200) {
        // controlar error
        labelMsg.innerHTML = data.message;
    } else {
        labelMsg.innerHTML = data.message;
    }
}