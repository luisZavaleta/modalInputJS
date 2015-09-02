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
	
	//Verify that to and from elements exists.
	if(!params.from){
		throw "No 'from' attribute  was sette for Modal with name: "+ params.name;
	}
	
	if(!params.to){
		throw "No 'to' attribute  was sette for Modal with name: "+ params.name;
	}
	if(!params.to.element){
		throw "No 'to.element' attribute  was sette for Modal with name: "+ params.name;
	}
	
	//set from default values			 
	if(!params.from.element){
		params.from.element = params.trigger.element;
	}
				
	if(!params.from.attribute){
		params.from.attribute = "val";
	}
				
	if(!params.from.prefix){
		params.from.prefix = "";
	}
				
	if(!params.from.sufix){
		params.from.sufix = "";
	}		
	
	//set to default values 
	if(!params.to.attribute){
		params.to.attribute = "val";
	}
					
	if(!params.to.prefix){
		params.to.prefix = "";
	}
					
	if(!params.to.sufix){
		params.to.sufix = "";
	}
	
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
			modalInput.afterOpenModal(params.from, params.to); 
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

modalInput.afterOpenModal = function(from, to){
	
	var data = modalInput.getFromData(from);
	modalInput.setToData(to,data);
	
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

