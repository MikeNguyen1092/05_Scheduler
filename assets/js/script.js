/* ============= DOM Traversal ============= */
let saveBtn = $(".saveBtn");
let timeBlock = $(".time-block")
let textArea = $(".description")

$(function () {
    let timer;
  // Display the current date and time in the header of the page.
  setInterval(function(){
    let today = dayjs();
    $("#currentDay").text(today.format('dddd, MMMM D YYYY, h:mm a'))
    }, 1000);

  // Save hr and input to local storage 
  saveBtn.on("click", function (event) {
    event.preventDefault();
    let hourId = $(this).parent().attr('id');
    let userInput = $(this).siblings(".description").val();

    // set to local storage, hourID is the 'key' and userInput is the 'value
    localStorage.setItem(hourId, userInput);

    let messageEl = $("<p>").text("The event has been saved to local storage.")
    $(messageEl).appendTo("#currentDay")

    clearTimeout(timer);
    timer = setTimeout (function() {
        messageEl.remove();
    }, 3000);

  }); // end of saveBtn


  // Add and Remove classes
  timeBlock.each(function() {
    // the current hour using dayjs in 24hr format
    let currentHr = dayjs().hour();

    // Grab parseInt the id attr to get the hr for that block
    let timeSlot = parseInt($(this).attr('id').split("-")[1]);

    // compare currentHr with the timeSlot to add class
    if (timeSlot < currentHr) {
        $(this).addClass('past').removeClass('present future');;
    } else if (timeSlot == currentHr) {
        $(this).addClass('present').removeClass('past future');
    } else {
        $(this).addClass('future').removeClass('present past')
    }
  }); // End of Add and Remove classes


  // Retrieve the user input from local storage
  timeBlock.each(function () {

    // Grab the user input by looking for the key from the id attr
    let storedInput = localStorage.getItem($(this).attr("id"));

    // Using `this` to to to the right id then `find` the class description, we put the value of storedInput
    if(storedInput){
    $(this).find(".description").val(storedInput);
    }
  });



}); // end of main function
