var clicksToEnterResults = 3;

var numberClicked = 0;

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
