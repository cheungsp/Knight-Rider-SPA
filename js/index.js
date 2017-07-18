// const BASE_URL = 'http://localhost:3000/api/v1';
const BASE_URL = 'https://knight-rider-api.herokuapp.com/api/v1'
const API_KEY = "817e0e0bccabab98ea6f0db856c2a71bfbcd112a8b0db0d5c14d00c09b33f4d9"

function getCameras () {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/cameras`, {headers})
    .then(res => res.json());
}

function getCamera (id) {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/cameras/${id}`, {headers})
    .then(res => res.json());
}

function renderCameraSummary (camera) {
  return `
    <div class="camera-summary">
      <a href class="camera-link" data-id="${camera.id}">
        ${camera.latitude}
        ${camera.longitude}
      </a>
    </div>
  `;
}

function renderCameraList (cameras) {
  return cameras.map(renderCameraSummary).join('');
}

function renderCameraDetails (camera) {
  return `
    <a href class="back-button">Back</a>
    <h1>${camera.latitude}</h1>
    <h1>${camera.longitude}</h1>
  `;
}

//////////////////////////////////////////////////////////////////////////////
//                             ACCIDENTS                                    //
//////////////////////////////////////////////////////////////////////////////
function getAccidents () {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/accidents`, {headers})
    .then(res => res.json());
}

function getAccident (id) {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/accidents/${id}`, {headers})
    .then(res => res.json());
}

function renderAccidentSummary (accident) {
  return `
    <div class="accident-summary">
      <a href class="accident-link" data-id="${accident.id}">
        ${accident.latitude}
        ${accident.longitude}
      </a>
    </div>
  `;
}

function renderAccidentList (accidents) {
  return accidents.map(renderAccidentSummary).join('');
}

function renderAccidentDetails (accident) {
  return `
    <a href class="back-button">Back</a>
    <h1>${accident.latitude}</h1>
    <h1>${accident.longitude}</h1>
  `;
}

//////////////////////////////////////////////////////////////////////////////
//                             ACCIDENTS                                    //
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//                    CRIMES                                                //
//////////////////////////////////////////////////////////////////////////////
function getCrimes () {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/crimes`, {headers})
    .then(res => res.json());
}

function getCrime (id) {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/crimes/${id}`, {headers})
    .then(res => res.json());
}

function renderCrimeSummary (crime) {
  return `
    <div class="crime-summary">
      <a href class="crime-link" data-id="${crime.id}">
        ${crime.latitude}
        ${crime.longitude}
      </a>
    </div>
  `;
}

function renderCrimeList (crimes) {
  return crimes.map(renderCrimeSummary).join('');
}

function renderCrimeDetails (crime) {
  return `
    <a href class="back-button">Back</a>
    <h1>${crime.latitude}</h1>
    <h1>${crime.longitude}</h1>
  `;
}

//////////////////////////////////////////////////////////////////////////////
//                    CRIMES                                                //
//////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const cameraList = document.querySelector('#cameras-list');
  const cameraDetails = document.querySelector('#camera-details');
  const cameraForm = document.querySelector('#camera-form');

  function indexCamera () {
    cameraList.classList.remove('hidden');
    cameraDetails.classList.add('hidden');
    cameraForm.classList.add('hidden');

  }

  function reloadCameras () {
    return getCameras().then(cameras => {
      window.testList = cameras;
    })
  }
  reloadCameras();
  //////////////////////////////////////////////////////////////////////////////
  //                             ACCIDENTS                                    //
  //////////////////////////////////////////////////////////////////////////////
  const accidentList = document.querySelector('#accidents-list');
  const accidentDetails = document.querySelector('#accident-details');
  const accidentForm = document.querySelector('#accident-form');

  function indexAccident () {
    accidentList.classList.remove('hidden');
    accidentDetails.classList.add('hidden');
    accidentForm.classList.add('hidden');

  }

  function reloadAccidents () {
    return getAccidents().then(accidents => {
      window.accidentList = accidents;
    })
  }
  reloadAccidents();

  //////////////////////////////////////////////////////////////////////////////
  //                             ACCIDENTS                                    //
  //////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//                    CRIMES                                                //
//////////////////////////////////////////////////////////////////////////////
  const crimeList = document.querySelector('#crimes-list');
  const crimeDetails = document.querySelector('#crime-details');

  function indexCrime () {
    crimeList.classList.remove('hidden');
    crimeDetails.classList.add('hidden');
  }

  function reloadCrimes () {
    return getCrimes().then(crimes => {
      window.crimeList = crimes;
    })
  }
  reloadCrimes();

  //////////////////////////////////////////////////////////////////////////////
  //                    CRIMES                                                //
  //////////////////////////////////////////////////////////////////////////////
});
