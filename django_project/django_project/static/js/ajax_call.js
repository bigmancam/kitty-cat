/**
 * Created by Cameron on 10/19/2014.
 */
function loadMe()
{
    if(window.XMLHttpRequest)
    {
        r = new XMLHttpRequest();
    }
    else
    {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.onreadystatechange=function()
    {
        if (r.readyState==4 && r.status==200)
        {
            document.getElementById("content_pane").innerHTML= r.responseText;
        }
    }
    r.open("GET","static/html/comment_page.html", true);
    r.send();
}