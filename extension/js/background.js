var contextMenus = {};

contextMenus.createCounterString =
    chrome.contextMenus.create(
        {"title":"Generate Counterstring",
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
  var newURL = "http://stackoverflow.com/";
  chrome.tabs.create({ url: newURL },function (tab) {
        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
            if (info.status === 'complete' && tabId === tab.id) {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.tabs.executeScript({file: "js/hohe.js"});
            }
        });
  });
}
