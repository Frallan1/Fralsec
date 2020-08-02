let navitems = ['ENDE','REFREASHER','Encode','Decode'];
let subnav=['Encode','Decode','Clear','Filter'];
//var x = document.getElementById('ENDE');
let historikTable;
console.log("hello world")
let color = {
  black:getComputedStyle(document.documentElement).getPropertyValue('--nav-color'),
  blackGrey:getComputedStyle(document.documentElement).getPropertyValue('--nav-colorGrad'),
  selected:getComputedStyle(document.documentElement).getPropertyValue('--nav-selected')
};

window.addEventListener('load',
  function(){
    document.getElementsByClassName('sub-navbar-History')[0].style.display="none";
    document.getElementsByClassName('history')[0].style.display="none";
    listeners();
  }
);
var port = chrome.extension.connect({
      name: "History Communication"
 });
 port.onMessage.addListener(function(msg) {
      init_history(JSON.parse(msg));
 });
function listeners(){
  navitems.forEach(item => {
    document.getElementById(item).addEventListener("click",
      function(){
        select(item);
      });
  });
}

function select(navItem) {
  var x = document.getElementById(navItem);
  //Change the background on select, and change the background on deselected element.
  x.style.backgroundColor=color["selected"];
  if(!subnav.includes(navItem)){
    navitems.filter(w => w!=navItem).forEach(e => deselect(e));
  }
  if(navItem=="REFREASHER"){
    var x = document.getElementById('ENDE');
    document.getElementsByClassName('sub-navbar-ED')[0].style.display="none";
    document.getElementsByClassName('main')[0].style.display="none";
    document.getElementsByClassName('sub-navbar-History')[0].style.display="";
    document.getElementsByClassName('history')[0].style.display="";
  }
  if(navItem=="ENDE"){
    var x = document.getElementById('ENDE');
    document.getElementsByClassName('sub-navbar-History')[0].style.display="none";
    document.getElementsByClassName('history')[0].style.display="none";
    document.getElementsByClassName('sub-navbar-ED')[0].style.display="";
    document.getElementsByClassName('main')[0].style.display="";
  }
  if(navItem=="Decode"){
    args = $('.console-input').val()
    if (args != ""){
      args=input()
      cmdHistory.unshift("de "+args);
      output(de(args));
      $('.console-input').focus()
    }
  }
  if(navItem=="Encode"){
    args = $('.console-input').val()
    if (args != ""){
      args=input()
      cmdHistory.unshift("en "+args);
      output(en(args));
      $('.console-input').focus()
    }
  }
}
function deselect(navItem){
  var x = document.getElementById(navItem);
  x.style.background="";
}
function selectRefresh(){

}
//output(en(input()));
