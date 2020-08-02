var contextMenus = {};

let temp;

let historikContent = [{count: 1, info: "157.230.118.129", rep: 1},{count: 1, info: "194.103.27.15", rep: 1}];
const regex = '^https://defense-eu.conferdeploy.net/alerts.*';
let historik=[];
contextMenus.VT =
    chrome.contextMenus.create(
        {"title":"➰ URL",
        "contexts" : ["selection"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );
    contextMenus.VTS =
        chrome.contextMenus.create(
            {"title":"Search ➰",
            "contexts" : ["selection"]
            },
            function (){
                if(chrome.runtime.lastError){
                    console.error(chrome.runtime.lastError.message);
                }
            }
        );
    contextMenus.who =
        chrome.contextMenus.create(
            {"title":"⚙️ Whois",
            "contexts" : ["selection"]
            },
            function (){
                if(chrome.runtime.lastError){
                    console.error(chrome.runtime.lastError.message);
                }
            }
        );
contextMenus.stackoverflow =
    chrome.contextMenus.create(
        {"title":"♨ Stackoverflow",
        "contexts" : ["selection"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );
contextMenus.AI =
        chrome.contextMenus.create(
            {"title":"🌹 AbuseIP",
            "contexts" : ["selection"]
            },
            function (){
                if(chrome.runtime.lastError){
                    console.error(chrome.runtime.lastError.message);
                }
            }
        );
contextMenus.UC =
          chrome.contextMenus.create(
              {"title":"⏱ UrlScan",
              "contexts" : ["selection"]
              },
              function (){
                  if(chrome.runtime.lastError){
                      console.error(chrome.runtime.lastError.message);
                  }
              }
          );
contextMenus.multi =
        chrome.contextMenus.create(
              {"title":"(⏱+🌹+➰)",
              "contexts" : ["selection"]
                  },
                  function (){
                      if(chrome.runtime.lastError){
                          console.error(chrome.runtime.lastError.message);
                      }
                  }
              );
chrome.extension.onConnect.addListener(function(port) {
  if(port.name=="alertPage"){
    port.onMessage.addListener(function(msg) {
      if (msg.request == "Get")
        port.postMessage({response:"Alertlist",Alerts:JSON.stringify({"AA":[1,2,3],"BB":["a","b","c"]})});
    });
  }else if (port.name == "History Communication"){
     //when extension icon is clicked it recives this info
     createContent();
     port.postMessage(JSON.stringify(historikContent));
     //Should trigger a "Get" from popup whenever it needs an update from bg. This is everytime someone uses the extension to search
     port.onMessage.addListener(function(msg) {
       repHandle(JSON.parse(msg));
     });
  }
});
chrome.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.getSelected(null, function(tab) {
    if(tab["url"].match(regex)){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{"func":"pageLoad","value":JSON.stringify(historikContent)});
      });
    }
  });
});
function repHandle(msg){
    let x = historikContent.find(e=>e["info"]==msg["info"]);
    x["rep"]=msg["rep"];
    chrome.tabs.getSelected(null, function(tab) {
      if(tab["url"].match(regex)){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id,{"func":"pageLoad","value":JSON.stringify(historikContent)});
        });
      }
    });
}
function createContent() {
  historik.forEach((item) => {
    let e = historikContent.find(e=>e["info"]==item.slice(2));
    if(e){
      e["count"]++;
    }else{
      historikContent.push({"count":1,"info":item.slice(2),"rep":-1});
    }
  });
  historik=[];
}
chrome.contextMenus.onClicked.addListener(contextMenuHandler);

