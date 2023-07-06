// image assets
let sheet;
let shuwa;
let img_bike, img_wheel;
let img_bg, img_dirt;

let song;

// Matter objects
let WORLD, ENGINE;

// Game modes
let GAME_MODES = [];

let GM_PRESPLASH    = 0,
    GM_SPLASH       = 1,
    GM_TUTORIAL     = 2,
    GM_LEVEL_SELECT = 3,
    GM_LEVEL_PLAY   = 4,
    GM_LEVEL_RETURN = 5,
    GM_LEVEL_FINISH = 6,
    GM_LEVEL_EDITOR = 7,
    GM_CREDITS      = 8;

// Game state
let CURRENT_MODE, CURRENT_LANG;

let bike;
let objects = [];
let checkpoints = [];
let start_coords, goal_coords, death_barrier;
let spawn;

let throttle    = false,
    brake       = false,
    tiltback    = false,
    tiltforward = false,
    hop         = false;

let stats = {"start": undefined,
             "end": undefined,
             "restarts": 0};

let drawBodies = false;

// Editor variables
let returnToEditor = false;
let editor_objects = [];
let editor_checkpoints = [];
let ZOOM = 1;
let X_OFF = 0;
let Y_OFF = 0;
let DEATHBARRIER = undefined;
let currently_selected_object = undefined;
let bikecoords = undefined;
let goalcoords = undefined;
let prev_mouseX, prev_mouseY;

let textarea_open = false;
let data_textarea;
let BUTTONS = [ {'label': 'Drag', 'id': 'drag', 'help': 'Move the whole level', 'help_id': 'EDITOR_BUTTON_DRAG'},
                {'label': '🔍-', 'id': 'zoomout', 'help': 'Zoom out', 'help_id': 'EDITOR_BUTTON_ZOOMOUT'},
                {'label': '🔍+', 'id': 'zoomin', 'help': 'Zoom in', 'help_id': 'EDITOR_BUTTON_ZOOMIN'},
                {'label': '🚲', 'id': 'bike', 'help': "Set Shura's starting position", 'help_id': 'EDITOR_BUTTON_BIKE'},
                {'label': '🚩', 'id': 'checkpoint', 'help': 'Set a checkpoint', 'help_id': 'EDITOR_BUTTON_CHECKPOINT'},
                {'label': '🏁', 'id': 'goal', 'help': 'Set goal position', 'help_id': 'EDITOR_BUTTON_GOAL'},
                {'label': '💀', 'id': 'deathbarrier', 'help': 'Set death barrier', 'help_id': 'EDITOR_BUTTON_DEATHB'},
                {'label': '⬜+', 'id': 'add_rect', 'help': 'Add a rectangle object', 'help_id': 'EDITOR_BUTTON_ADDRECT'},
                {'label': '◯+', 'id': 'add_circle', 'help': 'Add a circle object', 'help_id': 'EDITOR_BUTTON_ADDCIRCLE'},
                {'label': 'Del', 'id': 'delete', 'help': 'Delete an object', 'help_id': 'EDITOR_BUTTON_DELETE'},
                {'label': 'Move', 'id': 'move', 'help': 'Move an object', 'help_id': 'EDITOR_BUTTON_MOVE'},
                {'label': '⟳', 'id': 'rotate', 'help': 'Rotate an object', 'help_id': 'EDITOR_BUTTON_ROTATE'},
                {'label': '⭤', 'id': 'hexpand', 'help': 'Horizontally expand an object', 'help_id': 'EDITOR_BUTTON_HEXPAND'},
                {'label': '⭥', 'id': 'vexpand', 'help': 'Vertically expand an object', 'help_id': 'EDITOR_BUTTON_VEXPAND'},
                {'label': 'Clear', 'id': 'clear', 'help': 'Delete all objects', 'help_id': 'EDITOR_BUTTON_CLEAR'},
                {'label': 'Save', 'id': 'save', 'help': 'Save level data', 'help_id': 'EDITOR_BUTTON_EXPORT'},
                {'label': 'Load', 'id': 'load', 'help': 'Load level data', 'help_id': 'EDITOR_BUTTON_IMPORT'},
                {'label': 'Play', 'id': 'play', 'help': 'Play level', 'help_id': 'EDITOR_BUTTON_PLAY'},
                {'label': 'Exit', 'id': 'exit', 'help': 'Exit editor', 'help_id': 'EDITOR_BUTTON_EXIT'}
                ];
let CURRENT_TOOL = 'drag';
let PREVIOUS_TOOL = 'a';

// Splash variables

let current_splash_option = 0;
let splash_options = [GM_TUTORIAL, GM_LEVEL_SELECT, GM_LEVEL_EDITOR, GM_CREDITS];

// Level select variables
let select_current_page = 0;
let select_current_selected = 0;
let select_levels_perpage = 10;
let select_total_cols = 2;

/**
 *  p5js functions
 */
function preload(){
    sheet = loadImage("assets/sheet.png");
    shuwa = loadImage("assets/shuwa.png");
    song = loadSound("assets/theme.mp3");
}

