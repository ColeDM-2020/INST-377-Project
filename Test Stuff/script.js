function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list){
  console.log('fired injectHTML')
  const target = document.querySelector('.restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.displayName} ${item.value}</li>`;
    target.innerHTML += str
  })
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const loadDataButton = document.querySelector('#data_load');
  const generalDataButton = document.querySelector('#general');
  const passingDataButton = document.querySelector('#passing');

  const loadAnimation = document.querySelector('#date_load_animation');
  loadAnimation.style.display = 'none';

  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    
    // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    console.log('Loading Data'); 
    loadAnimation.style.display = 'inline-block';



    // Basic GET request - this replaces the form Action
    let results = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/5526/statistics/0');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();

    storedData = localStorage.getItem('storedData')
    parsedData = JSON.parse(storedData);

    loadAnimation.style.display = 'none';
    dataDict = parsedData.splits.categories;
    console.log(dataDict); 

  });

  generalDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[0].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  passingDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[1].stats;
    console.log(dataList);
    injectHTML(dataList);
  })
  
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
