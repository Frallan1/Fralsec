
// User Commands
function echo (...a) {
  return a.join(' ')
}
echo.usage = "echo arg [arg ...]"
echo.doc = "Echos to output whatever arguments are input"

function en (...a) {
  try {
    return btoa(a.join(' '));
  }catch(error) {
    return(error.toString());
  }
}
en.usage = "en arg"
en.doc = "Encodes given string arguement to base-64"

function de (...a) {
  try {
    return atob(a);
  }catch(error) {
    return(error.toString());
  }
}
de.usage = "de arg"
de.doc = "Decodes given string arguement from base-64."

var cmds = {
  en,
  de,
  echo,
  clear,
  help
}


function clear () {
  $("#outputs").html("")
}
clear.usage = "clear"
clear.doc = "Clears the terminal screen"

function help (cmd) {
  if (cmd) {
    let result = ""
    let usage = cmds[cmd].usage
    let doc = cmds[cmd].doc
    result += (typeof usage === 'function') ? usage() : usage
    result += "<br>"
    result += (typeof doc === 'function') ? doc() : doc
    return result
  } else {
    let result = "**Commands:**<br><br>"
    print = Object.keys(cmds)
    for (let p of print) {
      result += "- " + p + "<br>"
    }
    return result
  }
}
help.usage = () => "help [command]"
help.doc = () => "Without an argument, lists available commands. If used with an argument displays the usage & docs for the command."


// Display input to Console
function input() {
  var cmd = $('.console-input').val()

  if(cmd.length <= 27){
    $("#outputs").append("<div class='output-cmd'>" + cmd + "</div>")
  }else{
    $("#outputs").append("<div class='output-cmd'>" + cmd.slice(0,27) + "</div>")
    trimmer(cmd.slice(27));
  }
  $('.console-input').val("")
  autosize.update($('textarea'))
  $("html, body").animate({
    scrollTop: $(document).height()
  }, 300);
  return cmd
}
function trimmer(cmd){
  if(cmd.length >29){
    $("#outputs").append("<div class='output'>" +cmd.slice(0,29) + "</div>");
    trimmer(cmd.slice(29));
  }else{
  $("#outputs").append("<div class='output'>"+cmd + "</div>")
  }
}

// Output to Console
function output(print) {
  $("#outputs").append("<div class='response'>" +print + "</div>");
  $(".console").scrollTop($('.console-inner').height());
}

// Break Value
var newLine = "<br/> &nbsp;";

autosize($('textarea'))

var cmdHistory = []
var cursor = -1

// Get User Command
$('.console-input').on('keydown', function(event) {
  if (event.which === 38) {
    // Up Arrow
    cursor = Math.min(++cursor, cmdHistory.length - 1)
    $('.console-input').val(cmdHistory[cursor])
  } else if (event.which === 40) {
    // Down Arrow
    cursor = Math.max(--cursor, -1)
    if (cursor === -1) {
      $('.console-input').val('')
    } else {
      $('.console-input').val(cmdHistory[cursor])
    }
  } else if (event.which === 13) {
    event.preventDefault();
    cursor = -1
    let text = input()
    if (text===''){
      output('');
    }else{
      let args = getTokens(text)[0]
      let cmd = args.shift().value
      args = args.filter(x => x.type !== 'whitespace').map(x => x.value)
      cmdHistory.unshift(text)
      if (typeof cmds[cmd] === 'function') {
        let result = cmds[cmd](...args)
        if (result === void(0)) {
          // output nothing
        } else if (result instanceof Promise) {
          result.then(output)
        } else {
          output(result)
        }
      } else {
        output("Command not found")
        output("Use 'help' for list of commands.")
      }
    }
}
});
