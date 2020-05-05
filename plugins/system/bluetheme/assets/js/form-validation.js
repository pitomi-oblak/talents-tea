jQuery(document).ready(function() {

	// hide messages 
	jQuery(".error").hide();
	jQuery(".success").hide();
	
	jQuery('#contact-form input').click(function(e) {
        jQuery(".error").fadeOut();
    });
	
	// on submit...
	jQuery("#contact-form button").click(function(event) {		event.preventDefault();
		jQuery(".error").hide();
		if(jQuery("#contact-form .g-recaptcha").length){
           grecaptcha.reset();
          }
		//required:
		
		//name
		var name = jQuery("input#name").val();
		if(name == ""){
			//$("#error").fadeIn().text("Name required.");
			jQuery('#fname').fadeIn('slow');
			jQuery("input#name").focus();
			return false;
		}
		
		//email (check if entered anything)
		var email = jQuery("input#email").val();
		//email (check if entered anything)
		if(email == ""){
			//$("#error").fadeIn().text("Email required");
			jQuery('#fmail').fadeIn('slow');
			jQuery("input#email").focus();
			return false;
		}
		
		//email (check if email entered is valid)

		if (email !== "") {  // If something was entered
			if (!isValidEmailAddress(email)) {
				jQuery('#fmail').fadeIn('slow'); //error message
				jQuery("input#email").focus();   //focus on email field
				return false;  
			}
		} 

	function isValidEmailAddress(emailAddress) {
	    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	    return pattern.test(emailAddress);
	};

		
		
		
		// comments
		var comments = jQuery("#msg").val();
		
		if(comments == ""){
			//$("#error").fadeIn().text("Email required");
			jQuery('#fmsg').fadeIn('slow');
			jQuery("input#msg").focus();
			return false;
		}
		var action = jQuery('#contact-form').attr('action');		

		jQuery.ajax({            
			type: 'POST',            
			url: action,            
			dataType: 'json',            
			data: jQuery('#contact-form').serialize(),            
			success: function(data) {                
				jQuery('.success').text(data.message);                
				success();  
                if(jQuery("#contact-form .g-recaptcha").length){
           grecaptcha.reset();
          }          
			}        
		});
	});  
		
		
	// on success...
	 function success(){
	 	jQuery(".success").fadeIn().delay(5000).fadeOut();
	 	jQuery("#contact-form")[0].reset();//.fadeOut();
	 }
	
    return false;
});