function setup(){
    createCanvas(800, 600);
    frameRate(30);

    // Extract assets from sheet
    img_bike  = __extract_image(sheet, 0, 0, 750, 653);
    img_wheel = __extract_image(sheet, 481, 696, 251, 251);
    img_bg    = __extract_image(sheet, 2, 700, 160, 116);
    img_dirt  = __extract_image(sheet, 162, 700, 16, 16);

    // Create Matter objects
    let opts = {constraintIterations: P_ENGINE_ITER_CONSTRAINT,
                velocityIterations: P_ENGINE_ITER_VELOCITY,
                positionIterations: P_ENGINE_ITER_POSITION};
    ENGINE = Matter.Engine.create(opts);
    WORLD = ENGINE.world;

    data_textarea = createElement("textarea", "");
    data_textarea.style("width", "600px");
    data_textarea.style("height", "400px");
    data_textarea.style("display", "none");

    __register_game_mode(GM_PRESPLASH, {"draw": gm_presplash_draw, "keyPressed": gm_presplash_keypressed, "mousePressed": gm_presplash_mousepressed}, 10);
    __register_game_mode(GM_SPLASH, {"draw": gm_splash_draw, "keyPressed": gm_splash_keypressed}, 10);
    __register_game_mode(GM_TUTORIAL, {"draw": gm_tutorial_draw, "keyPressed": gm_tutorial_keypress}, 10);
    __register_game_mode(GM_LEVEL_SELECT, {"draw": gm_level_select_draw, "keyPressed": gm_level_select_keypressed}, 10);
    __register_game_mode(GM_LEVEL_PLAY, {"draw": gm_level_play_draw, "keyPressed": gm_level_play_keypressed, "keyReleased": gm_level_play_keyreleased}, 30);
    __register_game_mode(GM_LEVEL_RETURN, {"draw": gm_level_return_draw, "keyPressed": gm_level_return_keypressed}, 5);
    __register_game_mode(GM_LEVEL_FINISH, {"draw": gm_level_finish_draw, "keyPressed": gm_level_finish_keypressed}, 10);
    __register_game_mode(GM_CREDITS, {"draw": gm_credits_draw, "keyPressed": gm_credits_keypressed}, 30);
    __register_game_mode(GM_LEVEL_EDITOR, {"draw": gm_level_editor_draw, "keyPressed": gm_level_editor_keypressed, "mousePressed": gm_level_editor_mousepressed, "mouseReleased": gm_level_editor_mousereleased, "mouseDragged": gm_level_editor_mousedragged}, 30);

    __set_game_mode(GM_PRESPLASH);
    __set_language(LANG_ES);

    textFont("Verdana");

    if(localStorage.getItem("cleared") == null){
        localStorage.setItem("cleared", "[]");
    }
    if(localStorage.getItem("aced") == null){
        localStorage.setItem("aced", "[]");
    }
    if(localStorage.getItem("editor") != null){
        __import_data(JSON.parse(localStorage.getItem("editor")));
    }
}

function draw(){
    push();
    __call_function('draw');
    pop();
}

function keyPressed(){
    __call_function('keyPressed');
}
function keyReleased(){
    __call_function('keyReleased');
}

function mousePressed(){
    __call_function('mousePressed');
}

function mouseReleased(){
    __call_function('mouseReleased');
}

function mouseDragged(){
    __call_function('mouseDragged');
}

/***************************
 *  Game modes
 **************************/

// GM_PRESPLASH

function gm_presplash_draw(){
    background(50);
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text(__get_text("PRESPLASH_INSTR"), width/2, height/2);
}

function gm_presplash_keypressed(){

}

function gm_presplash_mousepressed(){
    if(!__in_canvas()){
        return;
    }
    __start_bgm();
    __set_game_mode(GM_SPLASH);
}

// GM_SPLASH
function gm_splash_draw(){
    background(255);
    imageMode(CORNER);
    fill(2, 2, 9);
    image(shuwa, -100, 0, shuwa.width/1.2, shuwa.height/1.2);
    fill(254, 226, 143);
    stroke(50);
    strokeWeight(6);
    textSize(55);
    textAlign(CENTER);
    stroke(50, 55, 105)
    stroke(0)
    fill(255, 186, 233);
    text(__get_text("SPLASH_TITLE"), width/2, 60);
    textSize(35);
    print_splash_options(690, 130);
}

function print_splash_options(x, y){
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    print_splash_option(x, y   , 160, __get_text("SPLASH_TUTORIAL"), current_splash_option == 0, [10, 10, 0 , 0]);
    print_splash_option(x, y+35, 160, __get_text("SPLASH_PLAY"), current_splash_option == 1);
    print_splash_option(x, y+70, 160, __get_text("SPLASH_EDITOR"), current_splash_option == 2);
    print_splash_option(x, y+105, 160, __get_text("SPLASH_CREDITS"), current_splash_option == 3, [0, 0, 10, 10]);
    fill(0);
    textSize(15);
    text(__get_text("SPLASH_INSTR"), x, y + 145);
}

function print_splash_option(x, y, w, txt, selected, rounded){
    if(rounded == undefined){
        rounded = [0, 0, 0, 0];
    }
    fill(40);
    textSize(19);
    if(selected == true){
        fill(50, 55, 105);
    }
    strokeWeight(2);
    stroke(0);
    rect(x, y, w, 35, rounded[0], rounded[1], rounded[2], rounded[3]);
    fill(200);
    if(selected == true){
        fill(255 - abs(sin(frameCount * 0.4))*45, 186 - abs(sin(frameCount * 0.4 ))*45, 233 - abs(sin(frameCount* 0.4))*45);
    }
    noStroke();
    text(txt, x, y);
}

