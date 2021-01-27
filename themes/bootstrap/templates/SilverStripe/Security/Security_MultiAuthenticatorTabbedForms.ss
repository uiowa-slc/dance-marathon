<% loop $Forms.Reverse %>
<div class="form-tab" id="{$FormName}_Tab">
    <h3>$AuthenticatorName</h3>
    $forTemplate
</div>
<hr />
<% end_loop %>
