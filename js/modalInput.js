var debug = true;

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
	
	if(!params){
		params = {};
	}
	


	
	if(!params.trigger){
		
		params.trigger = {};	
		params.trigger.selector = ".modalButton";
		params.trigger.event = "click";
		
	}else{
			
		if(!params.trigger.selector){
			params.trigger.selector = ".modalButton";
		}
		
		if(!params.trigger.event){
			params.trigger.event = "click";
		}	
		
	}
	
	
	
	
	
	if(!params.fade || params.fade){
		params.fade = "fade";
	}
	
	if(!params.options){
		params.options = {};
	}
	
	if(!params.closeLabel){
		params.closeLabel = "Cerrar";
	}
	
	if(!params.saveLabel){
		params.saveLabel = "Guardar";
	}
	
	if(!params.headerText){
		params.headerText = "Vulcano Modal Input";
	}
	
	if(!params.html){
		params.html = "<h1>Hola Mundo</h1>";
	}
	
	if(params.closeOnSave != false && !params.closeOnSave){
		params.closeOnSave = true;
	}
	
	
	
	
	params.size = modalInput.getModalSize(params.size);
	
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
	


	var triggerElement = getHtmlElement(params.trigger.selector, params.trigger.index, params.trigger.parent);

	triggerElement.on(params.trigger.event, function(){
		$("#modalInputId").modal(params.options);
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
		vulcanoModalFade: params.fade,
		vulcanoModalSize: params.size,
		vulcanoModalHeader: params.headerText,
		vulcanoModalHtml: params.html,
		vulcanoModalSave: params.saveLabel,
		vulcanoModalClose: params.closeLabel
		
	});
	
	
	return modalBaseHtml;
	
};



/**
 * In this method we will set all the configuration necessary after the element had rendered.
 */
modalInput.afterModalRender = function(params){
	
	if(params.closeOnSave){
		$(".saveButton").attr("data-dismiss", "modal");
	}
	
};



modalInput.replaceModal = function(params){
	
	$("#modalInputId").remove();
	$("html").append(modalInput.getModalHtml(params));
	modalInput.afterModalRender(params);
	
}; 




var params = {};


