const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://allsportsapi2.p.rapidapi.com/api/matches/live',
  headers: {
    'x-rapidapi-key': 'cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56',
    'x-rapidapi-host': 'allsportsapi2.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error(error);
  }); 