function gm_splash_keypressed(){
    if(key == "a" || key == "A"){
        if(splash_options[current_splash_option] == GM_LEVEL_EDITOR){
            ZOOM = 1;
            X_OFF = 0;
            Y_OFF = 0;
        }
        __set_game_mode(splash_options[current_splash_option]);
        return;
    }
    if(key == "ArrowUp"){
        current_splash_option--;
        if(current_splash_option < 0 ){
            current_splash_option = splash_options.length - 1;
        }
    }
    if(key == "ArrowDown"){
        current_splash_option++;
        if(current_splash_option >= splash_options.length ){
            current_splash_option = 0;
        }
    }
}

// GM_LEVEL_SELECT

function gm_level_select_draw(){
    background(255);
    select_draw_bg();

    let cpage = int(select_current_selected / select_levels_perpage);
    let tpages = ceil(LEVELS.length / select_levels_perpage);
    for(let i = cpage * select_levels_perpage; i <  cpage * select_levels_perpage + select_levels_perpage; i++){
        if(i >= LEVELS.length){
            break;
        }
        let lindex = i % select_levels_perpage;
        let row = lindex % int((select_levels_perpage / select_total_cols));
        let col = int(lindex / (select_levels_perpage / select_total_cols));
        print_level_info(width/4 + 25 + (width/select_total_cols-50) * col, 190 + row * 75, 300, LEVELS[i].title, select_current_selected == i);
        textAlign(RIGHT, TOP);
        textSize(15);
        if(__level_aced(i)){
            text("⭐", width/4 + 25 + (width/select_total_cols-50) * col + 150,  190 + row * 75 +5);
        }
        if(__level_cleared(i)){
            text("🏁", width/4 + 25 + (width/select_total_cols-50) * col + 150,  190 + row * 75 - (75/3) + 5);
        }
        textAlign(LEFT, TOP);
        text(i+1, width/4 + 25 + (width/select_total_cols-50) * col - 148,  190 + row * 75 - (75/3) + 5);
    }
    textAlign(LEFT);
    fill(0);
    textSize(25);
    text(__get_text("LEVEL_SELECT_SELECT"), 30, 30);

    textAlign(LEFT, TOP);
    textSize(18);
    text(__get_text("LEVEL_SELECT_INSTR"), 10, height-50);

    if(tpages > 1){
        textSize(20);
        text(__get_text("LEVEL_SELECT_PAGE") + (cpage+1) + "/" + ceil(LEVELS.length / select_levels_perpage), width/4 +25 - 150, 145);
        textAlign(CENTER);
        textSize(50);
        fill(50);
        stroke(0);
        if(cpage < tpages - 1){
            text("▶", width -30, height/2);
        }
        if(cpage > 0){
            text("◀", 30, height/2);
        }
    }
}

function select_draw_bg(){
    noStroke();
    background(69, 186, 230);
    let bgimg_width = 500,
        bgimg_height = 300;
    fill(63, 143, 110);
    rect(0, height/2, width, height/2);
    let offset = ((frameCount * 1) % bgimg_width);
    for(let x = -bgimg_width; x < width + bgimg_width; x += bgimg_width){
        image(img_bg, x - offset , height/4, bgimg_width, bgimg_height);
    }
}
function print_level_info(x, y, w, txt, selected){
    rectMode(CENTER);

    textAlign(CENTER, CENTER);
    fill(40);
    textSize(19);
    if(selected == true){
        fill(50, 55, 105);
    }
    strokeWeight(2);
    stroke(0);
    rect(x, y, w, 50);
    fill(200);
    if(selected == true){
        fill(255 - abs(sin(frameCount * 0.4))*45, 186 - abs(sin(frameCount * 0.4 ))*45, 233 - abs(sin(frameCount* 0.4))*45);
    }
    noStroke();
    text(txt, x, y);
}
function gm_level_select_keypressed(){
    if(key == 'a' || key == "A"){
        reset_world();
        returnToEditor = false;
        __set_game_mode(GM_LEVEL_PLAY);
        return;
    }
    if(key == "ArrowDown"){
        if(select_current_selected % 5 == 4){
            select_current_selected -= 4;
        } else if(select_current_selected == LEVELS.length - 1){
            select_current_selected -= LEVELS.length % 5 - 1;
        }  else {
            select_current_selected++;
        }
    }
    if(key == "ArrowUp"){
        if(select_current_selected % int(select_levels_perpage/2) == 0){
            select_current_selected += min(int(select_levels_perpage/2)-1, LEVELS.length - select_current_selected - 1);
        } else {
            select_current_selected--;
        }
    }
    if(key == "ArrowLeft"){
        if(select_current_selected < select_levels_perpage / select_total_cols){
            return;
        }
        select_current_selected -= int(select_levels_perpage/2);
    }
    if(key == "ArrowRight"){
        select_current_selected += int(select_levels_perpage / select_total_cols);
        if(select_current_selected >= LEVELS.length){
            select_current_selected = LEVELS.length -1;
        }
    }
    if(key == 'q'){
        __set_game_mode(GM_SPLASH);
    }
}

