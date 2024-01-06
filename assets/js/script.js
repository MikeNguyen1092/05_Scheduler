// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

/* ============= DOM Traversal ============= */
let saveBtn = $(".saveBtn");
let currentHr = dayjs().hour();
console.log(currentHr);
 

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // save hr and input to local storage 
  saveBtn.on("click", function () {
    let hourId = $(this).parent().attr('id');
    let userInput = $(this).siblings(".description").val();

    localStorage.setItem(hourId, userInput);
  }); // end of saveBtn

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $(".time-block").each(function() {
    let timeBlock = parseInt($(this).attr('id').split("-")[1]);
    console.log(timeBlock);
  }); // End of time-block

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // Display the current date and time in the header of the page.
  setInterval(function(){
  let today = dayjs();
  $("#currentDay").text(today.format('dddd, MMMM D YYYY, h:mm:ss a'))
  }, 1000);
  
}); // end of main function
