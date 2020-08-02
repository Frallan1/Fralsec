let temp = JSON.stringify({"Cold Corona":[{"tid":"9:15:33 pmJun 26, 2020","reason":"Process setuphost.exe was detected by the report \"Persistence - Change Default File Association - txtfile\" in watchlist \"Carbon Black Advanced Threats\"","device":"ONEawdad ","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A8275DDBD3DFA3FAA9D430DC0CB2508F2"},
{"tid":"9:10:13 pmJun 26, 2020","reason":"Process elevationservice.exe was detected by the report \"KNOWN_MALWARE_OR_PUA\" in watchlist \"TS_SOC\"","device":"DAWDWAD49644","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A5F5A87AE787DF4EA83B8BE66CC381900"}
],"Uptown":[],"life":[{"tid":"9:04:52 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"All unknown executionpolicy bypass\" in watchlist \"ts_tuning_powershell\"","device":"AdministraT2","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A35FC8D85E636C2C2DD200FF47F80166F"},
{"tid":"9:04:52 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"All unknown executionpolicy bypass\" in watchlist \"ts_tuning_powershell\"","device":"AdminisT2","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A07E0CB510916B1F8A20526EB3BD6DF62"},
{"tid":"8:49:36 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"All unknown executionpolicy bypass\" in watchlist \"ts_tuning_powershell\"","device":"Adminis98-66","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A30DA714F869924927AF44659D3C264DC"}],
"pace.com":[],"sss.se":[],"Red Panther.com":[{"tid":"9:14:52 pmJun 26, 2020","reason":"Process mediarelaysvc.exe was detected by the report \"HostHatch IP range\" in watchlist \"​ts​_a​lb​er​t_​Ho​st​Ha​tc​h_​IP​_r​an​ge​s\"","device":"D​ED​US​S07","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A85725E9933DE104EEE08CE0FE66FB0C9"},
{"tid":"9:14:41 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"Powershell Executed With Encoded Instructions\" in watchlist \"TS_AA_Tuning\"","device":"UD662310)","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3AB6C566ED542B0BB86B6F259664B6C72E"},
{"tid":"9:08:45 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"Powershell Executed With Encoded Instructions\" in watchlist \"TS_AA_Tuning\"","device":"Sawdadwaw0322","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A8BAB83D11819CE31A2BB03D3076AE75A"},
{"tid":"9:08:44 pmJun 26, 2020","reason":"Process powershell.exe was detected by the report \"Powershell Executed With Encoded Instructions\" in watchlist \"TS_AA_Tuning\"","device":"Unassig3","link":"https://defense-eu.conferdeploy.net/cb/investigate/processes?searchWindow=ONE_MONTH&query=alert_id%3A506262C7A8C9E31BC23945D86C399448"}]});
let loading = false;

function testing(){
  jsonToContent(temp);   //---- for testing
  $('html,body').animate({
    scrollTop: $('.alertcontainer').offset().top
  }, 1000);
}
$(".logo").click(function(){
  //testing();   //---- for testing
  if (!loading){
    loading=true;
    chrome.runtime.sendMessage({greeting: "GetAlerts"}); //---- for online
    $(".logo").toggleClass("rotate");
  }
});
$('.basic').click(function(){
  $('.mainContent').css("background-color","var(--maincontent-bg-color1)");
  $('.customer').css("background-color","var(--customer-bg-color1)");
  $('.customer:nth-child(even)').css("background-color","var(--customerNth-bg-color1)");
});
$('.coral').click(function(){
  $('.mainContent').css("background-color","var(--maincontent-bg-color2)");
  $('.customer').css("background-color","var(--customer-bg-color2)");
  $('.customer:nth-child(even)').css("background-color","var(--customerNth-bg-color2)");
});
$('.dark').click(function(){
  $('.mainContent').css("background-color","var(--maincontent-bg-color3)");
  $('.customer').css("background-color","var(--customer-bg-color3)");
  $('.customer:nth-child(even)').css("background-color","var(--customerNth-bg-color3)");
});
$(document).ready(function() {
  //duplicate incase someone refreashed the site while it is scrolled
  $('.mainContent').each( function(i){
    if( $(window).height() - ($(this).offset().top - $(document).scrollTop()) > 100){
     $(this).css('opacity','1');
    }             
  });
  $(window).scroll( function(){
    $('.mainContent').each( function(i){
      if( $(window).height() - ($(this).offset().top - $(document).scrollTop()) > 100){
        $(this).animate({'opacity':'1'},1500);
      }             
    });
  });
  document.getElementById("toggle").addEventListener( 'change', checkboxHandler)
});
function arrToLi(s, parent){
    let alert = document.createElement("li");
    
    let alertBox = document.createElement("div");
    alertBox.className = "alertBox";
    alertBox.addEventListener('click',function(){
      chrome.runtime.sendMessage({greeting: "setCustomer", target: parent});
      chrome.tabs.create({ url: s["link"] });
    });

    let time = document.createElement("div");
    time.className = 'time';
    time.innerHTML = s["tid"];

    //---- fixar tid med breaklines
    let regex = "^(.*?)pm";
    let tid = s["tid"].match("^(.*?)pm");
    if (!tid)
      tid = s["tid"].match("^(.*?)am");

    time.innerHTML = tid[0];
    time.innerHTML += "<br>";

    let datum = s["tid"].match("(?<=pm)(.*?)(?=,)");
    if (!datum)
      datum = s["tid"].match("(?<=am)(.*?)(?=,)");
    
    time.innerHTML += datum[0];

    let year = s["tid"].match("(?<=,).*");
    time.innerHTML += year;
    // -------------  
    let reason = document.createElement("div");
    reason.className = 'reason';
    reason.innerHTML = s["reason"];

    let device = document.createElement("div");
    device.className = 'device';
    device.innerHTML = s["device"];

    alertBox.appendChild(time);
    alertBox.appendChild(reason);
    alertBox.appendChild(device);

    return alert.appendChild(alertBox);
}

