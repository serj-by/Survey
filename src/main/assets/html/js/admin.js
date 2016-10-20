var clicksToEnterResults = 3;

var numberClicked = 0;

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

function getResults ()
{
        var storage;
        try {
            if(typeof(Storage) !== "undefined") {
                storage = localStorage;
            }
        } catch (e) {
            alert ("Local storage error: "+e);
        }
        var results = "";
        for (var i = 1; i < dataRespondents.length+1; i++) {
            //var respondentFullName = "Ученик "+i;
            var respondentFullName = dataRespondents [i-1] ["surname"]+", "+dataRespondents [i-1] ["name"];
            if (res = storage.getItem (window.UNIQUE_STORAGE_ID+i))
            {
                results += i+". "+respondentFullName+": "+JSON.parse (res)+"\n";
            } else {
                results += i+". "+respondentFullName+": Анкета не заполнена\n";
            }
        };
        return results;
}

function sendResults ()
{
    $("#mainPane").hide ();
    $("#showResults").hide ();
    $("#resultsPane").show ();
    var results = getResults ();
    $("#resultsPane").html (
       "<div style=\"display: block;\" id=\"backToMain\"> \
        <input type=\"button\" value=\"Назад\" onclick=\"javascript: init ();\"/><br/><br/> \
        </div> \
        <center><h2>Результаты отправки:</h2></center><br/>\n");
    $.ajax({
        type: "POST",
        url: "http://serj.by/survey/api/storeSurveyData.php",
        data: 'surveyData='+results,
        dataType: "html",
        async: false,
        crossDomain: true,
        success: function(msg){

            if(msg=="Ok")
            {
                $("#resultsPane").append ("Results successfully sent.");
            } else {
                $("#resultsPane").append (msg);
            }

        },
        error: function (xhr, status, errorT)
        {
           $("#resultsPane").append ("AJAX error: "+status+": "+errorT);
        }
    });

}

function showResults (showImmediately)
{
    console.log ("Click #"+numberClicked);
    //$("#title").html ("Выберите ученика ("+numberClicked+")");
    if (numberClicked++ > clicksToEnterResults || showImmediately)
    {
        console.log ("Showing results...");
        //copyTextToClipboard (results);
        $("#mainPane").hide ();
        $("#showResults").hide ();
        $("#resultsPane").show ();
        var results = getResults ();
        /*$("#resultsPane").html (
"<div style=\"display: block;\" id=\"backToMain\"> \
    <input type=\"button\" value=\"Назад\" onclick=\"javascript: init ();\"/><br/><br/> \
</div> \
<center><h2>Результаты:</h2></center><br/>\n"+results);*/
        $("#surveyData").html (results);
    }
}
