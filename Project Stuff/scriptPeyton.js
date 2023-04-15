function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list){
  console.log('fired injectHTML')
  const target = document.querySelector('.stats_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.displayName}: ${item.value}</li>`;
    target.innerHTML += str
  })
}

async function mainEvent() { 
  const mainForm = document.querySelector('.main_form');
  const loadDataButton = document.querySelector('#data_load');
  const generalDataButton = document.querySelector('#general');
  const passingDataButton = document.querySelector('#passing');
  const rushingDataButton = document.querySelector('#rushing');
  const receivingDataButton = document.querySelector('#receiving');
  const defensiveDataButton = document.querySelector('#defensive');
  const defensiveInterceptionsDataButton = document.querySelector('#defensiveInterceptions');
  const scoringDataButton = document.querySelector('#scoring');
  const clearDataButton = document.querySelector('#clear');
  
  let currentList = []; 

  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { 
    
    // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    console.log('Loading Data'); 

    // Basic GET request - this replaces the form Action
    let results = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/1428/statistics/0');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();

    storedData = JSON.stringify(currentList)
    parsedData = JSON.parse(storedData);

    console.log(parsedData)

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
  
  rushingDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[2].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  receivingDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[3].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  defensiveDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[4].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  defensiveInterceptionsDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[5].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  scoringDataButton.addEventListener('click', (event) => {
    console.log('Generate Stats');
    dataList = dataDict[6].stats;
    console.log(dataList);
    injectHTML(dataList);
  })

  clearDataButton.addEventListener('click', (event) => {
    console.log('clear browsing data');
    storedData.clear();
    console.log('localStorage Check', storedData.getItem('storedData'));
  })

}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
