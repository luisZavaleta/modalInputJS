var vulcanoUtil = {};

vulcanoUtil.clone = function clone(obj) {
	return jQuery.extend(true, {}, obj);
};

/**
 * Get information from a HTML page, it could get the value of an input or the html of a
 * contenteditable element.
 * 
 * @selector: Jquery selector of the element
 * @type: {value, html}
 */
vulcanoUtil.getTextFromDOM = function(selector, type) {

	switch (type) {
		case "value":
		case "val":
			return $(selector).val();
			break;
		case "html":
			return $(selector).html();
			break;
		default:
			throw "IllegalArgumentException---->" + type;

	}
	;

};

/**
 * Used to get the data (var or html) of a collection of elements, for example to iterate over tr in
 * a table and get all the tds (is needed to provide the td selectors).
 * 
 * @collectionSelector: jquery selector of the container that will be iterated.
 * @childSelectors: Array with the name and type of the individual elements that will be getted. in
 *                  the following format: [{ "selector": "7", "type": "7", "name": "nombre" }, {
 *                  "selector": "7", "type": "7", "name": "nombre" }]
 */
vulcanoUtil.getCollectionFromDOM = function(collectionSelector, childsParams) {

	if (collectionSelector == null || childsParams == null || jQuery.type(childsParams) != "array"
			|| childsParams.length < 1) {

		throw "getCollectionFromDOM - IllegalArgumentException ";
	}

	var returnArray = [];
	var elementsToIterate = $(collectionSelector);

	$.each(elementsToIterate, function(index, singleElement) {

		var childsRet = {};

		$.each(childsParams, function(indxChildSelector, childSelector) {

			var domElement = $(singleElement).find(childSelector.selector);

			childsRet[childSelector.name] = vulcanoUtil.getTextFromDOM(domElement, childSelector.type);

		});
		returnArray.push(childsRet);

	});

	return returnArray;

};

/**
 * Used to get html or values of different elements in a webpage.
 * 
 * @params: json with all the information with the following pattern: [ { "selector" : ".divTest",
 *          "type" : "html", "name" : "test1" }, { "selector" : "tr", "name" : "tabla", "data" : [ {
 *          "selector" : ".hola", "type" : "html", "name" : "hola" }, { "selector" : ".adios",
 *          "type" : "html", "name" : "adios" }, { "selector" : "td input", "type" : "val", "name" :
 *          "ok" } ], "type" : "collection" }, { "selector" : ".divTest2 input", "type" : "val",
 *          "name" : "test2" } ];
 * @jsonExample: http://www.jsoneditoronline.org/?id=931b13e0e98649af2d73709c860603db
 */
vulcanoUtil.getDataFromForm = function(elements) {

	var data = {};

	$.each(elements, function(index, singleElement) {

		if (singleElement.type == "collection") {
			data[singleElement.name] = vulcanoUtil.getCollectionFromDOM(singleElement.selector, singleElement.data);
		} else {
			data[singleElement.name] = vulcanoUtil.getTextFromDOM(singleElement.selector, singleElement.type);
		}

	});

	return data;
};

/**
 * Used to verify if a jquery object really exists, for example $('#notAnElement') returns [object
 * Object], but is an object with 0 elements.
 */
$.fn.exists = function() {
	return this.length !== 0;
};

/**
 * @param templateid: html of the element that will be used as template. example: <br>
 *        <code>
 *      	<div id="mytemplate">
 *				<p>%test%</p>
 *				<p>%word%</p>
 *			</div>
 *  	</code>
 * @param data
 * @returns
 * @xample document.getElementById("my").innerHTML=template("mytemplate",{test:"MYTEST",word:"MYWORD"})
 * @source: (based in) http://stackoverflow.com/a/378001/597786
 */
vulcanoUtil.template = function(templateid, data) {
	
	console.log("templateid======>"+templateid);
	return templateid.replace(/%(\w*)%/g, function(m, key) {
		return data.hasOwnProperty(key) ? data[key] : '%' + key + '%';
	});
};



vulcanoUtil.undefinedOrFalse  = function(objt){
	return (objt == undefined || !objt);
};




//replace for JSON.toCssString in vulcanoUtils

JSON.toCssStringNew = function(jsonObject) {
	
	if(vulcanoUtil.undefinedOrFalse(jsonObject)){
		return "";
	}
	
	var cssString = "";

	for (variable in jsonObject) {
		if (jsonObject.hasOwnProperty(variable)) {
			cssString += variable + ":" + jsonObject[variable] + ";";
		}
	}
	return cssString;
};

JSON.htmlStringify = function(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
};



//25 Agosto 2015

/**
 * Get data from a HTML page, it could get the value of an input, the html of a
 * element or any attribute.
 * 
 * @selector: Jquery selector of the element
 * @type: {value, html, or any attribute name}
 */
