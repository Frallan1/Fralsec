let alerts = {}
let alert=document.createElement("div");

function nameExtract(){
  s = document.getElementsByClassName("css-1vu89zy-CurrentOrgSection--stretchPosition")[0].title
  regX = "(?<=Org: ).*$"
  return(s.match(regX)[0]); //"Company name"
}
function selectCustomer(s){
  document.getElementsByClassName('css-1vu89zy-CurrentOrgSection--stretchPosition')[0].click(); // Switch org
  document.getElementsByClassName('css-y6iydt-selectContainer-default-selectFullWidth-defaultSelect')[0].firstChild.click(); // scroll menu
  list = Array.from(document.getElementsByClassName('css-ewr9ys-list')[0].children) // Return a list of all the customers in the dropdown menu
  let index = list.find(e=>
    e.title == s
  );
  list[list.indexOf(index)].click()
  document.getElementsByClassName('css-7tdewj-buttonSpinner')[0].firstChild.click() //Select
}
function scroller(i){
  let current = nameExtract()

  document.getElementsByClassName('css-1vu89zy-CurrentOrgSection--stretchPosition')[0].click();
  document.getElementsByClassName('css-y6iydt-selectContainer-default-selectFullWidth-defaultSelect')[0].firstChild.click();
  list = Array.from(document.getElementsByClassName('css-ewr9ys-list')[0].children) // Return a list of all the customers in the dropdown menu

  let index = list.find(e=>
    e.title == current
  );
  list[list.indexOf(index)+i].click()
  document.getElementsByClassName('css-7tdewj-buttonSpinner')[0].firstChild.click() //Select
}
function alertInfo(){
  //Begin at first customer
  document.getElementsByClassName('css-1vu89zy-CurrentOrgSection--stretchPosition')[0].click(); //Open selection
  document.getElementsByClassName('css-y6iydt-selectContainer-default-selectFullWidth-defaultSelect')[0].firstChild.click(); //open list of customers
  let cl = document.getElementsByClassName('css-ewr9ys-list')[0] //save list of customers
  let clChildcount = cl.childElementCount;
  cl.firstElementChild.click()
  document.getElementsByClassName('css-7tdewj-buttonSpinner')[0].firstChild.click() //Select
  /**let alertList = document.querySelector(".tableBody"); //ALert body
  var wrapper = document.createElement("div");
  if (alertList.firstElementChild.className != "css-1pes8c2-noData"){
    [... alertList.children].forEach(e => {
      wrapper.appendChild(e.firstElementChild.cloneNode(true));
    });
  }
  alert = wrapper;
  **/
  setIntervalX(function () {
    alerts[nameExtract()]=alert
    alert=document.createElement("div");
    scroller(1)
  }, 2500, clChildcount-1);

}
function bodyMutation(){
  var wrapper = document.createElement("div");
  const observer = new MutationObserver(function(mutations){
    mutations.forEach(element => {
      if(element.addedNodes.length){
        wrapper.appendChild(element.addedNodes[0].firstElementChild.cloneNode(true));
      }
    });
    alert=wrapper
  });
  
  let alertList = document.querySelector(".tableBody")
  observer.observe(alertList,{
    childList: true
  });
}
function divConvert(tag){
	let alert={}

	alert["tid"]=tag.children[2].innerText //tid
	alert["reason"]=tag.children[3].innerText //Reason
	alert["device"]=tag.children[6].innerText // device and user NOTE --- det som står till top vänster... inte actually run by 
	alert["link"]=tag.children[7].firstElementChild.children[0].href //link to alert
	return alert
}
function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {

     callback();

     if (++x === repetitions) {
         window.clearInterval(intervalID);
         setTimeout(function() {
          alerts[nameExtract()]=alert
          for (let key in alerts){
            let temp =[];
            [... alerts[key].children].forEach(e => {
              temp.push(divConvert(e));
            });
            alerts[key]=temp
         }
          chrome.runtime.sendMessage({"greeting":'Alerts',"content":JSON.stringify(alerts)});
         }, 2500);
     }
  }, delay);
}