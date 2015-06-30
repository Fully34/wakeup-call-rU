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

    // put text into h1 elements -> AFTER WE APPEND THEM!!!!!
    $('.hour-1-text').text('1');
    $('.hour-2-text').text('2');
    $('.minute-1-text').text('3');
    $('.minute-2-text').text('2');

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

})