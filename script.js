window.addEventListener('load', () => {
    console.log('Page loaded');
    const url = 'https://api.sunrise-sunset.org/json';

    let buttonGetData = document.querySelector('#getData');
    let buttonError   = document.querySelector('#getError');
    buttonGetData.addEventListener('click', () => makeApiRequest(url));
    buttonError.addEventListener('click', () => makeApiRequest(url + 'pp'));
})

async function makeApiRequest(url) {
    let lat = '57';
    let lng = '11';
    let qs = `${url}?lat=${lat}&lng=${lng}`;
    showStatus('About to make API request with URL=' + qs);

    resetError();
    try {
        const response = await fetch(qs);
        const json = await response.json();
        if( json.status === 'OK' ) {
            showStatus('Got response from API');
            let sunrise = json.results.sunrise;
            let sunset  = json.results.sunset;
            outputResult(`The sun rose at ${sunrise} today and will set at ${sunset}.`);
            console.log(json);

        } else {
            // TODO: not user friendly to show cryptic error messages - change this
            showStatus('API returned error: ' + json.status);
            outputResult(``);
            flashError();
        }
    } catch {
        showStatus('Fetch completely failed.');
        outputResult(``);
        flashError();
    }
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

function flashError() {
    let status = document.querySelector('.status');
    status.classList.add('flash-error');
}
function resetError() {
    let status = document.querySelector('.status');
    status.classList.remove('flash-error');
}