// GM_LEVEL_PLAY
function gm_level_play_draw(){
    Matter.Engine.update(ENGINE)
    draw_background();
    textSize(30);
    fill(0);
    push();
    fill(63, 143, 110);
    noStroke();

    imageMode(CENTER);
    let translate_offset = min(-start_coords[0] + 100, -bike.bikeBody.m_body.position.x+400);
    translate(translate_offset, -bike.bikeBody.m_body.position.y + height/2);

    // death barrer
    fill(255, 0, 0);
    rect(bike.bikeBody.m_body.position.x-width,death_barrier, width*2, 1);

    // Throttle
    if(throttle){
        // Old method
        // bike.wheelRear.m_body.torque = P_BIKE_TORQUE_THROTTLE_WHEEL_REAR;
        // bike.wheelRear.m_body.torque = -1;

        let acc = min(bike.wheelRear.m_body.angularVelocity + 0.05, 0.8);
        Matter.Body.setAngularVelocity(bike.wheelRear.m_body, acc);
        if(rearWheelTouchesGround()){
            bike.bikeBody.m_body.torque = -1.5;
        }
    }
    // Brake
    if(brake){
        if(bike.wheelRear.m_body.angularVelocity > 0 ){
            bike.wheelRear.m_body.torque = P_BIKE_TORQUE_BRAKE_WHEEL_REAR;
        }
    }

    // Hop on rear wheel
    if(hop && rearWheelTouchesGround() && !frontWheelTouchesGround()){
        Matter.Body.applyForce(bike.bikeBody.m_body, {"x": bike.bikeBody.m_body.position.x, "y": bike.bikeBody.m_body.position.y-20} , {"x": 0.1, "y": -0.65});
    }

    // Tilt forward/backwards
    if(tiltback || tiltforward){
        bike.bikeBody.m_body.torque += tiltback ? P_BIKE_TORQUE_TILT_BACK : P_BIKE_TORQUE_TILT_FORWARD;
        if(bike.bikeBody.m_body.torque > 4){
            bike.bikeBody.m_body.torque = 4;
        }
        if(bike.bikeBody.m_body.torque < -4){
            bike.bikeBody.m_body.torque = -4;
        }
    }
    bike.draw();

    let camerabounds = {"x1": -translate_offset - 50,
                        "x2": -translate_offset + width + 50,
                        "y1": bike.bikeBody.m_body.position.y - height/2 - 50,
                        "y2": bike.bikeBody.m_body.position.y + height/2 + 50} ;
    objects.forEach((el) => {
        if(!__rect_overlap({"x1": el.m_body.bounds.min.x, "x2": el.m_body.bounds.max.x, "y1": el.m_body.bounds.min.y, "y2": el.m_body.bounds.max.y}, camerabounds )){
            return;
        }
        el.draw();
    });

    checkpoints.forEach((el) => {
        if(el.x == spawn[0] && el.y == spawn[1]){
            return;
        }
        let x = el.x, y = el.y;
        push();
        let bikepos = bike.bikeBody.m_body.position;
        if(dist(bikepos.x, bikepos.y, x, y) < 55){
            spawn = [x, y];
        }
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0,0,0,255);
        text("🚩", x, y + sin(frameCount*0.1) * 3 );
        pop();
    });
    push();

    textAlign(CENTER, CENTER);
    textSize(40);

    fill(0,0,0,255);
    text("🏁", goal_coords[0], goal_coords[1] + sin(frameCount*0.1) * 2 );
    pop();
    rectMode(CORNER);
    fill(50,50,255);

    if(bike.bikeBody.m_body.position.y > death_barrier || shuraCollides()){
        reset_world(true);
        return;
    }

    if(dist(bike.bikeBody.m_body.position.x, bike.bikeBody.m_body.position.y, goal_coords[0], goal_coords[1]) < 55){
        stats['end'] = Date.now();
        if(returnToEditor){
            __set_game_mode(GM_LEVEL_EDITOR);
            return;
        }
        if(!__level_cleared(select_current_selected)){
            let tmp = JSON.parse(localStorage.getItem("cleared"));
            tmp.push(select_current_selected);
            localStorage.setItem("cleared", JSON.stringify(tmp));
        }
        if(stats['restarts'] == 0 && !__level_aced(select_current_selected)){
            let tmp = JSON.parse(localStorage.getItem("aced"));
            tmp.push(select_current_selected);
            localStorage.setItem("aced", JSON.stringify(tmp));
        }
        __set_game_mode(GM_LEVEL_FINISH);
        return;
    }
    pop();
    textAlign(LEFT, TOP);
    textSize(18);
    text(__get_text("LEVEL_PLAY_INSTR"), 10, height-20);
    if(returnToEditor){
        textSize(25);
        text(__get_text("LEVEL_PLAY_EDITOR"), 15, 15);
    } else {
        let level_author = "";
        if(LEVELS[select_current_selected]['author']){
            level_author =  __get_text("LEVEL_FINISH_BY") + " " +  LEVELS[select_current_selected]['author'];
        }
        text(level_author, 15, 35);
        textSize(25);
        text(LEVELS[select_current_selected].title, 15, 15);
    }
}

function gm_level_play_keypressed(){
    if(key == 'q' || key == 'Q'){
        if(returnToEditor){
            __set_game_mode(GM_LEVEL_EDITOR);
            return;
        }
        __set_game_mode(GM_LEVEL_RETURN);
        return;
    }
    if(key == 'w' || key == 'W'){
        reset_world(true);
    }
    if(key == 'a' || key == 'A'){
        throttle = true;
    }
    if(key == 's' || key == 'S'){
        brake = true;
    }
    if(key == 'd' || key == 'D'){
        hop = true;
    }
    if(key == 'e' || key == 'E'){
        //drawBodies = !drawBodies;
    }
    if(key == 'ArrowLeft'){
        tiltback = true;
    }
    if(key == 'ArrowRight'){
        tiltforward = true;
    }
}

