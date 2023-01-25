import axios from 'axios';

const getParks = async () => {
  const { data } = await axios.get('https://express-sqlite-experiment.onrender.com/api/parks');
  return data;
};

const main = async () => {
  const { data } = await axios.post('https://express-sqlite-experiment.onrender.com/api/parks', {
    fullName: 'Zion',
    parkCode: 'zi',
    states: 'Utah',
    designation: 'national park',
  });
  console.log(data);
  const parks = await getParks();
  console.log(parks);
};

main();
