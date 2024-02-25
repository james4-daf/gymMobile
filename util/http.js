import axios from 'axios';

const firebaseRootUrl =
  'https://gymtracker-85671-default-rtdb.europe-west1.firebasedatabase.app/';

export function storeWeight(weightData) {
  return axios.post(`${firebaseRootUrl}dailyWeights.json`, weightData);
}

export async function getAllDailyWeight() {
  const response = await axios.get(firebaseRootUrl + 'dailyWeights.json')

  const weights = [];
  console.log(response.data)
  for( const key in response.data) {
    const expenseObj = {
      id: key,
      date: response.data[key].todaysDate,
      weight: response.data[key].weight
    }
    weights.push(expenseObj)
  }
  return weights
}