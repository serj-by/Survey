/**
 * Represents set of questions
 * @param string res - JSON formed string with questions
 * @see questions.json
 */
var Questions = function (res, in_respondent)
{
	var questions = [];
	var answers = [];
	
	var respondent = null;
	
	var curQuestion = -1;
	
	this.getSubstitutedTitle = function (index)
	{
		return this.questions [index].title.replace ("`name`", this.respondent.name);
	}
	
	this.advanceQuestion = function ()
	{
		this.curQuestion++;
		//alert (curQuestion+":"+questions.length);
		if (this.curQuestion < this.questions.length)
		{
			this.renderQuestion (this.curQuestion);
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Render question and answer variants
	 */
	this.renderQuestion = function ()
	{
		var index = this.curQuestion;
		$("#title").html (this.getSubstitutedTitle (index));
		var html = "";
		this.questions [index].options.forEach (function (element, index, array) {
			html += "<li class='list-group-item menuItem' onclick='respondents.surveyOption (\""+element+"\");'>"+element+"</li>";
		});
		$("#menu").html (html);
	}
	
	this.start = function ()
	{
		this.curQuestion = 0;
		this.renderQuestion ();
	}
	
	this.questions = res;
	this.respondent = in_respondent;
}
