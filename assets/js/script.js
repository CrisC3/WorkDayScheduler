// Variables to get element by ID.
var todayDateTime = $("#currentDay");
var plannerEl = $("#planner");

// Function to update the date time, including seconds.
function currentDateTime() {

    // Variables to format the date time.
    var day = moment().format("dddd");
    var date = moment().format("MMMM D, YYYY");
    var time = moment().format("h:mm:ss a");

    // Concated variables into a single variable, to display date time.
    todayDateTime.text(day + " " + date + " " + time);
}

// Generates the planner layout and loads from the local storage.
function generateLoadPlanner() {
    
    // Variables set to start and end hours.
    var dayHourStart = 0;
    var dayHourEnd = 24;
    
    // Initial for loop to generate the rows and columns
    for (var i = dayHourStart; i < dayHourEnd; i++) {
    
        // Variables declaration, time format, new elements creation.
        var hour = moment(i, ["H"]).format("hA");
        var hourIn24Hours = moment(i, ["H"]).format("HH");
        var currentHour = moment().format("HH");
        var plannerRows = $("<div>").attr("id", "time-" + i).addClass("row border-0 time-block");
        var plannerCols1 = $("<div>");
        var plannerCols2 = $("<textarea>");
        var plannerCols3 = $("<div>");
        var plannerCols3Save = $("<i>");

        // For loop to generate the columns per row.
        for(j = 0; j < 3; j++) {
            
            // First if: adds the hourly column.
            if(j == 0) {
                // Appends to the planner rows variable as the first column.
                plannerRows.append(plannerCols1.addClass("hour border-top border-end border-bottom col-2 col-sm-2 col-md-1 d-flex align-items-center justify-content-end").append(hour));
            }
            // Second if: adds the text area column
            else if (j == 1) {

                // Variable to add the second column class from the variable plannerCols2.
                var textAreaCol = plannerCols2.addClass("description p-auto border col-8 col-sm-8 col-md-10");

                // Appends to the planner rows variable as the second column.
                plannerRows.append(textAreaCol);

                // Checks if the current hour is past, present, or future.
                if (hourIn24Hours == currentHour) {
                    // Sets the color for the current hour.
                    plannerCols2.addClass("present");
                }
                else if (hourIn24Hours > currentHour) {
                    // Sets the color for the future hour(s).
                    plannerCols2.addClass("future");
                }
                else {
                    // Sets the color for the past hour(s).
                    plannerCols2.addClass("past");
                }

            }
            else {
                // ELSE: adds the save icon area column
                var lockDiv = plannerCols3.addClass("saveBtn col-2 col-sm-2 col-md-1 border rounded-end d-flex align-items-center justify-content-center");
                var floppySaveIcon = plannerCols3Save.addClass("fas fa-save");
                plannerRows.append(lockDiv.append(floppySaveIcon));
            }
        }
        
        // PlannerEl receives all the input of the data
        plannerEl.append(plannerRows);

        // Get the data from local storage and loaded.
        for(var k = dayHourStart; k < dayHourEnd; k++) {
            $("#time-" + k + " .description").val(localStorage.getItem("time-" + k));
        }
        
    }
}

// Function currentDateTime is added below, for when the page loads.
currentDateTime();

// Set to run the currentDateTime function, to refresh today's date time every 1 second.
setInterval(currentDateTime, 1000);

// Creates the daily planner and loads any data from local storage.
generateLoadPlanner();


// On click event for when you click on Save button icon.
$(".saveBtn").on("click", function () {
    
    // Variables to get the source of the click by ID
    var plannerTime = $(this).parent().attr("id");
    var plannerDescription = $(this).siblings(".description").val();

    console.log("Planner time = " + plannerTime + "\n" + "Planner Description = " + plannerDescription)

    // Save text in local storage
    localStorage.setItem(plannerTime, plannerDescription);
});