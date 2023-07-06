// Languages

let LANG_ES = 0,
    LANG_EN = 1;

let LANGUAGES = [];

LANGUAGES[LANG_ES] = {
    "PRESPLASH_INSTR" : "Haz clic aquí para empezar",

    "SPLASH_TITLE"    : "Shura's MotoAdventures",
    "SPLASH_TUTORIAL" : "Tutorial",
    "SPLASH_PLAY"     : "Jugar",
    "SPLASH_EDITOR"   : "Editor",
    "SPLASH_CREDITS"  : "Créditos",
    "SPLASH_INSTR"    : "Usa las flechas ⬆⬇\nPresiona A para empezar",

    "TUTORIAL_HOWTO"         : "¿Cómo jugar?",
    "TUTORIAL_THROTTLEBRAKE" : "A acelerar\nS frenar",
    "TUTORIAL_TILT"          : "⬅ girar hacia atrás\n➡ girar hacia adelante",
    "TUTORIAL_HOP"           : "D brincar\n(cuando se balancea en\nla rueda trasera)",

    "LEVEL_SELECT_SELECT" : "Selecciona un nivel",
    "LEVEL_SELECT_PAGE"   : "Página",
    "LEVEL_SELECT_INSTR"  : "Usa las flechas ⬅ ➡ ⬆ ⬇ para seleccionar un nivel\nA para empezar   Q para volver",

    "LEVEL_PLAY_INSTR"    : "Q para volver   W para reaparacer",
    "LEVEL_PLAY_EDITOR"   : "Editor",

    "LEVEL_RETURN_PAUSE"  : "PAUSA",
    "LEVEL_RETURN_INSTR"  : "Q selección de nivel\nA continuar jugando\nS reiniciar",

    "LEVEL_FINISH_BY"        : "por",
    "LEVEL_FINISH_COMPLETED" : "COMPLETADO",
    "LEVEL_FINISH_TIME"      : "Tiempo",
    "LEVEL_FINISH_RETRIES"   : "Muertes",
    "LEVEL_FINISH_INSTR"     : "Q para regresar a la selección de nivel   A para reiniciar este nivel",


    "EDITOR_BUTTON_DRAG"        : "Mover el nivel entero",
    "EDITOR_BUTTON_ZOOMOUT"     : "Alejar cámara",
    "EDITOR_BUTTON_ZOOMIN"      : "Acercar cámara",
    "EDITOR_BUTTON_BIKE"        : "Especificar punto de partida",
    "EDITOR_BUTTON_CHECKPOINT"  : "Agregar una bandera",
    "EDITOR_BUTTON_GOAL"        : "Especificar la meta",
    "EDITOR_BUTTON_DEATHB"      : "Especificar la altura de la barrera de muerte",
    "EDITOR_BUTTON_ADDRECT"     : "Agregar un objecto rectángulo",
    "EDITOR_BUTTON_ADDCIRCLE"   : "Agregar un objecto círculo",
    "EDITOR_BUTTON_DELETE"      : "Eliminar un objeto",
    "EDITOR_BUTTON_MOVE"        : "Mover un objeto",
    "EDITOR_BUTTON_ROTATE"      : "Rotar un objeto",
    "EDITOR_BUTTON_HEXPAND"     : "Expandir horizontalmente un objeto",
    "EDITOR_BUTTON_VEXPAND"     : "Expandir verticalmente un objeto",
    "EDITOR_BUTTON_CLEAR"       : "Eliminar todos los objetos",
    "EDITOR_BUTTON_EXPORT"      : "Exportar datos del nivel",
    "EDITOR_BUTTON_IMPORT"      : "Importar nivel",
    "EDITOR_BUTTON_PLAY"        : "Jugar nivel",
    "EDITOR_BUTTON_PLAYDISABLED": "Primero define punto de partida, meta y barrera de muerte",
    "EDITOR_BUTTON_EXIT"        : "Salir del editor",

    "EDITOR_DEFINE_EVERYTHING"  : "Para poder exportar los datos tienes que definir el punto de partida, la meta y la altura de la barrera de muerte",
    "EDITOR_PRESS_ESCAPE"       : "Presiona Escape para cerrar la caja de texto",


    "CREDITS_INSTR"        : "Presiona Q para volver",
    "CREDITS_CHARACTER"    : "PERSONAJE",
    "CREDITS_ILLUSTRATION" : "ILUSTRACIÓN",
    "CREDITS_MUSIC"        : "MÚSICA",
    "CREDITS_ADAPTATION"   : "ADAPTACIÓN A 8-BITS",
    "CREDITS_SPRITES"      : "SPRITES",
    "CREDITS_PROGRAMMER"   : "PROGRAMADOR",

    "CREDITS_CREDITS" : 'Créditos',
    "CREDITS_GAME"    : 'Juego',
    "CREDITS_ASSETS"  : 'Recursos',
    "CREDITS_OTHER"   : 'Otros',
    "CREDITS_TIPS"    : 'Consejos',
    "CREDITS_MAIN"    : `<i>Shura's MotoAdventures</i> es un pequeño <i>fangame</i> de la <del>png</del>vtuber <a href='https://twitter.com/ShuraHiwa' target='_blank'>Shura Hiwa</a>
                         inspirado por juegos como Trial Bike. El diseño de su personaje le pertenece. Este juego está publicado sin ninguna intención de lucro y es puramente por diversión.
                         El código fuente se puede encontrar <a href="https://github.com/sleepless-nts/ShuraMoto/" target="_blank">aquí</a>. Hecho por Sleepless Nights.`,
    "CREDITS_SECOND"  : `Este juego incluye un editor que puede utilizarse para crear niveles. Si tienes la paciencia de crear un nivel y quieres que sea incluído en el juego puedes escribirme en <a href="https://twitter.com/sleepless_nts" target="_blank">Twitter</a>.`,
    "CREDITS_THIRD"   : `La moto puede ser un poco difícil de controlar, trata de presionar la ⬅ flecha izquierda cuando aceleras para girar la moto un poco hacia atrás y mantener la rueda trasera en el suelo. También puedes dejar presionada la tecla D cuando estás en el aire, de esta manera harás un pequeño salto cuando la rueda trasera haga contacto con el suelo.`,
    "CREDITS_LIST"    : `<ul>
                            <li>Ilustración de Shura en moto hecha con ayuda de una IA por AI-Anon.</li>
                            <li><a href="https://www.youtube.com/watch?v=sBwuFogz3IE" target="_blank">Sling out</a>, BGM de Shura por DOVA-SYNDROME.</li>
                            <li>Adaptación a <i>8-bits</i> por Musician-Anon.</li>
                            <li><i>Sprite art</i> usado como fondo por <a href="https://opengameart.org/content/arcade-platformer-assets" target="_blank">GrafxKid</a></li>
                         </ul>`
};