function gm_level_play_keyreleased(){
    if(key == 'a' || key == 'A'){
        throttle = false;
    }
    if(key == 's' || key == 'S'){
        brake = false;
    }
    if(key == 'd' || key == 'D'){
        hop = false;
    }
    if(key == 'ArrowLeft'){
        tiltback = false;
    }
    if(key == 'ArrowRight'){
        tiltforward = false;
    }
}

function draw_background(){
    background(69, 186, 230);
    let bgimg_width = 500,
        bgimg_height = 300;
    fill(63, 143, 110);
    rect(0, height/4 + start_coords[1] + (-bike.bikeBody.m_body.position.y ) + 100, width, height/2+1500 );

    for(let x = -bgimg_width; x < width + bgimg_width; x += bgimg_width){
        image(img_bg, x + floor(-bike.bikeBody.m_body.position.x * 0.1 % bgimg_width), height/4 + start_coords[1] + (-bike.bikeBody.m_body.position.y ), bgimg_width, bgimg_height);
    }
}
function reset_world(preserve_spawn){
    Matter.World.clear(WORLD);
    Matter.Engine.clear(ENGINE);
    objects = [];
    throttle = false;
    brake = false;
    tiltback = false;
    tiltforward = false;
    hop = false;
    if(preserve_spawn != true){
        spawn = undefined;
        stats = {"start": Date.now(),
                "end": undefined,
                "restarts": 0};
    } else {
        stats['restarts'] += 1;
    }
    create_world();
}

function create_world(){
    let level_info = LEVELS[select_current_selected].data;
    if(returnToEditor){
        level_info = [[bikecoords, goalcoords, DEATHBARRIER], editor_checkpoints, editor_objects];
    }

    let basic = level_info[0],
        cps = level_info[1],
        level_objects = level_info[2];
    start_coords = basic[0];
    goal_coords = basic[1];
    death_barrier = basic[2];
    if(spawn == undefined){
        spawn = [start_coords[0], start_coords[1]];
    }
    bike = new ShapeShura(spawn[0], spawn[1]);
    for(let i = 0; i < level_objects.length; i++){
        let item = level_objects[i];
        let obj;
        if("r" in item){
            obj = new ShapeCircle(item.x, item.y, item.r/2, {friction: 0.9,restitution: P_OBJECT_RESTITUTION, isStatic: true});
        } else {
            obj = new ShapeRect(item.x, item.y, item.w, item.h, {friction: 0.9,restitution: P_OBJECT_RESTITUTION, isStatic: true, angle: item.angle});

        }

        objects.push(obj);
    }
    checkpoints = cps;
}

function shuraCollides(){
    let id = bike.shura.m_body.id;
    let re = new RegExp("(A" + id + "(?=B)|B" + id + "$)");
    for(let i = 0; i < ENGINE.pairs.collisionActive.length; i++){
        let coll = ENGINE.pairs.collisionActive[i];
        if(re.test(coll.id)){
            return true;
        }
    }
    return false;
}

function rearWheelTouchesGround(){
    for(let i = 0; i < ENGINE.pairs.collisionActive.length; i++){
        let coll = ENGINE.pairs.collisionActive[i];
        if(coll.id.search("A" + bike.wheelRear.m_body.id) != -1){
            return true;
        }
    }
    return false;
}
function frontWheelTouchesGround(){
    for(let i = 0; i < ENGINE.pairs.collisionActive.length; i++){
        let coll = ENGINE.pairs.collisionActive[i];
        if(coll.id.search("A" + bike.wheelFront.m_body.id) != -1){
            return true;
        }
    }
    return false;
}

// GM_LEVEL_RETURN
function gm_level_return_draw(){
    draw_background();
    rectMode(CENTER);
    rect(width/2, height/2, 500, 300, 10, 10, 10, 10);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text(__get_text("LEVEL_RETURN_PAUSE"), width/2, height/2-100);
    textSize(20);
    text(__get_text("LEVEL_RETURN_INSTR"), width/2, height/2);
    text();
}

function gm_level_return_keypressed(){
    if(key == 'q' || key == 'Q'){
        __set_game_mode(GM_LEVEL_SELECT);
        return;
    }

    if(key == 'a' || key == 'A'){
        __set_game_mode(GM_LEVEL_PLAY);
    }
    if(key == 's' || key == 'S'){
        reset_world();
        __set_game_mode(GM_LEVEL_PLAY);
        return;
    }
}

// GM_LEVEL_FINISH

function gm_level_finish_draw(){
    select_draw_bg();
    fill(0);
    let ellapsedtime = __to_precision((stats['end'] - stats['start']) / 1000, 1);
    let restarts = stats['restarts'];
    let star = restarts == 0 ? "☆" : "";
    let txt = `${ellapsedtime} seconds\n${restarts} restarts ${star}`;

    let level_info = LEVELS[select_current_selected]['title'];
    let level_author = "";
    if(LEVELS[select_current_selected]['author']){
        level_author =  __get_text("LEVEL_FINISH_BY") + " " +  LEVELS[select_current_selected]['author'];
    }

    textAlign(CENTER, CENTER);
    textSize(35);
    text(__get_text('LEVEL_FINISH_COMPLETED'), width/2, height/5);
    textSize(25);

    text(level_info, width/2, height/3);
    textSize(18);
    text(level_author, width/2, height/3+30);
    textSize(20);
    textAlign(LEFT);
    text(__get_text('LEVEL_FINISH_TIME'), width/2 - 110, height/2);
    text(__get_text('LEVEL_FINISH_RETRIES'), width/2 - 110, height/2 + 30);
    textAlign(RIGHT);
    text(__format_time(ellapsedtime) + "s", width/2 + 110, height/2);
    text(restarts, width/2 + 110, height/2+30);
    textAlign(LEFT, TOP);
    textSize(18);
    fill(0);
    text(__get_text("LEVEL_FINISH_INSTR"), 10, height-20);
}


