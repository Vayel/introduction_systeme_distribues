function getY(time, minTime, maxTime, height) {
  return (time - minTime) / (maxTime - minTime) * height;
}

function addMessage(msg, container) {
    var div = document.createElement("div");
    div.innerHTML = msg.text;
    div.className = "message " + msg.type;
    container.appendChild(div);
}

function parseMsg(text, type) {
    // [time][agent][task]text
    var msgRegexp = /^\[([0-9:\.]+)\]\[([\w-]+)\]\[([\w-]+)\](.+)/;
    var parts = text.match(msgRegexp);

    var timeStr = parts[1];
    var timeRegexp = /^([0-9]+):([0-9]+)\.([0-9]+)/;
    var timeParts = timeStr.match(timeRegexp);
    var time = new Date(0, 0, 0, 0, parseInt(timeParts[1]), parseInt(timeParts[2]), parseInt(timeParts[3])).getTime();

    return {
        type,
        time,
        text: parts[0],
    };
}

function listMessages(container, type) {
    var lines = container.innerHTML.split("\n");
    var messages = [],
        msg;
    for (var line of lines) {
        line = line.trim();
        if (line) {
            messages.push(parseMsg(line, type));
        }
    }
    return messages;
}


var MASTER = "master", SLAVES = "slaves";
var containers = {};
containers[MASTER] = document.getElementById(MASTER + "-messages");
containers[SLAVES] = document.getElementById(SLAVES + "-messages");

var messages = [];
for (var type in containers) {
    messages = messages.concat(listMessages(containers[type], type));
}

messages.sort(function(a, b) {
    var delta = a.time - b.time;
    if (!delta) {
        return (a.type < b.type) ? -1 : 1; 
    }
    return delta;
});

var messagesContainer = document.getElementById("messages");
for(var msg of messages) {
    addMessage(msg, messagesContainer);
}
