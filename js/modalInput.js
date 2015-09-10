var debug = true;
var verbose = false; // uset to print useful error messages in the controller.

/**
 * Name: 			modalInput.js
 * 
 * Description:		Creates and configure a modal window dinamicaly.
 * 
 */

var minHtml = '<div id="modalBaseContainer"><div id="%modalInputId%" class="modal %vulcanoModalFade%" role="dialog"> <div class="modal-dialog %vulcanoModalSize%"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" style="color: red;">&times;</button> <h4 class="modal-title">%vulcanoModalHeader%</h4> </div> <div class="modal-body"> <div class="container-fluid"> %vulcanoModalHtml% </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary saveButton">%vulcanoModalSave%</button> <button type="button" class="btn btn-warning closeButton" data-dismiss="modal">%vulcanoModalClose%</button> </div> </div> </div></div></div>';

//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';

	
	
	
	
	var modalInput ={};


 
var modalSizeLarge =["lg", "large", "modal-lg"];  
var modalSizeSmall =["sm", "small", "modal-sm"]; 

//Medium values not included in modalSizes, because everithing that is not large or small will be treated ad medium.
var modalSizes = modalSizeSmall.concat(modalSizeLarge); 



/**
 *  ============ CREATE THE MODAL AND SET THE ELEMENT THAT WILL TRIGER IT =========
 * 
 * @param verbose:				Indicates if we want log messages in the console.
 * @param name:					Identifier for log messages.
 * 
 * @param trigger:				JSON Containing the data of the element that will trigger the open of the modal window.
 * @param trigger.selector:		Jquery Selector of the element that will triger the modal window. default: modalButton.
 * @param trigger.parent:		Parent Element thet contains the selector.
 * @param trigger.index:		Index of the element selector element, default is 0.
 * @param trigger.event:		Event that will triger the modal, default "click"
 * 
 * @param html: 				Html that will wi put in the body of the modal.
 * @param event: 				
 * @param size:		 			Size o the modal, can be: lg, large, modal-lg, md, medium, modal-md, sm, small, modal-sm: default: md.
 * @param fade: 				Boolean, If false, modal just appears and dissapears.
 * @param options:		 		JSON with modal options.
 * @param headerText: 			Text to be set in the header.
 * @param closeLabel:		 	Text for the close button, default Cerrar.
 * @param saveLabel:		    Text for save button, default Guardar.
 * @param closeOnSave:		  	Boolean, thar indicates if we should close the modal if the user decide to save, default true. 
 */



modalInput.modalInput = function(params){
	
	
	if(vulcanoUtil.isArray(params)){
		
		for(var i = 0; i<params.length; i++){
			
			console.log("PARAM MULTIPLE ===>"+JSON.stringify(params[i]));
			
			modalInput.createModal(params[i]);
		}
		
		
	}else{
		
		modalInput.createModal(params);
	}
	
	
};





/*
 * Main method, create and configure the modalInput functionality
 * */
modalInput.createModal = function(params){	
	
	//Set hidden html to the document.	
	
	
	//TODO:
	

	
	modalInput.openModal(params); 

	
	
};


modalInput.addModalInput =   function addModalInput(params){
	
	
	if(!$("#modalInputId")[0]){
		$("html").append(minHtml);
	}

	
	params = modalInput.setDefaultValues(params);	
	
};

/**
 * Set default values if neccesary.
 */
