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

document.addEventListener('DOMContentLoaded', () => {
  const crimeList = document.querySelector('#crimes-list');
  const crimeDetails = document.querySelector('#crime-details');
  const crimeForm = document.querySelector('#crime-form');

  function showCrime (id) {
    return getCrime(id)
      .then(crime => {
        crimeList.classList.add('hidden');
        crimeDetails.innerHTML = renderCrimeDetails(crime);
        crimeDetails.classList.remove('hidden');
        crimeForm.classList.add('hidden');

      });
  }

  function indexCrime () {
    crimeList.classList.remove('hidden');
    crimeDetails.classList.add('hidden');
    crimeForm.classList.add('hidden');

  }

  function reloadCrimes () {
    return getCrimes().then(crimes => {
      window.crimeList = crimes;
      crimeList.innerHTML = renderCrimeList(crimes);
    })
  }
  reloadCrimes();


  crimeList.addEventListener('click', event => {
    const {target} = event;
    if (target.matches('a.crime-link')) {
      event.preventDefault();
      const id = target.getAttribute('data-id');
      showCrime(id);
    }

    if (target.matches('a.back-button')) {
      event.preventDefault();
      indexCrime();
    }
  });
});
