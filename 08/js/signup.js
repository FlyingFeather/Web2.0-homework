$(function() {
	$('input:not(.button)').blur(function() {
		if (validator.isFieldValid(this.id, $(this).val())) {
			$(this).parent().find('.error').text('').hide();
		} else {
			$(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
		}
	});
	$('input.submit').click(function() {
		$('input:not(.button)').blur();
		if (!validator.isFormValid()) return false;
	});
	$('input.reset').click(function() {
		$('#username, #email, #phone, #sid').value="";
		$('input:not(.button)').parent().find('.error').text('').hide();
	});
});