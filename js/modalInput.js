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




/*
 * Main method, create and configure the modalInput functionality
 * */
modalInput.createModal = function(params){	
	
	//Set hidden html to the document.	
	
	if(!$("#modalInputId")[0]){
		$("html").append(minHtml);
	}
	
	params = modalInput.setDefaultValues(params);	
	
	modalInput.openModal(params); 
	
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
	
	if(debug){
		console.log("PARAMS");
		console.log(params);
	}
	
	modalInput.replaceModal(params);
	
	var element = params.trigger.element;
	var triggerElement = getHtmlElement(element.selector, element.index, element.parent);

	triggerElement.on(params.trigger.event, function(){
		$("#modalInputId").modal(params.modal.options);
		
		$('#modalInputId').on('shown.bs.modal', function (e) {
			
			
			modalInput.afterOpenModal(params.elements); 
		});	
		
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
	
	
	for(var i = 0; i< elements.length; i++){
		var element = elements[i];
		var data = modalInput.getFromData(element.from);
		modalInput.setToData(element.to,data);	
		
	};
	

	/*
	var backElement = null;
	
	if(!!back){
		back = from; 
	}
	
	modalInput.generateUniqueIdentifiers(backElement); */
	
};

modalInput.getFromData = function(from){

	var element = vulcanoUtil.getHtmlElement(from.element);
	var data = vulcanoUtil.getDataFromDOM(element, from.attribute);

	return from.prefix + data+ from.sufix;
	
};


modalInput.setToData = function(to, value){
	
	var element = vulcanoUtil.getHtmlElement(to.element);
	vulcanoUtil.setDataToDOM(element, to.attribute, value);
	
};

/**
 * Generate dynamic class and add it to the elements, add new attribute to the json with this identifier.
 */
modalInput.generateUniqueIdentifiers = function(fromElement, toElement, backElement){	

	var identifiers = {};
	
	var attributeHolderElement = $(".modal-content");
	identifiers.back = vulcanoUtil.generateUniqueClassIdentifier(toElement, attributeHolderElement, "data-back");
	$(toElement).attr("data-attribute", backElement.attribute);	
	$(toElement).attr("data-prefix", backElement.attribute);	
	
	
	
	//agregar element-size si es multiple, 
	
	return identifiers;
};














