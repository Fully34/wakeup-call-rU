$(function(){

    var outerShell = $("<div class='outer-shell fill-container border-radius'></div>");

    var innerShell = $("<div class='inner-shell col-11-12 vert-center border-radius'></div>");

    var leftAmPm = $("<div class='left-am-pm col-2-12 vert-center'></div>");

    var clockScreen = $("<div class='clock-screen col-9-12 vert-center'></div>");

    var amPmIndicator = $("<div class='am-pm-indicator'></div>")

    var clockText = $("<div class='clock-text vert-center col-3-12'></div>")

    var bottomAmLabel = $("<div class='bottom-am-label col-9-12'></div>")

    var bottomFmLabel = $("<div class='bottom-fm-label col-9-12'></div>")

    var dots = $("<div class='big-colon'></div>")


    // Add outershell to body
    $('.container').append(outerShell);

    // Add innershell to outershell
    outerShell.append(innerShell);

    // Add am/pm indicator, clock screen, and radio labels to innershell
    innerShell.append(leftAmPm, clockScreen, bottomAmLabel, bottomFmLabel);
    
    // Create digit trackers by cloning clockText var
    var hoursOne = clockText.clone();

        hoursOne.append("<h1 class='hour-1-text'></h1>");

    var hoursTwo = clockText.clone();

        hoursTwo.append("<h1 class='hour-2-text'></h1>");


    // Put colon between digits
    var colon = clockText.clone();
        colon.removeClass('col-3-12');
        colon.removeClass('vert-center');
        colon.addClass('col-1-12');
        colon.addClass('absolute-center');

    // Make some colon dots
    var topDot = dots.clone();
        topDot.addClass('top-dot')
        topDot.addClass('box-shadow')


    var bottomDot = dots.clone();
        bottomDot.addClass('bottom-dot')
        bottomDot.addClass('box-shadow')


    // Put colon into colon-container
    colon.append(topDot);
    colon.append(bottomDot);

    var minutesOne = clockText.clone();
        minutesOne.append("<h1 class='minute-1-text'></h1>");
    var minutesTwo = clockText.clone();
        minutesTwo.append("<h1 class='minute-2-text'></h1>");

    // Add digits in the clock screen
    clockScreen.append(hoursOne);
    clockScreen.append(hoursTwo);
    clockScreen.append(colon);
    clockScreen.append(minutesOne);
    clockScreen.append(minutesTwo);


    // Create two trackers for am / pm
    var am = amPmIndicator.clone();
        am.addClass('am-light').text("AM");

    var pm = amPmIndicator.clone();
        pm.addClass('pm-light').text("PM");

    //Add am/pm lights
    leftAmPm.append(am);
    leftAmPm.append(pm);

    //AM/FM DIALS -> prepending Text
    bottomAmLabel.prepend('<span class="radio-text"> AM </span>');
    bottomFmLabel.prepend('<span class="radio-text"> FM </span>');

    bottomFmLabel.addClass('box-shadow');
    bottomAmLabel.addClass('box-shadow');



    //============================= Crazy attempt to animate clock ==============================//
    
    // put text into h1 elements -> AFTER WE APPEND THEM!!!!!
    $('.hour-1-text').text('1');
    $('.hour-2-text').text('2');
    $('.minute-1-text').text('0');
    $('.minute-2-text').text('0');

    // array for digit numbers
    var minute = [0,1,2,3,4,5,6,7,8,9]
    var tenMinute = [0,1,2,3,4,5]
    var hourArray = [0,1,2,3,4,5,6,7,8,9]
    var tenHourArray = [" ", 1]


    //BLUEPRINT FOR ANIMATING THE CLOCK -> USED FOR MINUTESTWO
        // var fruitColors = ["orange", "blue", "white"];

        // function showColor(index) {
        //    if (index < fruitColors.length) {
        //        console.log("Fruit is " + fruitColors[index]);
        //        setTimeout(function() { showColor(index+1); }, 500);
        //    }
        // }

        // setTimeout(function() { showColor(0); }, 500);

    // Global variables
    var tenMinuteIndex = 0;
    var hourIndex = 2; //-> Start at 2 (cuz we start @ 12:00)
    var tenHourIndex = 1;
    var amToggle = false;

    // THIS AFFECTS the time based on the tenMinute digit (FURTHEST RIGHT)
    function timeKeeper(indexMin) {

        var indexMin;

        // Reset minute index when it reaches the end of the minutes array --> this is before the bottom so we never exit the loop
        if (indexMin === minute.length) { // -> this makes sure we get thru the whole array

            tenMinuteIndex += 1; // -> increment tenMinuteIndex when we finish a minute loop
            
            // set tenMinuteIndex back to 0 after we finish an hour
                // also increment the hourIndex
            if (tenMinuteIndex >= tenMinute.length) {

                tenMinuteIndex = 0; // -> reset tenMinute index

                hourIndex += 1;  // increment the hour since we finished a tenMinute loop (1 hr.)

                // This is dealing with 12:00 -> basically setting hour to 1 (for 1:00, since that comes after 12:00) and toggling the tenHour digit to either be nothing or 
                if ( (hourIndex === 3) && (tenHourIndex === 1) ){

                    hourIndex = 1; // -> set hour index to 1

                    tenHourIndex = 0; // -> set ten hour index to 0 (essentially remove the digit from the display since we are in single digit time now)
                }

                $('.hour-2-text').text(hourArray[hourIndex]);

                $('.hour-1-text').text(tenHourArray[tenHourIndex]);
            }

            // reset hour loop when we reach the end of the array --> Switching stuff when we get to the 10's
            if (hourIndex > hourArray.length - 1 ) {

                hourIndex = 0; // -> reset hourArray to beginning (gives us 0)
                tenHourIndex = 1; // -> move tenHourArray to 1 (gives us 1)

                // Have to set/overwrite the tenHour and hour digits here
                $('.hour-2-text').text(hourArray[hourIndex]);

                $('.hour-1-text').text(tenHourArray[tenHourIndex]);
            }
            
            // increment tenMinutes each time 
            $('.minute-1-text').text( tenMinute[tenMinuteIndex] );

            // set minute Index back to 0 since we finished ten minutes
            indexMin = 0;
        }

        // when looping the tenMinute digit
        // This is really never false (check first conditional at top of function), the clock will continue forever
        if ( indexMin < minute.length ) {

            // console.log(minute[index]);

            $('.minute-2-text').text(indexMin);

            setTimeout(function() {

                timeKeeper(indexMin + 1);}, 60000) // -> Does stuff every 60 seconds
        }

        // toggle am/pm at exactly 12:00

        if ( (tenHourArray[tenHourIndex] === 1) && (hourArray[hourIndex] === 2) && tenMinute[tenMinuteIndex] === 0 && minute[indexMin] === 0 ) {

            amToggle = !amToggle;
        }

        // PM
        if ( !amToggle ) {

            am.hide();
            pm.show();
        }

        // AM
        if ( amToggle ) {

            am.show();
            pm.hide();
        }
    }

    setTimeout(function() { 
        timeKeeper(0);}, 60000); // -> Does stuff every 60 seconds


});


// -> Victory