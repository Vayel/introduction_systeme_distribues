var MASTER = "master", SLAVES = "slaves";
var DIRECTIONS = {
    IN: "«",
    OUT: "»",
    NO: "-",
};
var TEXT_TO_UNICODE = {

};

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getDirectionIcon(direction, type) {
    if (direction == DIRECTIONS.NO) {
        return DIRECTIONS.NO;
    }
    if (type == MASTER) {
        return (direction == DIRECTIONS.IN) ? DIRECTIONS.IN : DIRECTIONS.OUT;
    }
    return (direction == DIRECTIONS.IN) ? DIRECTIONS.OUT : DIRECTIONS.IN;
}

function addMessage(msg, container) {
    var date = new Date(msg.timestamp);
    var html = "" + pad(date.getMinutes(), 2) + "m" + pad(date.getSeconds(), 2) + "s - ";
    if (msg.type == SLAVES) {
        html += "(" + msg.agent + ") - ";
    }
    html += "(" + msg.task + ") : " + msg.text;

    var wrapper = document.createElement("div");
    wrapper.dataset.task = msg.task;
    wrapper.className = "message " + msg.type;

    var text = document.createElement("div");
    text.innerHTML = html;
    text.className = "text";

    var direction = document.createElement("div");
    direction.className = "direction";
    direction.innerHTML = getDirectionIcon(msg.direction, msg.type);

    wrapper.appendChild(direction);
    wrapper.appendChild(text);
    container.appendChild(wrapper);

    wrapper.addEventListener("mouseover", function() {
        for (var wrapper of document.querySelectorAll(".message[data-task='" + msg.task + "']")) {
            wrapper.className = wrapper.className + " active";
        }
    });

    wrapper.addEventListener("mouseout", function() {
        var classes, index;
        for (var wrapper of document.querySelectorAll(".message.active")) {
            classes = wrapper.className.split(" ");
            index = classes.indexOf("active");
            if (index != -1) {
                classes.splice(index, 1);
            }
            wrapper.className = classes.join(" ");
        }
    });
}

function parseMsg(text, type) {
    // [timestamp][agent][task][direction]text
    var rgTimestamp = "\\[([0-9\\.]+)\\]",
        rgAgent = "\\[([\\w-]+)\\]",
        rgTask = "\\[([\\w-]+)\\]",
        rgDirection = "\\[(\\w*)\\]",
        rgText = "(.+)";
    var msgRegexp = new RegExp("^" + rgTimestamp + rgAgent + rgTask + rgDirection + rgText);
    var parts = text.match(msgRegexp);
    var direction = parts[4];

    return {
        type,
        timestamp: parseFloat(parts[1]) * 1000,
        agent: parts[2],
        task: parts[3],
        direction: direction ? DIRECTIONS[direction] : DIRECTIONS.NO,
        text: parts[5].trim(),
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


var containers = {};
containers[MASTER] = document.getElementById(MASTER + "-messages");
containers[SLAVES] = document.getElementById(SLAVES + "-messages");

var messages = [];
for (var type in containers) {
    messages = messages.concat(listMessages(containers[type], type));
}

messages.sort(function(a, b) {
    var delta = a.timestamp - b.timestamp;
    if (!delta) {
        return (a.type < b.type) ? -1 : 1; 
    }
    return delta;
});

var messagesContainer = document.getElementById("messages");
for(var msg of messages) {
    addMessage(msg, messagesContainer);
}
