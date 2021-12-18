//project insights
//1. preventDefault() of the event interface tells the useragent if the event is not explicitly handled, default action should not be taken as it normally would be.
//2. 

//grab h1( class of time-left) to display how much time is left
const timeLeft = document.querySelector(".display__time-left");

//grab p to display the end time
const endTime = document.querySelector(".display__end-time");

//grab all buttons to access time property in dataset
const buttons = document.querySelectorAll("[data-time]");


//instantiating global variable countdown
let countdown;

// func timer for working of countdown
function timer(seconds)
{
    //clear off any previous timer
    clearInterval(countdown);

    //get current time
    //now is a static method on date
    const now = Date.now();

    //get end time
    const then = now + seconds*1000;

    //display time left, call func immediately without delay
    displayTimeLeft(seconds);

    //display end time
    displayEndTime(then);

    //use setInterval to make repeated calls to func after specified delay
    countdown = setInterval( function(){

        //decrementing seconds and storing it's values in secondsLeft
        const secondsLeft = Math.round((then - Date.now())/1000);

        //don't let secondsleft go below 0
        if( secondsLeft < 0 )
        {

            //terminate setInterval
            clearInterval(countdown);
            
            return;                                    //terminate func
        }


        //log decrementing values of countdown's seconds on screen
        displayTimeLeft(secondsLeft);


    },1000);
}

//func to display time left
function displayTimeLeft(seconds)
{

    //instantiate minutes
    const minutes = Math.floor(seconds / 60);

    //instantiate secondsRemaining
    const secondsRemaining = seconds % 60 ;

    //if secondsRemaining is less than 10, add 0 otherwise add nothing
    const adjustedSeconds = `${secondsRemaining < 10 ? '0':''}${secondsRemaining}`
    
    //store minutes and adjustedSeconds in display
    const display = `${minutes}:${adjustedSeconds}`;

    //assign textContent of timeLeft to display
    timeLeft.textContent = display;

    //display timeLeft in title
    document.title = display;

    
}

//func to display end time
function displayEndTime(timeStamp)
{
    //access properties of date( hours, minutes etc) by creating new object
    const end = new Date(timeStamp);

    //get hours
    const hours = end.getHours();

    //get minutes
    const minutes = end.getMinutes();

    //if minutes is less than 10, add 0 otherwise add nothing
    const adjustedMinutes = `${minutes < 10 ? '0':''}${minutes}`

    //make hours in 12 hr format
    const adjustedhours = `${hours > 12 ? hours - 12 : hours}`
    
    //store adjustedMinutes and hours in display
    const display = `Be Back in ${adjustedhours}:${adjustedMinutes}`;

    //assign textContent of endTime to display
    endTime.textContent = display;

    
}

//func to start timer
function startTimer()
{
    //grabbing time property from this.dataset object and converting string to int
    const seconds = parseInt(this.dataset.time);

    //passing in specifed seconds in timer func
    timer(seconds);
}

//if any of buttons are clicked, call startTimer
buttons.forEach(function (button){
    button.addEventListener("click", startTimer);
})

//if submit happens in form, call func
document.customForm.addEventListener("submit", function (e){

    //prevent page from reloading and sending data over get
    e.preventDefault();

    
    const minutes = this.minutes.value;
    timer(minutes*60);

    //reset input after the value has been submitted
    this.reset();


})