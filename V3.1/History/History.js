let s =[];
let counter = {};
let greyed=false;

let items=[];
//127.0.0.1:[[vt],1]
//127.0.0.1:[vt,1]

function init_history(history){
  s=history;
  history.forEach(e=>appendItem(e["count"],e["info"],e["rep"]));
  items.forEach((item) => {
    thumbRotation(item[0],item[1]);
    item[0].getElementsByClassName('like')[0].addEventListener("click",function(){like(item)});
    item[0].getElementsByClassName('disslike')[0].addEventListener("click",function(){disslike(item)});
  });
  clearAndsortHandle()
} 
function thumbRotation(d, rep){
  console.log(d);
    if(rep==1){
      d.getElementsByClassName('disslike')[0].style.display="none";
      d.getElementsByClassName('like')[0].style.right="10px";
    }else if(rep == 0){
      d.getElementsByClassName('like')[0].style.display="none";
      d.getElementsByClassName('disslike')[0].style.right="10px";
    }
}
function appendItem(count, item,rep){
  temp = document.createElement( "div" );
  temp.setAttribute('id', 'h-item');
  $(temp).append("<div class='h-item-counter'>" +"("+count+")" + "</div>");
  $(temp).append("<div class='h-item-content'>" +item+ "</div>");
  $(temp).append("<div class='h-item-rep'>"
      +"<img class='like' src='res/pic/Like-removebg.png' style='height:20px;'>"
      +"<img class='disslike' src='res/pic/Like-removebg.png' style='height:20px'>"
  +"</div>");
  items.push([temp,rep]);
  $("#h-container").append(temp);
}
function clearAndsortHandle(){
  let container = $('#h-container')[0];
  while(container.firstElementChild){
    container.removeChild(container.firstElementChild)
  }
  items.sort(function(a, b){return b[1]-a[1]});
  items.forEach((i) => {
    container.append(i[0]);
  });

  items.forEach((i) => {
    if(i[1]==1){
      i[0].style.background='#00b300';
    }else if (i[1]==0){
      i[0].style.background='#ff4d4d';
    }else{
      if (greyed){
        i[0].style.background='#474747';
      }else{
        i[0].style.background='';
      }
      greyed=!greyed;
    }
  });
  let greyPattern = items.find(e => (e[1]==-1));
  if (greyPattern && greyPattern[0].style.background=='rgb(71, 71, 71)'){
    greyed=false;
  }else {
    greyed=true;
  }
  //console.log(greyed)

}
function like(i){
  if(i[1]==1){
    i[1]=-1;
    i[0].getElementsByClassName('disslike')[0].style.display="";
    i[0].getElementsByClassName('like')[0].style.right="0px";

    port.postMessage(JSON.stringify({"info":i[0].getElementsByClassName("h-item-content")[0].innerHTML,"rep":-1}));
  }else{
    i[0].getElementsByClassName('disslike')[0].style.display="none";
    i[0].getElementsByClassName('like')[0].style.right="10px";
    i[1]=1;

    port.postMessage(JSON.stringify({"info":i[0].getElementsByClassName("h-item-content")[0].innerHTML,"rep":1}));
  }
  clearAndsortHandle();
}
function disslike(i){
  if(i[1]==0){
    i[1]=-1;
    i[0].getElementsByClassName('like')[0].style.display="";
    i[0].getElementsByClassName('disslike')[0].style.right="0px";

    port.postMessage(JSON.stringify({"info":i[0].getElementsByClassName("h-item-content")[0].innerHTML,"rep":-1}));
  }else{
    i[1]=0;
    i[0].getElementsByClassName('like')[0].style.display="none";
    i[0].getElementsByClassName('disslike')[0].style.right="10px";

    port.postMessage(JSON.stringify({"info":i[0].getElementsByClassName("h-item-content")[0].innerHTML,"rep":0}));
  }
  clearAndsortHandle();
}
