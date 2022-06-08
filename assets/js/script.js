//Global Variables
var currentDay = $("#currentDay");
var saveButtonEl = $(".saveBtn");
var textAreaEl = $("textarea");
var hourEl = $(".hour");

//Display the current date using moment API which will format
//date as Ex: Monday,June 6th
function displayCurrentDate() {
  var currentDate = moment().format("dddd[ , ]MMMM Do");
  currentDay.innerHTML = currentDate;
}

/*
TO STORE TASK DATA IN LOCAL STORAGE

Function will save the task  entry with hour  as an object to an array for 
all the tasks and will be saved as an array to local storage
when user clicks on the Save Icon
*/

function storeTaskData(event) {
  //Flag to verify if the hour value already is saved in the storage
  var valueExist = false;
  //Copy of the  existing local Storage Data
  var localStorageTemp = JSON.parse(localStorage.getItem("hour-task"));

  //If the localstorage is empty,set array as new array,else copy the
  //stored data to array.
  var localSrorageArray = localStorageTemp !== null ? localStorageTemp : [];

  var clickedButton = $(event.target);
  //parent() will select,save icons parent and siblings with selector
  //return the hour element with html to fetch its value and trim extra space

  var hourVal = clickedButton.parent().siblings(".hour").html().trim();
  var taskVal = clickedButton.parent().siblings("textarea").val().trim();

  //If text area is empty,return
  if (!taskVal) {
    return;
  }

  //Verifying if the object already exist in the array and duplicates are not pushed to localstorage
  for (let index = 0; index < localSrorageArray.length; index++) {
    if (localSrorageArray[index][hourVal]) {
      //This will update the array,with the new value for the existing object
      localSrorageArray[index][hourVal] = taskVal;
      valueExist = true;
    }
  }

  //This will create an Object with key as hourVal and value as taskVal,EX: 9AM:"Text Area Input"
  var hourtaskObj = { [hourVal]: taskVal };

  //Object is added to the array only if its a new entry
  if (!valueExist) {
    localSrorageArray.push(hourtaskObj);
  }

  localStorage.setItem("hour-task", JSON.stringify(localSrorageArray));
}

/*EventListener when user click on save to store the task data in local storage */
saveButtonEl.on("click", storeTaskData);

/*
APPLY COLOR CODE TO TIME BLOCKS

Below Function is executed every minute to check if the task hour is past
the current hour or not.If then apply the color code by add the respective class.
*/


function applyColorCode() {
  //current hour in 24 hour format
  var currentHour = Number(moment().format("H"));
 

for(let i=0;i<textAreaEl.length;i++){     

    //This will fetch hour value and remove AM/PM from hour element
    var hourValue=$(hourEl[i]).html().trim();

    //Fetches the numerical value and assign to taskHourString 
    //and PM/AM will be assigned to meridianValue
    var taskHourString=hourValue.substr(0,hourValue.length-2);
    var meridianValue=hourValue.substr(-2);
   
    //Convert task hour to numerical value
    var taskHour=Number(taskHourString);
    
    //Convert the task hour to 23 hour format to compare the time with current hour
    if(meridianValue==="PM" & taskHour!=12){
        taskHour+=12;
    }


//For Past Hour
if (taskHour<currentHour) {

 $(textAreaEl[i]).removeClass("present");
 $(textAreaEl[i]).removeClass("future");
 $(textAreaEl[i]).addClass("past");

}
//For Future Hour
else if (taskHour>currentHour) {
    $(textAreaEl[i]).removeClass("present");
    $(textAreaEl[i]).removeClass("past");
    $(textAreaEl[i]).addClass("future");
} 
//For Present Hour
else {
    $(textAreaEl[i]).removeClass("past");
    $(textAreaEl[i]).removeClass("future");
    $(textAreaEl[i]).addClass("present");
}

}
           
  
}

//Function is called once on loading and every one minute using the set Interval to compare the times
applyColorCode();

var timerVariable = setInterval(applyColorCode,60000);



//When Page is loaded ,current Date is displayed and color code is applied
displayCurrentDate();