LANGUAGES[LANG_EN] = {
    "PRESPLASH_INSTR" : "Click here to start",

    "SPLASH_TITLE"    : "Shura's MotoAdventures",
    "SPLASH_TUTORIAL" : "Tutorial",
    "SPLASH_PLAY"     : "Play",
    "SPLASH_EDITOR"   : "Editor",
    "SPLASH_CREDITS"  : "Credits",
    "SPLASH_INSTR"    : "Use ⬆⬇ arrow keys\nPress A to start",

    "TUTORIAL_HOWTO"         : "How to play?",
    "TUTORIAL_THROTTLEBRAKE" : "A throttle\nS brake",
    "TUTORIAL_TILT"          : "⬅ tilt backwards\n➡ tilt forwards",
    "TUTORIAL_HOP"           : "D jump\n(when balancing\non rear wheel)",

    "LEVEL_SELECT_SELECT" : "Select a level",
    "LEVEL_SELECT_PAGE"   : "Page",
    "LEVEL_SELECT_INSTR"  : "Use ⬅ ➡ ⬆ ⬇ keys to select a level\nA to start   Q to return",

    "LEVEL_PLAY_INSTR"    : "Q to return   W to respawn",
    "LEVEL_PLAY_EDITOR"   : "Editor",

    "LEVEL_RETURN_PAUSE"  : "PAUSE",
    "LEVEL_RETURN_INSTR"  : "Q level select\nA continue playing\nS restart",

    "LEVEL_FINISH_BY"        : "by",
    "LEVEL_FINISH_COMPLETED" : "COMPLETED",
    "LEVEL_FINISH_TIME"      : "Time",
    "LEVEL_FINISH_RETRIES"   : "Deaths",
    "LEVEL_FINISH_INSTR"     : "Q to return to level select   A to restart this level",

    "EDITOR_BUTTON_DRAG"        : "Move the entire level",
    "EDITOR_BUTTON_ZOOMOUT"     : "Zoom out",
    "EDITOR_BUTTON_ZOOMIN"      : "Zoom in",
    "EDITOR_BUTTON_BIKE"        : "Set bike starting position",
    "EDITOR_BUTTON_CHECKPOINT"  : "Add a flag checkpoint",
    "EDITOR_BUTTON_GOAL"        : "Set goal position",
    "EDITOR_BUTTON_DEATHB"      : "Set death barrier height",
    "EDITOR_BUTTON_ADDRECT"     : "Add a rectangle object",
    "EDITOR_BUTTON_ADDCIRCLE"   : "Add a circle object",
    "EDITOR_BUTTON_DELETE"      : "Delete an object",
    "EDITOR_BUTTON_MOVE"        : "Move an object",
    "EDITOR_BUTTON_ROTATE"      : "Rotate an object",
    "EDITOR_BUTTON_HEXPAND"     : "Horizonatally expand an object",
    "EDITOR_BUTTON_VEXPAND"     : "Vertically expand an object",
    "EDITOR_BUTTON_CLEAR"       : "Clear all objects",
    "EDITOR_BUTTON_EXPORT"      : "Export level data",
    "EDITOR_BUTTON_IMPORT"      : "Import level data",
    "EDITOR_BUTTON_PLAY"        : "Play level",
    "EDITOR_BUTTON_PLAYDISABLED": "First define starting point, goal and death barrier",
    "EDITOR_BUTTON_EXIT"        : "Exit editor",

    "EDITOR_DEFINE_EVERYTHING"  : "Before you export level data you have to define a starting point, a goal and the death barrier height",
    "EDITOR_PRESS_ESCAPE"       : "Press Escape to close the textbox",


    "CREDITS_INSTR"        : "Press Q to go back",
    "CREDITS_CHARACTER"    : "CHRACTER",
    "CREDITS_ILLUSTRATION" : "ILLUSTRATION",
    "CREDITS_MUSIC"        : "MUSIC",
    "CREDITS_ADAPTATION"   : "8-BIT ADAPTATION",
    "CREDITS_SPRITES"      : "SPRITES",
    "CREDITS_PROGRAMMER"   : "PROGRAMMER",

    "CREDITS_CREDITS" : 'Credits',
    "CREDITS_GAME"    : 'Game',
    "CREDITS_ASSETS"  : 'Assets',
    "CREDITS_OTHER"   : 'Other',
    "CREDITS_TIPS"    : 'Tips',
    "CREDITS_MAIN"    : `<i>Shura's MotoAdventures</i> is a small <i>fangame</i> of the <del>png</del>vtuber <a href='https://twitter.com/ShuraHiwa' target='_blank'>Shura Hiwa</a>
                         inspired by games like Trial Bike. Character design belongs to her. This game is published without any intention of profit and is merely for fun. The source
                         code can be found <a href="https://github.com/sleepless-nts/ShuraMoto/" target="_blank">here</a>. Made by Sleepless Nights.`,
    "CREDITS_SECOND"  : `This game includes an editor which can be used to create new levels. If you have the patience to create a level and you want it to be added to the game, you can contact me at <a href="https://twitter.com/sleepless_nts" target="_blank">Twitter</a>.`,
    "CREDITS_THIRD"   : `The bike can be a little bit difficult to control, try holding the ⬅ back arrow key when throttling to tilt a little bit backwards and keep the rear wheel on the ground. You can also keep the D key pressed while you're on the air, this way you will do a little hop when the rear wheel makes contact with the ground.`,

    "CREDITS_LIST"    : `<ul>
                            <li>Illustration of Shura riding a bike done with the help of an AI by AI-Anon.</li>
                            <li><a href="https://www.youtube.com/watch?v=sBwuFogz3IE" target="_blank">Sling out</a>, Shura's BGM by DOVA-SYNDROME.</li>
                            <li>8-bit adaptation by Musician-Anon.</li>
                            <li>Sprite art used as background by <a href="https://opengameart.org/content/arcade-platformer-assets" target="_blank">GrafxKid</a></li>
                         </ul>`
};


INGAME_CREDITS = `
{CREDITS_CHARACTER}
Shura Hiwa


{CREDITS_ILLUSTRATION}
AI-Anon


{CREDITS_MUSIC}
Dova Syndrome


{CREDITS_ADAPTATION}
Musician-Anon


{CREDITS_SPRITES}
GrafxKid


{CREDITS_PROGRAMMER}
Sleepless Nights
`;

PAGE_CREDITS = `
<h1>{CREDITS_CREDITS}</h1>
<h2>{CREDITS_GAME}</h2>
<p>{CREDITS_MAIN}</p>
<p>{CREDITS_SECOND}</p>
<h2>{CREDITS_ASSETS}</h2>
{CREDITS_LIST}
<h2>{CREDITS_OTHER}</h2>
<ul>
    <li><a href='https://flagicons.lipis.dev/'>Flag-icons</a></li>
    <li><a href='https://p5js.org/'>p5js</a></li>
    <li><a href='https://brm.io/matter-js/'>matter.js</a></li>
</ul>
<h2>{CREDITS_TIPS}</h2>
<p>{CREDITS_THIRD}</p>
`;