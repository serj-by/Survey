/**
 * Class represents respondents.
 * @param string json JSON encoded string to initialize respondents
 */
var Respondents = function (json)
{
	var respondents = [];
	
	var parent = this;
	
	/**
	 * Initialize respondents object with JSON string
	 * @param json JSON string containing data about respondents
	 * @returns
	 */
	this.init = function (json)
	{
		this.respondents = json;
	}
	
	this.getRespondentById = function (id)
	{
		var elementFound = null;
		this.respondents.forEach (function (element, index, array) {
			if (element.id == id) elementFound =  element;
		});
		return elementFound;
	}
	
	/**
	 * Render admin menu for selection of respondent
	 * @param jQueryDOMElement container container for menu 
	 * @returns nothing
	 */
	this.renderRespondents = function (container)
	{
		var survey = new Survey (0, null);
		var html = "";
		this.respondents.forEach (function (element, index, array) {
			filled = survey.storage.getItem (window.UNIQUE_STORAGE_ID+element.id) ? 1 : 0;
			html += "<li class='list-group-item menuItem "+(filled?"filledRespondent":"unfilledRespondent")+"' onclick='respondents.select ("+element.id+");'>"+element.surname+", "+element.name+"</li>";
		});
		$(container).html (html);
	}
	
	this.select = function (id)
	{
		this.survey = new Survey (id, this.getRespondentById (id));
		this.survey.start ();
	}
	
	this.surveyOption  = function (val)
	{
		this.survey.surveyOption (val);
	}
	
	if (json) this.init (json);
}