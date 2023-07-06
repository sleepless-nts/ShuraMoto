


function __extract_image(img, x, y, w, h){
    let tmp = createImage(w, h);
    tmp.copy(img, x, y, w, h, 0, 0, w, h);
    return tmp;
}

function __register_game_mode(gm, funcs, framerate){
    GAME_MODES[gm] = {"functions": funcs, "framerate": framerate};
}

function __set_game_mode(gm){
    CURRENT_MODE = gm;
    frameRate(GAME_MODES[gm]['framerate']);
}

function __set_language(lang){
    CURRENT_LANG = lang;
    let el = document.getElementById('credits');
    el.innerHTML = PAGE_CREDITS.replace(/\{([A-Z_]+)\}/g, (match) => { let id = match.replace('{', '').replace('}', ''); return __get_text(id);})

}

function __get_text(name){
    if(name in LANGUAGES[CURRENT_LANG]){
        return LANGUAGES[CURRENT_LANG][name];
    }
    return "UNDEF";
}

function __call_function(fn){
    if(fn in GAME_MODES[CURRENT_MODE]['functions']){
        GAME_MODES[CURRENT_MODE]['functions'][fn]();
    }
}

function __load_level_data(level){
    let data = LEVELS[level].data;
    start_coords = data[0][0];
    goal_coords = data[0][1];
    death_barrier = data[0][2];

    checkpoints = data[1];
    worlddata = data[2];
}

function __toggle_bgm(el){
    if(song.isPlaying()){
        song.stop();
        el.innerHTML = "&#128266;";
    } else {
        song.play();
        el.innerHTML = "&#128263;";

    }
}

function __start_bgm(){
    let el = document.getElementById("mute-button");
    el.innerHTML = "&#128263;";
    song.play();
    song.setLoop(true);
}
function __to_precision(num, decs){
    if(decs == undefined){
        decs = 2;
    }
    let t = pow(10, decs);
    return int(num * t) / t;
}

function __in_canvas(){
    return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

function __level_cleared(level_id){
    return JSON.parse(localStorage.getItem("cleared")).includes(level_id);
}

function __level_aced(level_id){
    return JSON.parse(localStorage.getItem("aced")).includes(level_id);
}

function __reset_storage(){
    localStorage.setItem("cleared", "[]");
    localStorage.setItem("aced", "[]");
}
function __draw_fake_bike(x, y, rot){
    push();
    imageMode(CENTER);
    translate(x, y);
    if(rot){
        rotate(rot)
    }
    image(img_wheel, -55, 13, 42, 42);
    image(img_wheel, 55, 13, 42, 42);
    image(img_bike, 0, -20, 140, 80);
    pop();
}

function __draw_fake_ground(x, y, w, h){
    push();
    let imgsize = 32;
    rectMode(CENTER);
    imageMode(CORNER);
    translate(x, y);
    fill(239, 182, 129);
    noStroke();
    rect(0, 0, w, h);

    for(let i = 0; (i * imgsize) < w; i++){
        let x_off = (-w/2) + (i * imgsize);
        let y_off = (-h/2) + (0 * imgsize);
        let adjw = imgsize;
        let adjh = imgsize;
        if((i*imgsize) + imgsize > w){
            adjw = w % imgsize;
        }
        image(img_dirt, x_off, y_off, adjw, adjh);
    }
    pop();
}

function __format_time(secs){
    let ret = "";
    let h = int(secs / 3600),
        m = int((secs % 3600) / 60),
        s = __to_precision(secs % 60);
    return (h> 0 ? h.toString().padStart(2, "0") + ":": "") + (m > 0 ? m.toString().padStart(2, "0") + ":" : "") + (s < 10 ? "0" : "") +  (s);
}

function __rect_overlap(rect1, rect2){
    if(rect1.x1 > rect2.x2 || rect1.x2 < rect2.x1 || rect1.y1 > rect2.y2 || rect1.y2 < rect2.y1){
        return false;
    }
    return true;
}