modalInput.setDefaultValues = function(params){
	
	
	if(params.verbose === true){
		verbose = true;
	}
	
	if(!params){
		params = {};
	}
	
	
	if(!params.trigger){
		
		params.trigger = {};	
		params.trigger.element = {};
		
		params.trigger.element.selector = ".modalButton";
		params.trigger.event = "click";
		
	}else{
		
		if(!params.trigger.element){
			params.trigger.element = {};
		}
			
		if(!params.trigger.element.selector){
			params.trigger.element.selector = ".modalButton";
		}
		
		if(!params.trigger.event){
			params.trigger.event = "click";
		}	
		
	}
	
	
	if(!params.modal){
		
		params.modal = {};
		params.modal.fade = "fade";
		params.modal.options = {};
		params.modal.closeLabel = "Cerrar";
		params.modal.saveLabel = "Guardar";
		params.modal.headerText = "Vulcano Modal Input";
		params.modal.html = "<h1>Hola Mundo</h1>";
		params.modal.closeOnSave = true;	
		
	}else{
		
		if(!params.modal.fade || params.modal.fade){
			params.modal.fade = "fade";
		}
		
		if(!params.modal.options){
			params.modal.options = {};
		}
		
		if(!params.modal.closeLabel){
			params.modal.closeLabel = "Cerrar";
		}
		
		if(!params.modal.saveLabel){
			params.modal.saveLabel = "Guardar";
		}
		
		if(!params.modal.headerText){
			params.modal.headerText = "Vulcano Modal Input";
		}
		
		if(!params.modal.html){
			params.modal.html = "<h1>Hola Mundo</h1>";
		}
		
		if(params.modal.closeOnSave != false && !params.modal.closeOnSave){
			params.modal.closeOnSave = true;
		}
	}
	
	params.modal.size = modalInput.getModalSize(params.modal.size);
	
	
	var elements = params.elements;
	
	
	if(!elements){
		throw "No 'elements' attribute  was sette for Modal with name: "+ params.name;	
	}else if(!vulcanoUtil.isArray(elements)  || elements.length < 1 ){
		throw "'Elements' attribute  should be a non-empty array: "+ params.name;	
	}
	
	
	if(elements.length == 1 && !elements[0].from.element){
		
		// If no from setted and only one element in te array, then the triger element is used as the from element.
		elements[0].from.element  = params.trigger.element;	
	};	
	
	
	for(var i = 0; i < elements.length; i++){
		
		
		
		if(!elements[i].from.attribute){
			elements[i].from.attribute = "val";
		}
		
		if(!elements[i].to.attribute){
			elements[i].to.attribute = "val";
		}
		
		//substitute for an ampty string to avoid undefined errors.
		if(!elements[i].from.prefix){
			elements[i].from.prefix = "";
		}
		
		if(!elements[i].from.sufix){
			elements[i].from.sufix = "";
		}		
		
		if(!elements[i].to.prefix){
			elements[i].to.prefix = "";
		}
		
		if(!elements[i].to.sufix){
			elements[i].to.sufix = "";
		}
		
		
	};
	
	
	return params;

};

/*
 * Open the modal window
 * */
modalInput.openModal = function(params){

	
	var element = params.trigger.element;
	var triggerElement = getHtmlElement(element.selector, element.index, element.parent);

	triggerElement.on(params.trigger.event, function(){
		
		
		modalInput.addModalInput(params);
		
		if(debug){
			console.log("PARAMS");
			console.log(params);
		}
		
		modalInput.replaceModal(params);
		
		
		$("#modalInputId").modal(params.modal.options);
		
		$('#modalInputId').on('shown.bs.modal', function (e) {
			
			console.log("AAA");
			console.log(JSON.stringify(params.elements));
			modalInput.afterOpenModal(params.elements); 
		});	
		
		modalInput.save();
		modalInput.close();
		
	});
	
};



modalInput.getModalSize = function(modalSize){
	
	var sizeString ="";	
	
	
	if(!!modalSize && modalSizes.contains(modalSize, true)){	
		if(modalSizeLarge.contains(modalSize, true)){
			sizeString = "modal-lg";
		}else{
			sizeString = "modal-sm";
		}		
	}
	
	return sizeString;
};


modalInput.getModalHtml = function(params){
	
	
	var modalBaseHtml = $("#modalBaseContainer").html(); 
	
	modalBaseHtml = vulcanoUtil.template(modalBaseHtml, {	
		
		modalInputId : "modalInputId",
		vulcanoModalFade: params.modal.fade,
		vulcanoModalSize: params.modal.size,
		vulcanoModalHeader: params.modal.headerText,
		vulcanoModalHtml: params.modal.html,
		vulcanoModalSave: params.modal.saveLabel,
		vulcanoModalClose: params.modal.closeLabel
		
	});
	
	
	return modalBaseHtml;
	
};