function gm_level_finish_keypressed(){
    if(key == "q" || key == "Q"){
        __set_game_mode(GM_LEVEL_SELECT);
    }
    if(key == "a" || key == "A"){
        reset_world();
        __set_game_mode(GM_LEVEL_PLAY);
    }
}

// GM_CREDITS
let creditsoffset = 0;

function gm_credits_draw(){
    background(30);
    fill(255);
    textAlign(LEFT, TOP);
    textSize(18);
    text(__get_text('CREDITS_INSTR'), 10, height-20);
    textSize(25);
    textAlign(CENTER, TOP);
    fill(255, 186, 233);
    text(INGAME_CREDITS.replace(/\{([A-Z_]+)\}/g, (match) => { let id = match.replace('{', '').replace('}', ''); return __get_text(id);}), width/2, height-creditsoffset);
    creditsoffset += 2;
    if(creditsoffset > 2000){
        creditsoffset = 0;
    }
}

function gm_credits_keypressed(){
    if(key == "q" || key == "Q"){
        __set_game_mode(GM_SPLASH);
        creditsoffset = 0;
    }
}


// GM_LEVEL_EDITOR

function gm_level_editor_draw(){
    background(100);
    push();
    rectMode(CENTER);
    stroke(255, 0, 0);
    fill(255,255,255,50);
    translate(width/2 + X_OFF, height/2 + Y_OFF);
    scale(ZOOM);

    let cso = __getSelectedObject();
    for(let i = 0; i < editor_objects.length; i++){

        push();

        let obj = editor_objects[i];
        if(obj == cso){

            fill(100,100,255, 100);
        }
        translate(obj.x, obj.y);

        if("r" in obj){
            ellipse(0, 0, obj.r);
        } else {
            rotate(obj.angle);
            rect(0, 0, obj.w, obj.h);
        }
        pop();
    }
    for(let i = 0; i < editor_checkpoints.length; i++){
        let cp = editor_checkpoints[i];
        push();
        textSize(40);
        if(cso == cp){
            ellipse(cp.x, cp.y, 55);
        }
        textAlign(CENTER, CENTER);
        text("🚩", cp.x, cp.y);
        pop();
    }
    if(bikecoords != undefined){
        drawbike(bikecoords[0], bikecoords[1]);
    }
    if(goalcoords != undefined){
        push();
        textSize(40);
        textAlign(CENTER, CENTER);
        text("🏁", goalcoords[0], goalcoords[1]);
        pop();
    }
    if(DEATHBARRIER != undefined){
        line(-5000, DEATHBARRIER, 5000, DEATHBARRIER);
    }
    pop();
    draw_gui();
}

function gm_level_editor_mousepressed(){
    if(textarea_open){
        return;
    }
    let button_size = 32;
    for(let i = 0; i < BUTTONS.length; i++){
        if(in_box(mouseX, mouseY, i * button_size, 0, button_size, button_size)){
            if(BUTTONS[i].id == 'zoomin'){
                ZOOM += 0.1;
                return;
            }
            if(BUTTONS[i].id == 'zoomout'){
                ZOOM -= 0.1;
                if(ZOOM < 0.1){
                    ZOOM = 0.1;

                }
                return;
            }
            if(BUTTONS[i].id == 'clear'){
                __clear_editor_objects();
                localStorage.setItem("editor", null);
                return;
            }
            if(BUTTONS[i].id == 'play'){
                if((bikecoords == undefined || goalcoords == undefined || DEATHBARRIER == undefined)){
                    return;
                }
                returnToEditor = true;
                reset_world();
                __set_game_mode(GM_LEVEL_PLAY);
                return;
            }
            if(BUTTONS[i].id == 'save'){
                data_textarea.style("display", "initial");
                data_textarea.position(width/2 - 300, height/2 - 200);
                if(bikecoords == undefined || goalcoords == undefined || DEATHBARRIER == undefined){
                    data_textarea.value(__get_text('EDITOR_DEFINE_EVERYTHING'));
                } else{
                    let tmpdata = __export_data();
                    data_textarea.value(tmpdata);
                    localStorage.setItem("editor", JSON.stringify(tmpdata));
                }
                CURRENT_TOOL = BUTTONS[i].id;
                textarea_open = true;
                return;
            }
            if(BUTTONS[i].id == 'load'){
                data_textarea.style("display", "initial");
                data_textarea.position(width/2 - 300, height/2 - 200);
                data_textarea.value("");
                CURRENT_TOOL = BUTTONS[i].id;
                textarea_open = true;
                return;
            }
            if(BUTTONS[i].id == 'exit'){
                returnToEditor = false;
                __set_game_mode(GM_SPLASH);
                return;
            }
            CURRENT_TOOL = BUTTONS[i].id;
            return;
        }
    }

    if(CURRENT_TOOL == 'deathbarrier' && __in_canvas()){
        DEATHBARRIER = __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM));
    }
    if(CURRENT_TOOL == 'add_rect' && (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)){
        let new_obj = {'x': __to_precision((mouseX - (width/2 + X_OFF)) * (1/ZOOM)), 'y': __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM)), 'w': 100, 'h': 50, 'angle': 0};
        editor_objects.push(new_obj);
    }
    if(CURRENT_TOOL == 'add_circle' && (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)){
        let new_obj = {'x': __to_precision((mouseX - (width/2 + X_OFF)) * (1/ZOOM)), 'y': __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM)), 'r': 50};
        editor_objects.push(new_obj);
    }
    if(CURRENT_TOOL == 'delete' && (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)){
        let cso = __getSelectedObject();
        for(let i = editor_objects.length-1; i >= 0; i--){
            if(editor_objects[i] == cso){
                editor_objects.splice(i, 1);
                return;
            }
        }
        for(let i = editor_checkpoints.length-1; i >= 0; i--){
            if(editor_checkpoints[i] == cso){
                editor_checkpoints.splice(i, 1);
                return;
            }
        }
    }
    if(CURRENT_TOOL == 'checkpoint' && __in_canvas()){
        let new_obj = {'x': __to_precision((mouseX - (width/2 + X_OFF)) * (1/ZOOM)), 'y': __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM))};
        editor_checkpoints.push(new_obj);
    }
    if(CURRENT_TOOL == 'bike' && (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)){
        bikecoords = [__to_precision((mouseX - (width/2 + X_OFF)) * (1/ZOOM)), __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM))];
    }
    if(CURRENT_TOOL == 'goal' && __in_canvas()){
        goalcoords = [__to_precision((mouseX - (width/2 + X_OFF)) * (1/ZOOM)), __to_precision((mouseY - (height/2 + Y_OFF)) * (1/ZOOM))];
    }

}

