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
     <input name="subject" value="Application: Director" type="hidden">
   <input name="required" type="hidden" value="email">
       <input name="missing_fields_redirect" type="hidden" value="http://riverfest.uiowa.edu/error.html" />
       <input name="redirect" type="hidden" value="http://riverfest.uiowa.edu/submitted.html" />
   <input name="env_report"type="hidden"  value="">

        <table width="650" border="0" cellpadding="5" cellspacing="1" class="text" style="border-collapse: separate;">

<tbody>


<tr  ><td colspan="3">
         
  </p><br />

  <p align="left"></td>
</tr>

 <tr >
           <td height="8" colspan="3" align="right" valign="top" ></td>

         </tr>

<tr >
           <td colspan="3" align="left" valign="top" ><h3>Your contact information</h3></td>
         </tr>

<tr >
           <td width="200" align="right" valign="top" > Full Name</td>
           <td colspan="2" align="left" valign="top" ><input name="realname" type="text" id="full_name" size="34" />           </td>

         </tr>
         <tr >
           <td align="right" valign="top" >Email</td>

           <td colspan="2" align="left" valign="top"><input name="email" type="text" id="email" size="34" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top"> Phone</td>

           <td colspan="2" align="left" valign="top"><input name="Phone" type="text" id="phone" size="34" />           </td>
         </tr>
         <tr >

           <td align="right" valign="top"> Street Address</td>
           <td colspan="2" align="left" valign="top"><input name="Address" type="text" id="address" size="34" />           </td>
         </tr>

         <tr >
           <td align="right" valign="top">City </td>
           <td colspan="2" align="left" valign="top"><input name="City" type="text" id="city" size="34" />           </td>
         </tr>

         <tr >
           <td align="right" valign="top">State </td>
           <td colspan="2" align="left" valign="top"><input name="State" type="text" id="state" size="34" />           </td>

         </tr>
         <tr >
           <td align="right" valign="top">Zip Code</td>
           <td colspan="2" align="left" valign="top"><input name="Zip code" type="text" id="zip" size="34" />           </td>
         </tr>
         <tr >
           <td align="right" valign="top">University Status</td>

           <td colspan="2" align="left" valign="top"><select name="University status" size="1" id="University status">
               <option>Select... </option>
               <option value="Freshman">Freshman</option>
               <option value="Sophomore">Sophomore</option>
               <option value="Junior">Junior</option>
               <option value="Senior">Senior</option>

               <option value="Grad Student">Grad Student</option>
           </select></td>
         </tr>
         <tr >
           <td align="right" valign="top">Major</td>
           <td colspan="2" align="left" valign="top"><input name="Major" type="text" id="major" size="34" /></td>
         </tr>
  <tr>

    <td height="13" colspan="4" align="left" valign="top"  ></td>
  </tr>
  <tr><td colspan="4" align="left"  >
<h3>I would like to apply for...</h3></td>
</tr>

<tr >
<td width="200" align="right" valign="top"> Executive Director</td>
<td width="5%" align="left" valign="top"> 
  <input name="I'm applying for Executive Director" value="." type="checkbox"> </td>

  <td width="60%" align="left" valign="top" class="text_small">Ensures all events during the RiverFest weekend run smoothly.  Leads weekly meetings, plans a council retreat, and keeps communication lines open between all members on the Executive Committee as well as with various UI departments and community  businesses and organizations.  Serves as the go-to person for questions regarding the event and is knowledgeable regarding all aspects of RiverFest.  Orders the necessary equipment for the event.  <em>Prior RiverFest experience is recommended.</em></td>
</tr>

<tr >
  <td align="right" valign="top" >Off-stage Programs Director </td>
<td align="left" valign="top"> 
  <input name="I'm applying for Off-Stage Programs Director" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Books events, activities, and/or speakers for the event.  Communicates with student  organizations, university departments, and local agencies to schedule programs  &amp; activities for RiverFest.</td>

</tr>