let tabUpdated = true;
function jsonToContent(msg){
    if(tabUpdated){
        let x = JSON.parse(msg); //change this to msg.content when live
        let alertcontainer = document.getElementsByClassName("alertcontainer")[0]
        var child = alertcontainer.lastElementChild;
        if (child){
          while (child) { 
              alertcontainer.removeChild(child); 
              child = alertcontainer.lastElementChild; 
          } 
        }else
          $('.mainContent').css('min-height','100vh')
        for(key in x){
            let customer = document.createElement("div");
            customer.className = "customer"
            //>---- 
            let customerName = document.createElement("h3");
            let ref = document.createElement("a");
            ref.className="reference";
            ref.innerHTML=key
            customerName.appendChild(ref);
            customer.appendChild(customerName);
            //>---- 
            let alertlist = document.createElement("div");
            alertlist.className = "alertList"

            x[key].forEach(element => {
              alertlist.appendChild(arrToLi(element,key));
            });
            customer.appendChild(alertlist);
            if(alertlist.childElementCount > 0) {
              customerName.innerHTML+= (" ("+alertlist.childElementCount+")")
              alertcontainer.appendChild(customer);
            }
            // om det inte finns några alerts i kunden DOooo......
        } 


        // --- when all cells of customers are populated...
        $('.reference').click( function(e) {
          chrome.runtime.sendMessage({greeting: "setCustomer", target: event.target.innerHTML});
        });
    }else
        tabUpdated = !tabUpdated;
  }
chrome.runtime.onMessage.addListener(function(msg){
      loading=false;
      jsonToContent(msg.response);
      $('html,body').animate({
        scrollTop: $('.alertcontainer').offset().top
      }, 1000);
      $(".logo").toggleClass("rotate");
});

function setIntervalx(delay, repetitions,checkBox,output) {
    var x = repetitions;
    let intervalID;
    let checkbox=checkBox;
    let text = output;
    let date = new Date(0);
    date.setSeconds(repetitions);
    this.pause = function(){
      if(intervalID){
        window.clearInterval(intervalID)
      }
    }
    this.start = function(){
        intervalID = window.setInterval(function () {
        --x
        if (x <= 0) {
             x = repetitions;
             date.setSeconds(repetitions);
             $(".logo").click()
        }
        date.setMilliseconds(-1); // specify value for SECONDS here¨
        let timeString = date.toISOString().substr(14,5);
        text[0].innerText=timeString;
      }, delay);
    }
}
let timer;
function checkboxHandler() {
  let checkBox = document.getElementById("toggle");
  let output = document.getElementsByClassName("remainingTime");
  if (checkBox.checked == true){
    if (timer)
      timer.start();
    else {
      timer = new setIntervalx(1000,1200,checkBox,output)
      timer.start();
    }
  } else {
    timer.pause();
  }
}