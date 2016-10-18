/**
 * Represents survey for particular respondent
 * @param integer id Id of respondent
 */
var Survey = function (in_respondentId, in_respondent)
{
	var respondentId;
	var respondent = null;
	var questions = null;
	
	var parent = this;
	
	var storage = null;
	
	this.answers = [];
	
	/**
	 * Begins survey for chosen respondent
	 */
	this.start = function ()
	{		
/*		$.ajax ({url: "data/questions.json", method: "GET", dataType: "text"}).done (function (res)
		{*/
			var res = dataQuestions;
			
			parent.questions = new Questions (res, parent.respondent);
			parent.questions.start ();
/*		}).error (function (err)
		{
			console.log ("Ajax error:");
			console.log (err);
			alert ("AJAX error while fetching questionarie. See console for details.");
		});*/
		
	}
	
	this.collectAnswersAndStore = function ()
	{
		this.storage.setItem (window.UNIQUE_STORAGE_ID+this.respondentId, JSON.stringify (this.answers));
//		alert ("Спасибо за ответы!");
        $("#thanks").show();
		//window.init ();
	}
	
	this.surveyOption = function (val)
	{
		this.answers.push (val);
		//alert (this.answers);
		if (!this.questions.advanceQuestion ())
		{
			this.collectAnswersAndStore ();
		}
	}

	this.respondentId = in_respondentId;
	this.respondent = in_respondent;

	try {
	    if(typeof(Storage) !== "undefined") {
	    	this.storage = localStorage; 
	    }
	} catch (e) {
		alert ("Local storage error: "+e);
	}
}