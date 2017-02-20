<%@ Page Language="C#" %>
<%
    var timeout = 1000;
    if(!int.TryParse(Request["t"], out timeout))
        timeout = 1000;
    System.Threading.Thread.Sleep(timeout);
    Response.Write("{\"FirstName\":\"John\",\"LastName\":\"Smith\", \"Type\":\"ASPX\", \"Timeout\":\""+timeout+" ms\"}");
%>