//when loading alert page in carbon you first get directed to something like "https://defense-eu.conferdeploy.net/alerts"
//then gets redirected to "https://defense-eu.conferdeploy.net/alerts?s[highlight]=true&s[fromRow]=1&s[maxRows]..."
// but we only want the listener to get triggered once.
let tabUpdated = true;
let cbTabId;
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab["url"].match(regex)) {
    cbTabId = tabId;
    if (tabUpdated){
      tabUpdated = !tabUpdated;
      chrome.tabs.executeScript(cbTabId,{
        code: "bodyMutation()" //append mutation observer only if needed. -<<< fix
      });
    }else{
      tabUpdated = !tabUpdated;
    }
  }
});
let alertPageID;
chrome.commands.onCommand.addListener(function(command) {
  console.log("triggered")
    if(command === "page-up"){
      chrome.tabs.executeScript({
        code:"scroller(-1)"
      });
    }else if(command === "page-down"){
      chrome.tabs.executeScript({
        code: "scroller(1)"
      });
    }else if(command === "temp"){
      console.log("test2")
      chrome.tabs.create({ url:"Homepage/notification.html"},function(t){
        alertPageID=t.id;
      });
    }else if(command === "toggle-feature-foo"){
      console.log("test3")
    }
});
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  historik.push(request.greeting);

  if (request.greeting.startsWith("VT")){
      search=request.greeting.slice(2)
      if (search.startsWith("http://")){
        search=search.slice(7)
        var newURL= "https://www.virustotal.com/gui/search/http%253A%252F%252F" + search
      }else if (search.startsWith("https://")){
        search=search.slice(8)
        var newURL= "https://www.virustotal.com/gui/search/https%253A%252F%252F" + search
      } else{
        var newURL= "https://www.virustotal.com/gui/search/http%253A%252F%252F" + search
      }
      chrome.tabs.create({ url: newURL })
  } else if (request.greeting.startsWith("VS")){
    search=request.greeting.slice(2)
      var newURL= "https://www.virustotal.com/gui/search/" + search
      chrome.tabs.create({ url: newURL })
  } else if (request.greeting.startsWith("SO")){
    search=request.greeting.slice(2)
    var newURL = "https://stackoverflow.com/search?q=";
    chrome.tabs.create({ url: encodeURI(newURL+search) });
  }else if (request.greeting.startsWith("WH")){
    search=request.greeting.slice(2)
    var newURL = "http://whois.domaintools.com/";
    chrome.tabs.create({ url: encodeURI(newURL+search) });
  }else if (request.greeting.startsWith("AI")){
    search=request.greeting.slice(2)
    var newURL = "https://www.abuseipdb.com/check/";
    chrome.tabs.create({ url: encodeURI(newURL+search) });
  }else if (request.greeting.startsWith("UC")){
    search=request.greeting.slice(2)
    var newURL = "https://urlscan.io/";
    chrome.tabs.create({ url: encodeURI(newURL) });
    chrome.tabs.executeScript({
           code: "document.getElementsByClassName('form-control').item(0).value="+JSON.stringify(search)
    });
  }else if (request.greeting.startsWith("mu")){
    search=request.greeting.slice(2)
    var newURL = "https://urlscan.io/";
    chrome.tabs.create({ url: encodeURI(newURL), active:false },function(tab){
      chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('form-control').item(0).value="+JSON.stringify(search)})
      }
    );
    var newURL = "https://www.abuseipdb.com/check/";
    chrome.tabs.create({ url: encodeURI(newURL+search), active:false});
    if (search.startsWith("http://")){
      search=search.slice(7)
      var newURL= "https://www.virustotal.com/gui/search/http%253A%252F%252F" + search
    }else if (search.startsWith("https://")){
      search=search.slice(8)
      var newURL= "https://www.virustotal.com/gui/search/https%253A%252F%252F" + search
    } else{
      var newURL= "https://www.virustotal.com/gui/search/http%253A%252F%252F" + search
    }
    chrome.tabs.create({ url: newURL,active:false })
  }else if (request.greeting.startsWith("Alerts")){
    console.log(request.content)
    chrome.tabs.sendMessage(alertPageID,{"response":(request.content)});
  }else if (request.greeting.startsWith("GetAlerts")){
    console.log("Fetching from cb...")
    chrome.tabs.executeScript(cbTabId,{
      code: "alertInfo();"
    });
  }else if (request.greeting.startsWith("setCustomer")){
    chrome.tabs.executeScript(cbTabId,{
      code: "selectCustomer("+JSON.stringify(request.target)+");"
    });
  }
});
function contextMenuHandler(info, tab){
  if(info.menuItemId===contextMenus.Google){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'GO'+window.getSelection().toString()});"
    });
  }
  if(info.menuItemId===contextMenus.stackoverflow){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'SO'+window.getSelection().toString()});"
    });
  }
  if(info.menuItemId===contextMenus.who){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'WH'+window.getSelection().toString()});"
    });
  }
  if(info.menuItemId===contextMenus.VT){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'VT'+window.getSelection().toString()});"
    });
  }if(info.menuItemId===contextMenus.VTS){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'VS'+window.getSelection().toString()});"
    });
  }if(info.menuItemId===contextMenus.AI){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'AI'+window.getSelection().toString()});"
    });
  }if(info.menuItemId===contextMenus.UC){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'UC'+window.getSelection().toString()});"
    });
  }if(info.menuItemId===contextMenus.multi){
    chrome.tabs.executeScript({
           code: "chrome.runtime.sendMessage({greeting:'mu'+window.getSelection().toString()});"
    });
  }
}
