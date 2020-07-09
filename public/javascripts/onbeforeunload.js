
console.log('####### > onbeforeunload.js 1 !!!!!!!!!!!!');

window.onbeforeunload = function() { 
	console.log('####### > onbeforeunload.js > window.onbeforeunload 2 !!!!!!!!!!!!!!');
	//$('.clrFavForm').trigger('click');
	var frmID = document.getElementById("addNewCommentViewFormID");
	frmID.reset();
    $("#state").val('').trigger('change');
    $(frmID).find(".form-group").removeClass("has-error"); 
    $(frmID).data('validator').resetForm(); 
};