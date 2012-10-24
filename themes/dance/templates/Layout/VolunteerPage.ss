 <% include Sidebar %>

<div id="content" class="typography">

<style type="text/css">

.content-image {

	background: url(
	
	<% control ContentImage.SetWidth(354) %>
	
	$Filename
	
	<% end_control %>
	) no-repeat 0px 12px;
}

</style>

<% if ContentImage %>
 
<div class="content-image">
<div class="content-image-mask"></div>
</div><% end_if %> 

<h1>$Title</h1>

<p>$Content</p> 

<br /><br />
  <form action="http://www.uiowa.edu/cgi-bin/formmail.pl" method="post">
       <input name="recipient" value="riverfest@uiowa.edu" type="hidden" />
       <input name="subject" value="Application: Volunteer" type="hidden" />
       <input name="required" type="hidden" value="email" />

       <input name="missing_fields_redirect" type="hidden" value="http://riverfest.uiowa.edu/error.html" />
       <input name="redirect" type="hidden" value="http://riverfest.uiowa.edu/submitted.html" />
       <input name="env_report"type="hidden"  value="" />
 
     <table width="650" border="0" cellpadding="5" cellspacing="1" class="text" style="border-collapse: separate;">
       <tbody>

         <tr>
           <th colspan="3" align="center" valign="top"></th>
         </tr>

         <tr >
           <td height="8" colspan="3" align="right" valign="top" ></td>
         </tr>
         <tr >
           <td colspan="3" align="left" valign="top" ><h3>Your contact information</h3></td>
         </tr>
         <tr >
           <td width="266" align="right" valign="top" > Full Name</td>

           <td colspan="2" align="left" valign="top" ><input name="realname" type="text" id="full_name" size="30" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top" >Email</td>

           <td colspan="2" align="left" valign="top"><input name="email" type="text" id="email" size="30" />           </td>
         </tr>
         <tr >

           <td align="right" valign="top"> Phone</td>
           <td colspan="2" align="left" valign="top"><input name="Phone" type="text" id="phone" size="30" />           </td>
         </tr>
         <tr >

           <td align="right" valign="top">Street Address</td>
           <td colspan="2" align="left" valign="top"><input name="Address" type="text" id="address" size="30" />           </td>

         </tr>
         <tr >
           <td align="right" valign="top">City </td>
           <td colspan="2" align="left" valign="top"><input name="City" type="text" id="city" size="30" />           </td>
         </tr>

         <tr >
           <td align="right" valign="top">State </td>

           <td colspan="2" align="left" valign="top"><input name="State" type="text" id="state" size="30" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top">Zip Code</td>
           <td colspan="2" align="left" valign="top"><input name="Zip code" type="text" id="zip" size="30" />           </td>
         </tr>
         <tr >

           <td align="right" valign="top">University Status</td>
           <td colspan="2" align="left" valign="top"><select name="University status" size="1" id="University status">
               <option>Select... </option>
               <option value="Freshman">Freshman</option>
               <option value="Sophomore">Sophomore</option>
               <option value="Junior">Junior</option>

               <option value="Senior">Senior</option>
               <option value="Faculty">Faculty</option>
               <option value="Staff">Staff</option>
               <option value="None">None</option>
           </select></td>
         </tr>
         <tr>

           <td height="15" colspan="4" align="left" valign="top" ></td>
         </tr>
         <tr>
           <td colspan="4" align="left" valign="top"  ><h3>Where would you like to volunteer?</h3></td>
         </tr>
         <tr >

           <td height="48" align="right" valign="top">Day-of Events</td>

           <td width="20" align="left" valign="top"><input name="I'd like to volunteer for... Day of Events" value="." type="checkbox" /></td>
           <td align="left" valign="top" class="text_table_small"><ul>
             <li>assisting at an activity or info booth</li>
             <li>set-up &amp; tear-down</li>
             <li>odd jobs</li>
           </ul></td>

         </tr>
         <tr >
           <td align="right" valign="top">Marketing</td>
           <td align="left" valign="top"><input name="I'd like to volunteer for... Marketing" value="." type="checkbox" /></td>
           <td align="left" valign="top" class="text_table_small"><ul>
             <li> Street Team</li>
             <li>Ad creation/development</li>

             <li>Spreading the word</li>
           </ul></td>
         </tr>
         <tr >
           <td height="34" align="right" valign="top">Music</td>
           <td align="left" valign="top"><input name="I'd like to volunteer for... Music" value="." type="checkbox" /></td>
           <td width="258" align="left" valign="top" class="text_table_small"><ul>
             <li>Researching bands</li>

             <li>Assisting in the band selection process</li>
             </ul></td>
         </tr>
         <tr >
           <td align="right" valign="top">Fundraising / Underwriting</td>

           <td align="left" valign="top"><input name="I'd like to volunteer for... Fundraising" value="." type="checkbox" /></td>
           <td align="left" valign="top" class="text_table_small"><ul>

             <li> Contacting individuals for donations</li>
             <li>Arranging underwriting (aka: advertising) deals with local &amp; regional businesses</li>
           </ul></td>
         </tr>
         <tr >
           <td align="right" valign="top">Photography / Videography</td>

           <td align="left" valign="top"><input name="I'd like to volunteer for... Photography/Videography" value="." type="checkbox" /></td>
           <td align="left" valign="top" class="text_table_small"><ul>
             <li>Taking photos of performances &amp; activities</li>
             <li>Recording video of concert performances</li>
           </ul></td>
         </tr>

         <tr >
           <td height="38" align="right" valign="top">My 1st choice</td>
           <td colspan="2" align="left" valign="top"><select name="My 1st Choice" id="1st Choice">
               <option selected="selected">Select...</option>
               <option>Day-of Events</option>
               <option>Marketing</option>

               <option>Music</option>
               <option>Fundraising/Underwriting</option>
               <option>Photography/Videography</option>
               <option>All of the above</option>
           </select></td>
         </tr>
         <tr >

           <td height="38" align="right" valign="top">My 2nd choice</td>
           <td colspan="2" align="left" valign="top"><select name="My 2nd Choice" id="2nd Choice">
               <option selected="selected">Select...</option>
               <option>Day-of Events</option>
               <option>Marketing</option>
               <option>Music</option>

               <option>Fundraising/Underwriting</option>
               <option>Photography/Videography</option>
           </select></td>
         </tr>
         <tr>
           <td height="13" colspan="3" align="left" valign="top"  ></td>
         </tr>
       </tbody>

       <tr>
         <td colspan="3" align="left" valign="top"   ><h3>Please briefly tell us why you are interested in volunteering at RiverFest.</h3></td>
       </tr>
       <tr >
         <td height="130" colspan="3" align="center" valign="top"><textarea name="Why are you applying to volunteer at RiverFest?" cols="60" rows="6" id="Why are you applying to volunteer at RiverFest?"></textarea></td>
       </tr>
       <tr>
         <td colspan="3" align="left" valign="top"   ><h3>Times you are available:</h3></td>

       </tr>
       <tr >

         <td height="96" colspan="3" align="center" valign="top"><textarea name="Days Available" cols="60" rows="4" id="interested">
April 24th:
April 25th:
</textarea></td>
       </tr>
       <tr >
         <td colspan="3" align="left" valign="top"   class="text_small">By clicking &quot;submit&quot;, I verify that my answers above are correct to the best of my knowledge. I also understand that  this completed application is not a guarantee placement as a RiverFest volunteer. If selected, I will uphold all the policies and regulations of RiverFest and The University of Iowa.</td>

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