/**
 * In this method we will set all the configuration necessary after the element had rendered.
 */
modalInput.afterModalRender = function(params){
	
	if(params.modal.closeOnSave){
		$(".saveButton").attr("data-dismiss", "modal");
	}
	
};


modalInput.replaceModal = function(params){
	
	$("#modalInputId").remove();
	$("html").append(modalInput.getModalHtml(params));
	modalInput.afterModalRender(params);
	
}; 

modalInput.afterOpenModal = function(elements){
	
	
	var editedElementIds = "";
	
	for(var i = 0; i< elements.length; i++){
		var element = elements[i];
		
		
		var fromElement  = vulcanoUtil.getHtmlElement(element.from.element);
		var toElement = vulcanoUtil.getHtmlElement(element.to.element);
		
		var data = modalInput.getFromData(element.from, fromElement);
		
		modalInput.setToData(element.to, data, toElement);	
		
		
		var fromId	=  	vulcanoUtil.getId(fromElement);	
		var toId 	= 	vulcanoUtil.getId(toElement);
		
		element.from.id = fromId;
		element.to.id = toId;

		
		if(i != 0 ){
			editedElementIds +=  ";";
		}
		editedElementIds += modalInput.addAttributes(element);	
	};
	
	$(".modal-content").attr("data-elements-ids", editedElementIds);
	
};


/*
 * get data
 * */

modalInput.getFromData = function(from, fromElement){
	var element = null;	
	
	if(!!fromElement){
		element = fromElement;
	}else{
		element = vulcanoUtil.getHtmlElement(from.element);
	}

	var data = vulcanoUtil.getDataFromDOM(element, from.attribute);
	
	if(!!data){
		data = data.trim();
	}

	return from.prefix + data+ from.sufix;
	
};


modalInput.setToData = function(to, value, toElement){
	
	var element = null;
	
	if(!toElement){
		element = toElement;
	}else{
		element =  vulcanoUtil.getHtmlElement(to.element);
	}
	
	vulcanoUtil.setDataToDOM(element, to.attribute, value);
	
};

/**
 * Generate dynamic class and add it to the elements, add new attribute to the json with this identifier.
 * 
 * @return:  The selector that will be used as attribute holder in the modal.
 */
modalInput.addAttributes = function(element){	
	
	var from = element.from;
	var to = element.to;
	
	var toSelector = "#"+to.id;
	
	$(toSelector).attr("data-to-attribute",to.attribute);
	$(toSelector).attr("data-to-prefix",to.prefix);
	$(toSelector).attr("data-to-sufix",to.sufix);
	$(toSelector).attr("data-from-id",from.id);
	$(toSelector).attr("data-from-attribute",from.attribute);
	
	
	return to.id;
};






modalInput.save = function(){
	
	$(".saveButton").on("click", function(){
		
		alert("save");			
		var elementsIds = $(".modal-content").attr("data-elements-ids");
		
		elementsIds = elementsIds.split(";");
		
		for(var i =0; i< elementsIds.length; i++){
			
			
			var element = $("#"+elementsIds[i]);
			
			var toAttribute = element.attr("data-to-attribute");
			var toPrefix = element.attr("data-to-prefix");
			var toSufix = element.attr("data-to-sufix");
			var fromId = element.attr("data-from-id");
			var fromAttribute = element.attr("data-from-attribute");
			

			var toValue = "";
			
			if(!!toPrefix){
				toValue += toPrefix;
			}
			
			toValue +=vulcanoUtil.getDataFromDOM(element, toAttribute);
			
			if(!!toSufix){
				toValue += toSufix;
			}

			vulcanoUtil.setDataToDOM("#"+fromId, fromAttribute, toValue);	
		
		}

		
	});
};



modalInput.close = function(){
	

	$(".closeButton").on("click", function(){
		alert("close");
	});
};

















