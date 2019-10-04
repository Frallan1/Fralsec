var contextMenus = {};

contextMenus.createCounterString =
    chrome.contextMenus.create(
        {"title":"Gooddgle",
        "contexts" : ["selection"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );
contextMenus.doSomethingelse =
    chrome.contextMenus.create(
        {"title":"Virustotal",
        "contexts" : ["selection"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );
contextMenus.powershell =
    chrome.contextMenus.create(
        {"title":"PW",
        "contexts" : ["selection"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );

chrome.contextMenus.onClicked.addListener(contextMenuHandler);


function contextMenuHandler(info, tab){

    if(info.menuItemId===contextMenus.createCounterString){
        chrome.tabs.executeScript({
            file: 'js/counterstring.js'
          });
    }
    if(info.menuItemId===contextMenus.doSomethingelse){
      assignedUrl = 'https://stackoverflow.com/'
      //chrome.tabs.create({ url: assignedUrl },function(tab) {
          chrome.tabs.executeScript({
              file: 'js/vt.js'
          });
      //  });
    };
    if(info.menuItemId===contextMenus.powershell){
        chrome.tabs.executeScript({
            code: "console.log('Hello pw')"
          });
    }
}
