var surface = new Array();
var new_surface = new Array();
var h = 72;
var w = 72;
var er = 50;
var count = 0;

function pdAround(x, y) {
    var x_sub = (x + (h - 1)) % h;
    var y_sub = (y + (w - 1)) % w;
    var x_plus = (x + 1) % h;
    var y_plus = (y + 1) % w;
    var lifes = (
        (surface[x_sub][y_sub] == 1)
        + (surface[x_sub][y] == 1)
        + (surface[x_sub][y_plus] == 1)
        + (surface[x][y_plus] == 1)
        + (surface[x_plus][y_plus] == 1)
        + (surface[x_plus][y] == 1)
        + (surface[x_plus][y_sub] == 1)
        + (surface[x][y_sub] == 1)
    );
    return lifes;
}

function updatePos(x, y) {
    if (surface[x][y] == 1) {
        document.getElementById(x + "a" + y).checked = true;
    } else if (surface[x][y] == 0) {
        document.getElementById(x + "a" + y).checked = false;
    }
}

function showSurface() {
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            updatePos(i, j);
        }
    }
}

function createSurface(p) {
    for (var i = 0; i < h; i++) {
        surface[i] = new Array();
        new_surface[i] = new Array();
        for (var j = 0; j < w; j++) {
            if (Math.random() * 100 <= p) {
                surface[i][j] = 1;
                new_surface[i][j] = 1;
            } else {
                surface[i][j] = 0;
                new_surface[i][j] = 0;
            }
        }
    }
    document.getElementById("run").removeAttribute("disabled");
    showSurface();
}

function refreshSurface() {
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            if (surface[i][j] != new_surface[i][j]) {
                surface[i][j] = new_surface[i][j];
                updatePos(i, j);
            }
        }
    }
}

function setState(x, y) {
    if (surface[x][y] == 0) {
        if (pdAround(x, y) == 3) {
            new_surface[x][y] = 1;
        }
    } else if (surface[x][y] == 1) {
        if ((pdAround(x, y) < 2) || (pdAround(x, y) > 3)) {
            new_surface[x][y] = 0;
        }
    }
}


function create() {
    h = document.getElementById("height").value;
    w = document.getElementById("wide").value;
    er = document.getElementById("evolve_wait").value;
    var p = document.getElementById("live_rate").value;
    var frame = "<table>";
    var content;
    for (var i = 0; i < h; i++) {
        frame += "<tr>";
        for (var j = 0; j < w; j++) {
            content = "\"" + i + "a" + j + "\"";
            frame += "<td><div><input type=\"checkbox\" disabled id=" + content + "><label for=" + content + "></label></div></td>";
        }
        frame += "</tr>";
    }
    frame += "</table>";
    document.getElementById("box").innerHTML = frame;
    createSurface(p);
}

function fun() {
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            setState(i, j, h, w);
        }
    }
    refreshSurface(i, j);
}

function run() {
    if (count % 2 == 0) {
        er = document.getElementById("evolve_wait").value;
        run_state = setInterval("fun()", er);
        document.getElementById("run").innerHTML = "暂停";
        document.getElementById("create").setAttribute("disabled", "");
        document.getElementById("evolve_wait").setAttribute("disabled", "");
    } else {
        clearInterval(run_state);
        document.getElementById("run").innerHTML = "运行";
        document.getElementById("create").removeAttribute("disabled");
        document.getElementById("evolve_wait").removeAttribute("disabled", "");
    }
    count = (count + 1) % 2;
}