vulcanoUtil.getDataFromDOM = function(selector, type) {	
	if(type == 'value' || type == 'val' || type == 'html'){	
		return vulcanoUtil.getTextFromDOM(selector, type); 
	}else{
		return  $(selector).attr(type);
	}
};




/**
 * Set information to a HTML page, it could set the value of an input or the html of a
 * contenteditable element.
 * 
 * @selector: Jquery selector of the element
 * @type: {value, html}
 * @value: Text to be setted
 */
vulcanoUtil.setTextToDOM = function(selector, type, value) {
	
	switch (type) {
		case "value":
		case "val":
			$(selector).val(value);
			break;
		case "html":
			$(selector).html(value);
			break;
		default:
			throw "IllegalArgumentException---->" + type;

	};
	
};




/**
 * Set data from a HTML page, it could get the value of an input, the html of a
 * element or any attribute.
 * 
 * @selector: Jquery selector of the element
 * @type: {value, html, or any attribute name}
 * @value: Text to be setted
 */
vulcanoUtil.setDataToDOM = function(selector, type, value) {	
	
	if(type == 'value' || type == 'val' || type == 'html'){	
		return vulcanoUtil.setTextToDOM(selector, type, value); 
	}else{
		return  $(selector).attr(type, value);
	}	
	
};



//Added August 3

/**
 * Replace  getHtmlElement(selector, index, parent)
 * @param selectorOrElement: Can be a JSON with the element, index and paren as attributes o a selector. 
 */
vulcanoUtil.getHtmlElement = function(selectorOrElement, index, parent){
	
	var element = null;
	var selector = null;
	
	if(vulcanoUtil.isJSON(selectorOrElement)){
		index = selectorOrElement.index;
		parent = selectorOrElement.parent;
		selector = selectorOrElement.selector;
	}else{
		selector = selectorOrElement;
	}
	
	if (!!index && !!parent) {
		element = ($(parent).find(selector)).eq(index);
	}else if (!!index) {
		element = $(selector).eq(index);
	}else if (!!parent) {
		element = $(parent).find(selector);
	}else{
		element = $(selector);
	}
	
	return element;
	
};




/*
 *Verify if a given values is a JSON Object
 * */
vulcanoUtil.isJSON = function(value){
	
	if(Object.prototype.toString.call(value) === '[object Object]'){
		return true;
	}
	return false;
	
};


/*
 *Verify if a given values is a JSON Object
 * */
vulcanoUtil.isArray = function(value){
	
	if(Object.prototype.toString.call(value) === '[object Array]'){
		return true;
	}
	return false;
	
};


/*
 *Verify if a given values is a function
 * */
vulcanoUtil.isFunction = function(value){
	
	if(Object.prototype.toString.call(value) === '[object Function]'){
		return true;
	}
	return false;
	
};





/**
 *
 * Set a unique class identifier to the fromElement and add that identifier as an attribute to the toElement.
 *
 * @param fromElement: Element that will have the unique identifier.
 * @param toElement: Element that will have the new attribute, the attribute value will be the indetifier.
 * @param attributeName: Name of the attribute that will be setted in the toElement.
 * 
 * 
 * 
 */
vulcanoUtil.generateUniqueClassIdentifier = function(fromElement, toElement, attributeName){
	
	var uniqueClass = vulcanoUtil.generateUUID() ;
	
	$(fromElement).addClass(uniqueClass);
	$(toElement).attr(attributeName, uniqueClass);	
	
	return uniqueClass;
	
};









/**
 * Wrapper over Math.rand() to return a specific number of digits
 */
vulcanoUtil.rand = function(maxValue){
	return (Math.ceil(Math.random() * maxValue));
};


/*Generates a uuid with a given length
 * http://jsfiddle.net/snj9enbg/1/
 * */
vulcanoUtil.generateUUID = function(len) {
	
    var xxx ="xxxxxxxxxyxxxxxxxxxyxxxxxxxxxyxxxxxxxxxyxxxxxxxxxy";
    
    xxx = vulcanoUtil.getStringWithMinLenght(xxx, len);
    xxx = xxx.substring(0,len);
    
    var d = new Date().getTime();
    var uuid = xxx.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

/*
 * returns a string with a minumun length
 * 
 * http://jsfiddle.net/snj9enbg/1/
 * */
vulcanoUtil.getStringWithMinLenght = function(str, len){

    if(str.length > len){
    	return str;
    }else{
    return  vulcanoUtil.getStringWithMinLenght(str + str, len);
    }
   
};




/*
 * Return id of a element, it it doesn't have one, set one auto generated id to the element and return it.
 * */
vulcanoUtil.getId = function(element){
	
	var uuid = $(element).attr("id");
	
	if(!uuid){
		uuid = vulcanoUtil.generateUUID(21);
		$(element).attr("id", uuid);	
	}
	
	return uuid;
	
};




