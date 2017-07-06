const BASE_URL = 'http://localhost:3000/api/v1';
const API_KEY = "817e0e0bccabab98ea6f0db856c2a71bfbcd112a8b0db0d5c14d00c09b33f4d9"

function deleteCamera (id) {
  const headers = new Headers({
    'Authorization':`Apikey ${API_KEY}`
  });
  return fetch(`${BASE_URL}/cameras/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json());
}

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
  // A better practice when handling response from fetch
  // is to check its status if it was successful (Status: 200 OK)
  // before parsing as json with (res.json()).
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

document.addEventListener('DOMContentLoaded', () => {
  const cameraList = document.querySelector('#cameras-list');
  const cameraDetails = document.querySelector('#camera-details');
  const cameraForm = document.querySelector('#camera-form');
  // NAV BAR ELEMENTS
  const navCameraIndex = document.querySelector('#nav-camera-index');
  const navCameraNew= document.querySelector('#nav-camera-new');

  function showCamera (id) {
    return getCamera(id)
      .then(camera => {
        cameraList.classList.add('hidden');
        cameraDetails.innerHTML = renderCameraDetails(camera);
        cameraDetails.classList.remove('hidden');
        cameraForm.classList.add('hidden');

      });
  }

  function indexCamera () {
    cameraList.classList.remove('hidden');
    cameraDetails.classList.add('hidden');
    cameraForm.classList.add('hidden');

  }

  function reloadCameras () {
    return getCameras().then(cameras => {
      window.testList = cameras;
      cameraList.innerHTML = renderCameraList(cameras);
    })
  }
  reloadCameras();

  cameraForm.addEventListener('submit', event => {
    const { currentTarget } = event;
    event.preventDefault();

    postCamera(new FormData(currentTarget))
      .then(({id}) => {
        showCamera(id);
      });
  })

  cameraList.addEventListener('click', event => {
    const {target} = event;
    if (target.matches('a.camera-link')) {
      event.preventDefault();
      const id = target.getAttribute('data-id');
      showCamera(id);
    }

    if (target.matches('a.back-button')) {
      event.preventDefault();
      indexCamera();
    }
  });

  cameraDetails.addEventListener('click', event => {
    const {target} = event;
    if (target.matches('a.delete-button')) {
      event.preventDefault();
      const id = target.getAttribute('data-id');
      deleteCamera(id)
        .then(() => reloadCameras())
        .then(() => indexCamera());
    }
  });

  navCameraIndex.addEventListener('click', event => {
    event.preventDefault();
    indexCamera();
  });
  navCameraNew.addEventListener('click', event => {
    event.preventDefault();
    newCamera();
  });
});

// $( document ).ready(function() {
//   var results = "";
//   $.get("http://localhost:3000/api/v1/cameras",function(data){
//   results = JSON.parse(data);
// });
// console.log(results);
// });
