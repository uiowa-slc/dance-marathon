 <% include Sidebar %>

<div id="content" class="typography">

<style type="text/css">

.content-image {

	background: url(
	
	<% control ContentImage.SetWidth(354) %>
	
	$Filename
	
	<% end_control %>
	) no-repeat;
}

</style>

<% if ContentImage %>
 
<div class="content-image">
<div class="content-image-mask"></div>
</div><% end_if %> 

<h1>$Title</h1>

<p>$Content</p> 


  <form action="http://www.uiowa.edu/cgi-bin/formmail.pl" method="post" class="main_text">
     <input name="recipient" value="riverfest@uiowa.edu" type="hidden" />
     <input name="subject" value="Inquiry: Underwriting" type="hidden" />
     <input name="required" type="hidden" value="email" />

       <input name="missing_fields_redirect" type="hidden" value="http://riverfest.uiowa.edu/error.html" />
       <input name="redirect" type="hidden" value="http://riverfest.uiowa.edu/submitted.html" />
     <input name="env_report"type="hidden"  value="" />
     <table width="650" border="0" cellpadding="5" cellspacing="1"   class="text_table" style="border-collapse: separate;">
       <tbody>

         <tr>
           <th colspan="3" align="center" valign="top"></th>
         </tr>

         <tr >
           <td height="8" colspan="3" align="right" valign="top" ></td>
         </tr>
         <tr >
           <td height="20" colspan="3" align="left" valign="top" ><h3>Your personal contact information</h3></td>
         </tr>
         <tr >
           <td width="230" align="right" valign="top" > Full Name</td>

           <td colspan="2" align="left" valign="top" ><input name="realname" type="text" id="full_name" value="" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top" >Email</td>

           <td colspan="2" align="left" valign="top"><input name="email" id="email" type="text" />           </td>
         </tr>
         <tr >

           <td align="right" valign="top"> Phone</td>
           <td colspan="2" align="left" valign="top"><input name="Phone" id="phone" type="text" />           </td>
         </tr>

         <tr >
           <td align="right" valign="top">Fax</td>
           <td colspan="2" align="left" valign="top"><input name="Fax" id="fax" type="text" /></td>

         </tr>
         <tr >
           <td align="right" valign="top">Street Address</td>
           <td colspan="2" align="left" valign="top"><input name="Address" id="address" type="text" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top">City </td>

           <td colspan="2" align="left" valign="top"><input name="City" id="city" type="text" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top">State </td>

           <td colspan="2" align="left" valign="top"><input name="State" id="state" type="text" />           </td>
         </tr>
         <tr >

           <td height="34" align="right" valign="top">Zip Code</td>
           <td colspan="2" align="left" valign="top"><input name="Zip code" id="zip" type="text" />           </td>
         </tr>

         <tr>
           <td height="15" colspan="4" align="left" valign="top" ></td>
         </tr>
         <tr >

           <td height="20" colspan="3" align="left" valign="top" ><h3>Business/Product information</h3></td>
         </tr>
         <tr >
           <td height="34" align="right" valign="top">Name of business/product</td>

           <td colspan="2" align="left" valign="top"><input name="Business or Product's Name" id="underwritingname" type="text" />           </td>
         </tr>
         <tr >

           <td height="34" align="right" valign="top">Official website</td>
           <td colspan="2" align="left" valign="top"><input name="Business or Product's Website" id="underwritingwebsite" type="text" />           </td>
         </tr>

         <tr>
           <td height="15" colspan="4" align="left" valign="top" ></td>
         </tr>
       </tbody>

       <tr>
         <td height="20" colspan="3" align="left" valign="top"   ><h3>Brief description of your business/product</h3></td>
       </tr>
       <tr >

         <td height="125" colspan="3" align="center" valign="top"><textarea name="A brief description of your business/product:" cols="55" rows="6" id="interested"></textarea></td>
       </tr>
       <tr>

         <td height="20" colspan="4" align="left" valign="top"  ><h3> Where are you interested in seeing your advertisements?</h3></td>
       </tr>
       <tr >
         <td height="146" align="right" valign="top">During the event</td>

         <td align="left" valign="top"><input name="I'm interested in advertising... During the event" value="." type="checkbox" /></td>
         <td align="left" valign="top" class="text_small"><strong>Advertising options that take place during RiverFest:</strong>

             <ul>
               <li>Hang a corporate banner</li>
               <li>Sponsor a band</li>
               <li>Run a solicitation table</li>
               <li>On-stage mention</li>
             </ul></td>
       </tr>

       <tr >
         <td height="146" align="right" valign="top">Pre-event promotional materials</td>
         <td align="left" valign="top"><input name="I'm interested in advertising... In pre-event promotional materials" value="." type="checkbox" /></td>
         <td align="left" valign="top" class="text_small"><strong>Recognition on any of the following items:</strong>
             <ul>
               <li>Day-of schedule</li>

               <li>1/4 sheet flyers</li>

               <li>University Campus bus flyers (Cambus)</li>
               <li>Full sheet dorm ads</li>
               <li>Table tents</li>
               <li>ITC (computer lab) screen savers</li>
             </ul></td>
       </tr>
       <tr >

         <td height="146" align="right" valign="top"><p>Website</p></td>
         <td width="20" align="left" valign="top"><input name="I'm interested in advertising... On the website" value="." type="checkbox" />         </td>
         <td width="290" align="left" valign="top" class="text_small"><strong>Recognition on the sponsorship page</strong>
             <ul>
               <li>Displayed through November 30th, 2009, and then moved to the RiverFest archives page.</li>
             </ul>
           <p><strong>Logo on the the 'props' sidebar</strong></p>

           <ul>
               <li>234x60 grayscale graphic with logo displayed through November 30th, 2009.</li>
           </ul></td>
       </tr>
       <tr>
         <td height="13" colspan="3" align="left" valign="top"  ></td>
       </tr>
       <tr >

         <td colspan="3" align="left" valign="top"   class="text_small"><h3>This inquiry form is <strong>not</strong> a commitment. It has been put in place to streamline the process, which enables RiverFest to better understand your needs in a shorter amount of time.</h3>
           <p>By clicking &quot;submit&quot;, I verify that my answers above are correct to the best of my knowledge. I also understand that  this completed form does not guarantee a business deal with RiverFest, for reasons including, but not limited to, conflict of interest. If an agreement is reached, I will uphold all the policies and regulations of RiverFest and The University of Iowa. </p></td>
       </tr>
       <tr >

         <td height="42" colspan="3" align="center" valign="top"  >
             <input name="Submit" value="Submit" type="submit" />

         </td>
       </tr>
     </table>
   </form>



</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->