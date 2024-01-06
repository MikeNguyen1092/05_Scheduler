//=============================== DOM Traversal ======================================//
let saveBtn = $(".saveBtn");
let timeBlock = $(".time-block");
let textArea = $(".description");

//================================ Main function ====================================//
$(function () {
    // set timer to clear it out later
    let timer;

    //========== Self calling function every 1 second ==========//

    // Display the current date and time in the header of the page.
    setInterval(function () {
        let today = dayjs();
        $("#currentDay").text(today.format("dddd, MMMM D YYYY, h:mm:ss a"));
    }, 1000);
    //========== End ==========//


    //========== Save hour and user input to local storage ==========//

    saveBtn.on("click", function (event) {
        event.preventDefault();

        // Get the id attr from the parent of 'this' save button
        let hourId = $(this).parent().attr("id");
        // Get the value from the sibling 'this' save button
        let userInput = $(this).siblings(".description").val();

        // set to local storage, hourID is the 'key' and userInput is the 'value
        localStorage.setItem(hourId, userInput);

        // when saveBtn is clicked create a <p> and message
        let messageEl = $("<p>").text(
            "The event has been saved to local storage ✅."
        );

        // Append messageEl after id=currentDay.
        messageEl.addClass("lead").insertAfter("#currentDay");

        // message will clear out after 3 seconds
        clearTimeout(timer);
        timer = setTimeout(function () {
            messageEl.remove();
        }, 3000);
    });   
    //========== End ==========//

    
    //========== Add and Remove classes function ==========//
    timeBlock.each(function () {
        // The current hour using dayjs in 24hr format
        let currentHr = dayjs().hour();

        // Use parseInt to grab the id attr and split it to get the hr(number) for 'this' block
        let timeSlot = parseInt($(this).attr("id").split("-")[1]);

        // compare currentHr with the timeSlot to add class
        if (timeSlot < currentHr) {
            $(this).addClass("past").removeClass("present future");
        } else if (timeSlot == currentHr) {
            $(this).addClass("present").removeClass("past future");
        } else {
            $(this).addClass("future").removeClass("present past");
        }
    });
    //========== End ==========//


    //========== Retrieve the user input from local storage ==========//
    timeBlock.each(function () {
        // Grab the user input by looking for the key from the id attr
        let storedInput = localStorage.getItem($(this).attr("id"));

        // Using `this` to to to the right id then `find` the class description, we put the value of storedInput
        if (storedInput) {
            $(this).find(".description").val(storedInput);
        }
    });
    //========== End ==========//

}); //============================= End of Main function =================================//
