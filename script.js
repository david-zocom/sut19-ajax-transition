window.addEventListener('load', () => {
    console.log('Page loaded');

    let buttonGetData = document.querySelector('#getData');
    buttonGetData.addEventListener('click', makeApiRequest);
})

async function makeApiRequest() {
    const url = 'https://api.sunrise-sunset.org/json';
    let lat = '57';
    let lng = '11';
    let qs = `${url}?lat=${lat}&lng=${lng}`;
    showStatus('About to make API request with URL=' + qs);

    const response = await fetch(qs);
    const json = await response.json();
    if( json.status === 'OK' ) {
        showStatus('Got response from API');
        let sunrise = json.results.sunrise;
        let sunset  = json.results.sunset;
        outputResult(`The sun rose at ${sunrise} today and will set at ${sunset}.`);
    } else {
        // TODO: not user friendly to show cryptic error messages - change this
        showStatus('API returned error: ' + json.status);
        outputResult(``);
    }
    console.log(json);
}

function showStatus(text) {
    console.log(text);
    let p = document.querySelector('.status');
    p.innerText = text;
}

function outputResult(text) {
    let p = document.querySelector('.answer');
    p.innerText = text;
}
