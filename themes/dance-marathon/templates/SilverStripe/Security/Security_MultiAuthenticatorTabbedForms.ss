
<% loop $Forms.Reverse %>
<div class="form-tab login-forms" id="{$FormName}_Tab">
	<h3>$AuthenticatorName</h3>
	$forTemplate
</div>
<% end_loop %>
