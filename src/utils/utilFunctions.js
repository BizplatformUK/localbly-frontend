

export default function createImgName(file){
    const filename = file.name.substring(0, file.name.lastIndexOf('.'));
    const ext = file.name.substring(file.name.lastIndexOf('.'));
    return filename + '_' + Math.random().toString(16).slice(2) + ext;

}

export function FormatDate(dateString){
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
}

export function changeDateFormat(str){
    const dateObject = new Date(str);
    const formattedDate = dateObject.toISOString().slice(0, 10);
    return formattedDate
}

export async function sendImageData(container, image){
    try{
        const formData = new FormData()
        formData.append('file', image)
        formData.append('containername', container)
        const response = await fetch('api/images', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        return data.url
    }catch(error){
        console.log(error)
    }
}

export async function sendFormData(params, url, method) {
   try{
    const response = await fetch(url, {
        method,
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(params)
    })
    const data = await response.json();
    return data;

   }catch(error){
    console.log(error)
   }
}

export function updateOptions(options, id, updateObj){
    const index = options.findIndex(option => option.id === id);
    if(index === -1){
        return null
    }
    options[index] = {...options[index], ...updateObj}

    return true

}

export async function deleteItem(url){
    try{
        const response = await fetch(url, {
            method: 'DELETE',
            headers:{'content-type': 'application/json'},
        })
        const data = await response.json();
        return data;
    
       }catch(error){
        console.log(error)
       }
}

export const getData = async(url)=> {
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
        const data = await response.json()
        return data
    } catch(error){
        console.log(error.message)
    }
}

export function addJsonToArray(jsonObject, jsonArray) {
    jsonArray.push(jsonObject);
    return jsonArray;
}

export const updateJsonInArray = (jsonArray, updatedJsonObject) => {
    const updatedArray = jsonArray.map((jsonObject) => {
      if (jsonObject.id === updatedJsonObject.id) {
        return { ...jsonObject, ...updatedJsonObject };
      }
      return jsonObject;
    });
    return updatedArray;
};

export function getNextMonthDate(inputDate) {
    // Get the year and month of the input date
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
  
    // Get the corresponding date of the current month
    const currentMonthDate = new Date(year, month, inputDate.getDate());
  
    // Get the date one month from the current date
    const nextMonthDate = new Date(currentMonthDate.setMonth(month + 1));
  
    return nextMonthDate;
  }

  export function reformatdate(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Get the year, month (0-indexed), and day from the Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    // Pad the month and day with a leading zero if necessary
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
  
    // Construct the output string in the format "yyyy-mm-dd"
    const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
  
    return formattedDate;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const newDate = date.toLocaleDateString('en-US', options);
    return new Date(newDate)
}