<tr >
<td align="right" valign="top">On-stage Talent Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for On-Stage Talent Director" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Books talent to perform on-stage at RiverFest.  Works with a small budget and maintains constant communication with  performers.  Knowledge of local music scene desired.  Works with SCOPE to coordinate music headliner.</td>
</tr>

<tr >
<td align="right" valign="top"> Hospitality Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Hospitality Director" value="." type="checkbox"> </td>

<td align="left" valign="top" class="text_small">Coordinates all aspects of RiverFEAST. Responsibilities include: contacting vendors, drawing up vendor contracts, fulfilling vendor requests, and ensuring all appropriate food and health safety codes are followed by working with IMU Catering.</td>
</tr>



<tr >
<td align="right" valign="top">Volunteer Coordinator</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Volunteer Coordinator" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Recruits volunteers, maintains a database, and coordinates volunteer schedules to make sure all areas have enough volunteers. </td>
</tr>
  
  
  
<tr >

<td align="right" valign="top">Finance Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Finance Director" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Coordinates the RiverFest budget and ensures that all areas of the council are within  budget. Works with the Executive Director to ensure that all re-allocation and  supplemental funding forms are filed on time with SABAC. Plans the Fiscal Year  2011 Budget; completes and submits the FY2011 Budget Request with SABAC.</td>
</tr>



<tr >
<td align="right" valign="top">Marketing Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Marketing Director" value="." type="checkbox"> </td>

<td align="left" valign="top" class="text_small">Markets and promotes RiverFest. Works closely with Executive Director, On/Off-Stage Directors, and IMU Marketing &amp; Design to determine the marketing plan for the year.  Works with University and community businesses, organizations and media outlets.</td>
</tr>



<tr >
<td align="right" valign="top">Web Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Web Director" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Updates and maintains the glorious RiverFest website.</td>
</tr>



<tr >
  <td align="right" valign="top">Public Relations Director</td>
  <td align="left" valign="top"><input name="I'm applying for Public Relations Director" value="." type="checkbox"></td>
  <td align="left" valign="top" class="text_small">Develops press releases, contacts various media outlets concerning RiverFest promotion, collaborates with Web Director to keep the website updated and accurate.</td>
</tr>


  
<tr >

<td align="right" valign="top">Development Director</td>
<td align="left" valign="top"> 
  <input name="I'm applying for Development Director" value="." type="checkbox"> </td>
<td align="left" valign="top" class="text_small">Acquires sponsorships and donations for RiverFest by developing relationships with area  businesses and organizations. Helps coordinate the budget with the Finance and  Executive Director. </td>
</tr>
  



<tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>
  <tr>
    <td height="29" colspan="3" align="left"><h3>Please rank the positions   you are applying for starting with 1 being your first choice.</h3></td>

  </tr>
  
  
  <tr >
<td align="right" valign="top">
What's your 1st choice? </td>
<td colspan="2" align="left" valign="middle">
 
<select name="My 1st Choice" id="1st Choice">
<option selected="selected">Select...</option>
<option>Executive Director</option>
<option>Off-stage Programs Director</option>
<option>On-stage Talent Director</option>

<option>Finance Director</option>
<option>Hospitality Director</option>
<option>Volunteer Coordinator</option>
<option>Marketing Director</option>
<option>Web Director</option>
<option>Public Relations Director</option>
<option>Development Director</option>
</select></td>
</tr>

<tr >
<td align="right" valign="top">
What's your 2nd choice? </td>
<td colspan="2" align="left" valign="middle">
 
<select name="My 2nd Choice" id="2nd Choice">
<option selected="selected">---</option>
<option>Executive Director</option>
<option>Off-stage Programs Director</option>
<option>On-stage Talent Director</option>
<option>Finance Director</option>

<option>Hospitality Director</option>
<option>Volunteer Coordinator</option>
<option>Marketing Director</option>
<option>Web Director</option>
<option>Public Relations Director</option>
<option>Development Director</option>
</select></td></tr>
<tr >


  <td align="right" valign="top">What's your 3rd choice?</td>

  <td colspan="2" align="left" valign="middle"><select name="My 3rd Choice" id="3rd Choice">
