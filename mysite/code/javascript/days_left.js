/*
Count down until any date script-
By JavaScript Kit (www.javascriptkit.com)
Over 200+ free scripts here!
*/
//change the text below to reflect your own,
var before="<a href=\"http://dancemarathon.uiowa.edu/home/about-dance-marathon-2/\">The Big Event</a> on February 7, 2014"
var current="Dance Marathon 21 is here! Let's Dance!"
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")

function countdown(yr,m,d){
var today=new Date()
var todayy=today.getYear()
if (todayy < 1000)
todayy+=1900
var todaym=today.getMonth()
var todayd=today.getDate()
var todaystring=montharray[todaym]+" "+todayd+", "+todayy
var futurestring=montharray[m-1]+" "+d+", "+yr
var difference=(Math.round((Date.parse(futurestring)-Date.parse(todaystring))/(24*60*60*1000))*1)
var pluraldayornot=(difference==1)? "day" : "days"

if (difference==0)
document.write(current)
else if (difference>0)
document.write("<span> "+difference + "</span> " + pluraldayornot + " until "+before)

}