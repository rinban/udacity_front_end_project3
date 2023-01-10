/* Global Variables */
const api = "http://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=b3e52678917a054fb952c4c06faefbd0&units=imperial"


// Create a new date instance dynamically with JS
let d = new Date();
let todayDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){  
    const zip = document.getElementById('zip').value;
    if(zip.length != 5){
      alert('Please enter a 5 digit zip code');
      return;
    }
    getInput(zip);
 
}

function getInput(zip){
  const feeling = document.getElementById('feelings').value;
  getweather(api,zip,key)
  .then(function(data){
    // post request to server
    postData('/addData',{temp: data.main.temp, date: todayDate, feel: feeling})
    updatingUI()
  })
} 

// fetch data from api
const getweather = async (api,zip,key)=>{
    const res = await fetch(api + zip + key);

    try {
        const data = await res.json();
        return data;
      }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      }

}

// send post request to server
const postData = async( url = '', data = {})=>{
  
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers:{
          'content-type': 'application/json',
      },
      body:JSON.stringify(data),
  });

  try{
      const newData = await response.json();
      return newData;

  }catch(error) {
  console.log("error", error);
  }
}

// update ui
const updatingUI = async () =>{
  const request = await fetch('/allData');

  try {
    // Transform into JSON
    const allData = await request.json()

    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('date').innerHTML =allData.date;
    document.getElementById('content').innerHTML = allData.feel;
  }
  catch(error) {
    console.log("error", error);
  }

 }