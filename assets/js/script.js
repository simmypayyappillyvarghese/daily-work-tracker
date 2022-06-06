
//Global Variables

var currentDay=document.querySelector("#currentDay");



//Display the current date using moment API which will format 
//date as Ex: Monday,June 6th
function displayCurrentDate(){

var currentDate=moment().format('dddd[,]MMMM Do');
currentDay.innerHTML=currentDate;

}




displayCurrentDate();