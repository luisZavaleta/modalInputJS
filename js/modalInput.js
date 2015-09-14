var debug = true;
var verbose = false; // uset to print useful error messages in the controller.
var postProcess = {};

/**
 * Name: 			modalInput.js
 * 
 * Description:		Creates and configure a modal window dinamicaly.
 * 
 */

var minHtml = '<div id="modalBaseContainer"><div id="%modalInputId%" class="modal %vulcanoModalFade%" role="dialog"> <div class="modal-dialog %vulcanoModalSize%"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" style="color: red;">&times;</button> <h4 class="modal-title">%vulcanoModalHeader%</h4> </div> <div class="modal-body"> <div class="container-fluid"> %vulcanoModalHtml% </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary saveButton">%vulcanoModalSave%</button> <button type="button" class="btn btn-warning closeButton" data-dismiss="modal">%vulcanoModalClose%</button> </div> </div> </div></div></div>';

	
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
 * @param html: 				String:		Html that will wi put in the body of the modal.
 * @param event: 				String:
 * @param size:		 			Integer:	Size o the modal, can be: lg, large, modal-lg, md, medium, modal-md, sm, small, modal-sm: default: md.
 * @param fade: 				Boolean: 	If false, modal just appears and dissapears.
 * @param options:		 		JSON: 		With modal options.
 * @param headerText: 			String: 	To be set in the header.
 * @param closeLabel:		 	String: 	For the close button, default Cerrar.
 * @param saveLabel:		    String: 	For save button, default Guardar.
 * @param closeOnSave:		  	Boolean: 	That indicates if we should close the modal if the user decide to save, default true. 
 * 
 * @param element*.from.beforeSet:	Function:  	Receive as a parameter the text that is getted from the main window, 
 * 												return the  text that will be setted in the modal.
 * @param element*.to.beforeSet:	Function:  	Receive as a parameter the text that is getted from the modal, 
 * 												return the  text that will be setted in the main window.
 */

modalInput.modalInput = function(params){
	
	if(vulcanoUtil.isArray(params)){
		for(var i = 0; i<params.length; i++){			
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

modalInput.getFromData = function(from, fromElement, preProcessFunction){
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
	
	if(!!from.beforeSet  && vulcanoUtil.isFunction(from.beforeSet)){
		data = from.beforeSet(data);
	}else{
		if(verbose){
			console.log("afterReturnFunction do not exist or is not a function");
		};		
	}

	return  data;
	
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
	$(toSelector).attr("data-from-id",from.id);
	$(toSelector).attr("data-from-attribute",from.attribute);
	
	
	
	
	if(!!to.beforeSet && vulcanoUtil.isFunction(to.beforeSet)){	
		postProcess[from.id] = to.beforeSet;
	}
	
	
	
	
	
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

			var fromId = element.attr("data-from-id");
			var fromAttribute = element.attr("data-from-attribute");
			

			var toValue = "";
			

			toValue +=vulcanoUtil.getDataFromDOM(element, toAttribute);			
	
			var beforeSet = postProcess[fromId];
			delete postProcess[fromId];
			
			if(!!beforeSet){
				toValue = beforeSet(toValue);
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

















