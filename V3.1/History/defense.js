let historikTable=[];
let highLightedTexts=[];
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.func=="pageLoad"){
      //när du startar sidan får du detta
      historikTable=JSON.parse(request.value);
    }else if(request.func=="update"){
      //när du har sidan uppe och historikTable uppdateras
      historikTable=JSON.parse(request.value);
    }
  });
document.addEventListener("selectionchange",highlightRep);

//Optimserings tillfälle:
//event "selectionchange" triggas av bakgrunds byte.
//Detta gör att highlightRep kör i oändlig loop om man inte släer markeringen.
function highlightRep(){
    sel=window.getSelection()
    try{
      let match = historikTable.find(e=>e["info"]==sel.toString());
      if(match){
        var newNode = document.createElement("span");
        if(match["rep"]==1){
          newNode.setAttribute("style","background-color:lawngreen;");
          sel.getRangeAt(0).surroundContents(newNode);
          highLightedTexts.push(newNode);
        }else if(match["rep"]==0){
          newNode.setAttribute("style","background-color:salmon;");
          sel.getRangeAt(0).surroundContents(newNode);
          highLightedTexts.push(newNode);
        }else if(match["rep"]==-1){
          highLightedTexts.forEach((e)=>{
            if(e.innerHTML==match["info"]){
              try{//try: försök ta bort bakgrunden på alla "neutrala" rep. detta kan få en error om vi målet ett föremål som är borta från nuvarande DOM.
                e.setAttribute("style","background-color:;");
              }catch(e){}
            }
          });
        }
      }
    }catch(error){}
}