function gm_level_editor_mousedragged(){
    if(textarea_open){
        return;
    }
    if(CURRENT_TOOL == 'drag'){
        if(prev_mouseX != undefined){
            X_OFF += mouseX - prev_mouseX;
        }
        if(prev_mouseY != undefined){
            Y_OFF += mouseY - prev_mouseY;
        }
    }
    if(CURRENT_TOOL == 'move'){
        let obj = __getSelectedObject();
        if (obj != undefined){
            let _x_off = 0;
            let _y_off = 0;
            if(prev_mouseX != undefined){
                _x_off += mouseX - prev_mouseX;
            }
            if(prev_mouseY != undefined){
                _y_off += mouseY - prev_mouseY;
            }
            obj.x += _x_off * 1/ZOOM;
            obj.x = __to_precision(obj.x);
            obj.y += _y_off * 1/ZOOM;
            obj.y = __to_precision(obj.y);
            currently_selected_object = obj;
        }

    }
    if(CURRENT_TOOL == 'rotate'){
        let obj = __getSelectedObject();
        if (obj != undefined){
            let _x_off = 0;
            let _y_off = 0;
            let trans_mouseX = (mouseX - (width/2 + X_OFF)) * (1/ZOOM);
            let trans_mouseY = (mouseY - (height/2 + Y_OFF)) * (1/ZOOM);
            if(prev_mouseX != undefined){
                _x_off += mouseX - prev_mouseX;
            }
            if(prev_mouseY != undefined){
                _y_off += mouseY - prev_mouseY;
            }
            if("r" in obj){

            } else {
                obj.angle += _y_off * 0.015 * (trans_mouseX > obj.x ? 1 : -1);
                obj.angle = __to_precision(obj.angle % PI, 3);

            }
            currently_selected_object = obj;
        }
    }
    if(CURRENT_TOOL == 'hexpand'){
        let obj = __getSelectedObject();
        if (obj != undefined){
            let _x_off = 0;
            let _y_off = 0;
            if(prev_mouseX != undefined){
                _x_off += mouseX - prev_mouseX;
            }
            if(prev_mouseY != undefined){
                _y_off += mouseY - prev_mouseY;
            }
            if("r" in obj){
                obj.r += _x_off;
            } else {
                obj.w += _x_off;
            }
            currently_selected_object = obj;
        }
    }
    if(CURRENT_TOOL == 'vexpand'){
        let obj = __getSelectedObject();
        if (obj != undefined){
            let _x_off = 0;
            let _y_off = 0;
            if(prev_mouseX != undefined){
                _x_off += mouseX - prev_mouseX;
            }
            if(prev_mouseY != undefined){
                _y_off += mouseY - prev_mouseY;
            }
            if("r" in obj){
                obj.r += _y_off;
            } else {
                obj.h += _y_off;

            }
            currently_selected_object = obj;
        }
    }
    prev_mouseX = mouseX;
    prev_mouseY = mouseY;
}

function gm_level_editor_mousereleased(){
    prev_mouseX = undefined;
    prev_mouseY = undefined;
    currently_selected_object = undefined;
}