<option selected="selected">---</option>
<option>Executive Director</option>
<option>Off-stage Programs Director</option>
<option>On-stage Talent Director</option>
<option>Finance Director</option>
<option>Hospitality Director</option>
<option>Volunteer Coordinator</option>
<option>Marketing Director</option>

<option>Web Director</option>
<option>Public Relations Director</option>
<option>Development Director</option>
</select></td>
</tr>


<tr >
  <td align="right" valign="top">What's your 4th choice?</td>
  <td colspan="2" align="left" valign="middle"><select name="My 4th Choice" id="4th Choice">
<option selected="selected">---</option>

<option>Executive Director</option>
<option>Off-stage Programs Director</option>
<option>On-stage Talent Director</option>
<option>Finance Director</option>
<option>Hospitality Director</option>
<option>Volunteer Coordinator</option>
<option>Marketing Director</option>
<option>Web Director</option>
<option>Public Relations Director</option>

<option>Development Director</option>
</select></td>
</tr>

  <tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>
  <tr>
    <td colspan="3" align="left" ><h3>Why are you applying for the position you ranked number 1? What skills or traits do you possess that would benefit you if you were to be selected for this position?</h3></td>
</tr>

<tr ><td colspan="3" align="center" valign="top">
<textarea name="Why are you applying for your top choice? What skills or traits do you possess that would benefit you if you were to be selected for this position?" cols="60" rows="6" id="interested"></textarea></td></tr>

  <tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>

        <tr ><td colspan="3" align="left" valign="top" ><h3>As a member of the RiverFest       Executive Council you will have to work with 8 other students.  What specific aspects of your personality do you think would be a benefit to the RiverFest Council? How do you deal with someone whose personality conflicts with yours or someone else on the council?  Do you have past experiences that have helped you to build your skills in group dynamics?  If so, please tell us  about them.</h3></td>
</tr>

<tr ><td colspan="3" align="center" valign="top">
<textarea name="As a member of the RiverFest Executive Council you will have to work with 8 other students. What specific aspects of your personality do you think would be a benefit to the RiverFest Council? How do you deal with someone whose personality conflicts with yours or someone else on the council? Do you have past experiences that have helped you to build your skills in group dynamics? If so, please tell us about them." cols="60" rows="6" id="interested"></textarea></td></tr>

  <tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>

    <tr ><td colspan="3" align="left" valign="top" ><h3>What strategies or ideas do you think would increase the total attendance of students at the event? Describe your ideas in detail.</h3></td>
</tr>

<tr ><td colspan="3" align="center" valign="top">

<textarea name="What strategies or ideas do you think would increase the total attendance of students at the event?" rows="6" cols="60" id="Available"></textarea> </td></tr>

  <tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>

    <tr >
      <td colspan="3" valign="top" ><h3>Please email your resume to <a href="riverfest@uiowa.edu"><u>riverfest@uiowa.edu</u></a>. <em>If you don't have a resume, simply list all campus and community commitments in the box below.</em></h3></td>

    </tr>
    <tr align="center" >
      <td colspan="3" valign="top"  ><textarea name="Please tell us about your campus and community commitments" rows="4" cols="60" id="textarea">(If you email us a resume, you may leave this blank)</textarea></td>
    </tr>
    
      <tr>
    <td height="13" colspan="3" align="left" valign="top"  ></td>
  </tr>
    
    <tr >

      <td height="49" colspan="3" align="left"  class="text_small">By clicking &quot;submit&quot;, I verify that my answers above are correct to the best of my knowledge. I also understand that  this completed application is not a guarantee placement as a RiverFest director. If selected, I will uphold all the policies and regulations of RiverFest and The University of Iowa.</td>
  </tr>

<tr ><td height="42" colspan="3" align="center" valign="top">

  <input name="Submit" value="Submit" type="Submit">
 </td></tr>
</table>
</form></td>




</div>

<div class="clear"></div>
<div id="content-bottom"></div>
</div><!--/end content wrapper div -->