function gm_level_editor_keypressed(){
    if(key == 'Escape' && data_textarea.style("display") != "none"){
        if(CURRENT_TOOL == 'load'){
            __import_data(data_textarea.value());
        }
        data_textarea.style("display", "none");
        textarea_open = false;
        CURRENT_TOOL = 'drag';
    }
}
function draw_gui(){
    if(textarea_open){
        push();
        strokeWeight(3);
        textSize(20);
        fill(255);
        textAlign(LEFT, CENTER);
        text(__get_text('EDITOR_PRESS_ESCAPE'), 10, height-25);
        pop();
    }
    let button_size = 32;
    strokeWeight(1);
    for(let i = 0; i < BUTTONS.length; i++){
        push();
        rectMode(CORNER);
        fill(200);

        if(in_box(mouseX, mouseY, i * button_size, 0, button_size, button_size)){
            strokeWeight(3);
            push();
            textSize(20);
            fill(255);
            if(!textarea_open){
                textAlign(LEFT, CENTER);
                if(BUTTONS[i].help_id == 'EDITOR_BUTTON_PLAY' && (bikecoords == undefined || goalcoords == undefined || DEATHBARRIER == undefined)){
                    text(__get_text('EDITOR_BUTTON_PLAYDISABLED'), 10, height-25);
                } else {
                    text(__get_text(BUTTONS[i].help_id), 10, height-25);
                }
            }
            pop();
        }
        if(BUTTONS[i].id == CURRENT_TOOL){
            fill(255,0, 0);
        }
        rect(i * button_size, 0, button_size, button_size);
        textAlign(CENTER, CENTER);
        textSize(11);
        if(BUTTONS[i].id == 'bike'){
            textSize(18);
        }
        if(['rotate', 'hexpand', 'vexpand'].includes(BUTTONS[i].id)){
            textSize(20);
        }
        if(['checkpoint', 'goal', 'deathbarrier'].includes(BUTTONS[i].id)){
            textSize(15);
        }
        fill(0);
        noStroke();
        if(BUTTONS[i].id == CURRENT_TOOL){
            fill(255);
        }
        strokeWeight(1);
        text(BUTTONS[i].label, i * button_size + button_size/2, button_size / 2);
        pop();
    }
}
function __getSelectedObject(){
    if(currently_selected_object){
        return currently_selected_object;
    }
    let trans_mouseX = (mouseX - (width/2 + X_OFF)) * (1/ZOOM);
    let trans_mouseY = (mouseY - (height/2 + Y_OFF)) * (1/ZOOM);
    for(let i = 0; i < editor_objects.length; i++){

        let obj = editor_objects[i];

        if("r" in obj){
            if(dist(trans_mouseX, trans_mouseY, obj.x, obj.y) < obj.r/2){
                return obj;
            }
        } else {
            let aaaX = trans_mouseX - obj.x;
            let aaaY = trans_mouseY - obj.y;
            let theta = atan(aaaY / aaaX);
            let hip = dist(trans_mouseX, trans_mouseY, obj.x, obj.y);
            let rotatedX = hip * cos(-theta + obj.angle);
            let rotatedY = hip * sin(-theta + obj.angle);
            if(in_box(rotatedX + obj.x, rotatedY + obj.y, obj.x - (obj.w / 2), obj.y - (obj.h / 2), obj.w, obj.h)){
                return obj;
            }
        }

    }
    for(let i = 0; i < editor_checkpoints.length; i++){
        let cp = editor_checkpoints[i];
        if(dist(trans_mouseX, trans_mouseY, cp.x, cp.y) < 25){
            return cp;
        }
    }
    return undefined;
}

function in_box(x, y, bx, by, bw, bh){
    if((x > bx && x < (bx + bw)) && (y > by && y < (by + bh))){
        return true;
    }
    return false;
}

function drawbike(x, y){
    push();
    rectMode(CENTER);
    fill(255, 100,255);
    rect(x,y, 120, 45);
    ellipse(x+50, y+15, 22*2);
    ellipse(x-50, y+15, 22*2);
    pop();
}

function __export_data(){
    let data = [[bikecoords, goalcoords, DEATHBARRIER], editor_checkpoints, editor_objects];
    return JSON.stringify(data);
}

function __import_data(data){
    try {
        data = JSON.parse(data);
        bikecoords = data[0][0];
        goalcoords = data[0][1];
        DEATHBARRIER = data[0][2];
        editor_objects = data[2];
        editor_checkpoints = data[1];

    } catch(e){
    };
}

function __clear_editor_objects(){
    editor_objects = [];
    editor_checkpoints = [];
    bikecoords = undefined;
    goalcoords = undefined;
    DEATHBARRIER = undefined;
}

// GM_TUTORIAL

function gm_tutorial_draw(){
    background(69, 186, 230);
    __draw_fake_ground(width/2, 500 , width, height/2);
    push();
    textAlign(CENTER, CENTER);
    textSize(35);

    text(__get_text('TUTORIAL_HOWTO'), width/2, 50);
    textAlign(LEFT, TOP);
    textSize(18);
    text(__get_text('CREDITS_INSTR'), 10, height-20);

    pop();
    textSize(20);
    __draw_fake_bike(150, 316);
    textAlign(CENTER, CENTER);
    text(__get_text("TUTORIAL_THROTTLEBRAKE"), 135, 400);
    text(__get_text("TUTORIAL_TILT"), 385, 400);
    text(__get_text("TUTORIAL_HOP"), 660, 410);
    textAlign(LEFT, CENTER);
    textSize(55);
    fill(255, 100, 100, 210);
    text("🡆 🡆 🡆", 60, 320);
    push();
    __draw_fake_bike(400, 302, -QUARTER_PI + 0.5);

    push();
    translate(415, 260);
    rotate(-QUARTER_PI -HALF_PI);
    text("🡆", 0, 0);
    pop();
    push();
    translate(400, 310);
    rotate(QUARTER_PI);
    text("🡆", 0, 0);
    pop();

    pop();
    push();
    __draw_fake_bike(650, 276, -QUARTER_PI - 0.3);
    push();
    translate(660, 276);
    rotate(-HALF_PI);
    text("🡆", 0, 0);
    pop();
    pop();
}

function gm_tutorial_keypress(){
    if(key == "q" || key == "Q"){
        __set_game_mode(GM_SPLASH);
    }
}
