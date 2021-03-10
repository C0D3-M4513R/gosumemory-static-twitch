let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
// Variables
let mainContainer = document.getElementById("main");
let line = document.getElementById("line");
let gameContainer = document.getElementById("game-container");
let songContainer = document.getElementById("song-container");
let sliderBreak = document.getElementById("sb");
let ppFC = document.getElementById("ppfc");
let rank = document.getElementById("rank");

const defaultMenuPPAcc = "97"
// Functions
function setRankStyle(text, color, shadow) {
	rank.innerHTML = text;
	rank.style.color = color;
	rank.style.textShadow = shadow;
}
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
	console.log("Socket Closed Connection: ", event);
	socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);
let pp = new CountUp('pp', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: " "
	, decimal: "."
});
let fc = new CountUp('ppfc', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: " "
	, decimal: "."
});
let h100 = new CountUp('h100', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: ""
	, decimal: "."
});
let h50 = new CountUp('h50', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: ""
	, decimal: "."
});
let h0 = new CountUp('h0', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: ""
	, decimal: "."
});
let ss = new CountUp('ss', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: " "
	, decimal: "."
});
let sb = new CountUp('sb', 0, 0, 0, .5, {
	useEasing: true
	, useGrouping: true
	, separator: " "
	, decimal: "."
});

let olddata=undefined;
//----------------------------------------
const username = "c0d3_m4513r";
const token = "oauth:z91ex396c2v0qnc19tfg6ztp9dfqu9";
const channel = "#c0d3_m4513r"

const run = async ()=>{
    const chat = new window.TwitchJs.Chat(
    {username,
     token,
     log: { level: "warn" }
    });  
  
  chat.on("*", async (message) => {
    const time = new Date(message.timestamp).toTimeString();
    const event = message.event || message.command;
    const channel = message.channel;
    const msg = message.message || "";

    console.log(time+","+event+","+channel+","+msg)
    let send=undefined;
    let bpm="";
    switch(msg){
	case "!commands":
	    send="!np,!id,!set,!igpp,!pp,!status,!ar,!cs,!od,!hp,!diff,!bpm,!combo"
	    break;
	case "!ping":
	    if(message.username=username) send = "Pong!"
	    break;
        case "!np":
            send=`${olddata.menu.bm.metadata.title} Artist:${olddata.menu.bm.metadata.artist} Mapper:${olddata.menu.bm.metadata.mapper} Diff:${olddata.menu.bm.metadata.difficulty} Mods:${olddata.menu.mods.str}`
            break;
        case "!id":
            send=`${olddata.menu.bm.id}`
            break;
	case "!set":
            send=`${olddata.menu.bm.set}`
            break;
	case "!igpp":
	    if(olddata.menu.state===2)
	    send=`Current: ${olddata.gameplay.pp.current} Possible max: ${olddata.gameplay.pp.maxThisPlay} FC: ${olddata.gameplay.pp.fc}`
	    break;
        case "!pp":
	    send=`95%: ${olddata.menu.pp[95]}pp, 96%: ${olddata.menu.pp[96]}pp,97%: ${olddata.menu.pp[97]}pp, 98%: ${olddata.menu.pp[98]}pp,99%: ${olddata.menu.pp[99]}pp, 100%: ${olddata.menu.pp[100]}pp`
	    break;
	case "!status":
	case "!stats":
	    let tmp=""
	    switch(olddata.menu.bm.rankedStatus){
		case 1:
		    tmp="unsubmitted, "
		    break;
		case 2:
		    tmp="Pending/WIP/Graveyard, "
		    break;
		case 4:
		    tmp="Ranked, "
		    break;
		case 5:
		    tmp="Approved, "
		    break;
		case 6:
		    tmp="Qualified, "
		    break;
	    }
	    if(olddata.menu.bm.stats.BPM.min===olddata.menu.bm.stats.BPM.max) bpm=`${olddata.menu.bm.stats.BPM.min}`
	    else bpm=`${olddata.menu.bm.stats.BPM.min}-${olddata.menu.bm.stats.BPM.max}`
	    send=`${tmp}AR: ${olddata.menu.bm.stats.AR},CS: ${olddata.menu.bm.stats.CS},OD: ${olddata.menu.bm.stats.OD},HP: ${olddata.menu.bm.stats.HP},Diff: ${olddata.menu.bm.stats.fullSR}, BPM: ${bpm}`
	    break;
	case "!ar":
	    send=`AR: ${olddata.menu.bm.stats.AR}`
	    break;
	case "!cs":
	    send=`CS: ${olddata.menu.bm.stats.CS}`
	    break;
	case "!od":
	    send=`OD: ${olddata.menu.bm.stats.OD}`
	    break;
	case "!hp":
	    send=`HP: ${olddata.menu.bm.stats.HP}`
	    break;
	case "!diff":
	    send=`Diff: ${olddata.menu.bm.stats.fullSR}`
	    break;
	case "!bpm":
	    if(olddata.menu.bm.stats.BPM.min===olddata.menu.bm.stats.BPM.max) bpm=`${olddata.menu.bm.stats.BPM.min}`
	    else bpm=`${olddata.menu.bm.stats.BPM.min}-${olddata.menu.bm.stats.BPM.max}`
	    send=`BPM: ${bpm}`
	    break;
	case "!combo":
           if(olddata.menu.state===2)
	   send=`Current: ${olddata.gameplay.combo.current}, Max: ${olddata.gameplay.combo.max}`
	   break;
    }
    if(send!==undefined){
	console.log("trying to send msg. with content:"+send)
	chat.say(channel,send).then(()=>{console.log("sucess")});
    }
  });
  
  await chat.connect();
  await chat.join(channel);
}

run()
//------------------------------------------------------------------------------

socket.onmessage = event => {
	try {
		let data = JSON.parse(event.data)
			, menu = data.menu
			, play = data.gameplay
			, hitGrade = data.gameplay.hits.grade.current
			, hdfl = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") ? true : false)
			, tempGrade = ""
			, tempColor = ""
			, tempShadow = "";
		olddata=data;
		// Rank Check
		function rankCheck() {
			switch (hitGrade) {
                case "SS":
                    tempGrade = hitGrade;
                    tempColor = (hdfl ? "#e0e0e0" : "#d6c253");
                    tempShadow = (hdfl ? "0 0 0.5rem #e0e0e0" : "0 0 0.5rem #d6c253");
                    break;
                case "S":
                    tempGrade = hitGrade;
                    tempColor = (hdfl ? "#e0e0e0" : "#d6c253");
                    tempShadow = (hdfl ? "0 0 0.5rem #e0e0e0" : "0 0 0.5rem #d6c253");
                    break;
                case "A":
                    tempGrade = hitGrade;
                    tempColor = "#7ed653";
                    tempShadow = "0 0 0.5rem #7ed653";
                    break;
                case "B":
                    tempGrade = hitGrade;
                    tempColor = "#53d4d6";
                    tempShadow = "0 0 0.5rem #53d4d6";
                    break;
                case "C":
                    tempGrade = hitGrade;
                    tempColor = "#d6538e";
                    tempShadow = "0 0 0.5rem #d6538e";
                    break;
                case "D":
                    tempGrade = hitGrade;
                    tempColor = "#f04848";
                    tempShadow = "0 0 0.5rem #f04848";
                    break;
                default:
                    tempGrade = "SS";
                    tempColor = (hdfl ? "#ffffff" : "#d6c253");
                    tempShadow = (hdfl ? "0 0 0.5rem #ffffff" : "0 0 0.5rem #d6c253");;
                    break;
			}
		}
		//Game State Check
		switch (menu.state) {
            case 7:
            case 14:
            case 2:
                //Main
                mainContainer.style.opacity = "1";
                // Rank
                rankCheck();
                setRankStyle(tempGrade, tempColor, tempShadow);
                //Box
                document.documentElement.style.setProperty('--width', ` 500px`);
                // Line
                document.documentElement.style.setProperty('--progress', ` ${(menu.bm.time.current / menu.bm.time.mp3 * 100).toFixed(2)}%`);
                line.style.cssText = "transition: transform 500ms ease, opacity 20ms ease, width 500ms ease;";
                line.style.transform = "translate(0px, 5px)"
                line.style.opacity = "1"
                // Game Container
                gameContainer.style.top = "0";
                // Song Container
                songContainer.style.top = "100px";
                // Sliderbreak
                if (play.hits.sliderBreaks >= 1) {
                    sb.update(play.hits.sliderBreaks);
                    sliderBreak.style.transform = "scale(1)";
                    sliderBreak.style.opacity = "1";
                } else {
                    sliderBreak.style.transform = "scale(0)";
                    sliderBreak.style.opacity = "0";
                }
                // PP FC
                if (play.hits.sliderBreaks >= 1 || play.hits[0] >= 1) {
                    fc.update(play.pp.fc);
                    ppFC.style.transform = "scale(1)";
                    ppFC.style.opacity = "1";
                } else {
                    ppFC.style.transform = "scale(0)";
                    ppFC.style.opacity = "0";
                }
                // Set Only in Gameplay
                pp.update(play.pp.current);
                h100.update(play.hits[100]);
                h50.update(play.hits[50]);
                h0.update(play.hits[0]);
                break;
            case 0:
                //Main
                mainContainer.style.opacity = "0";
                break;
            default:
                //Main
                mainContainer.style.opacity = "1";
                // Rank
                setRankStyle("", tempColor, tempShadow);
                //Box
                document.documentElement.style.setProperty('--width', ` 300px`);
                //Line
                document.documentElement.style.setProperty('--progress', ` 100%`);
                line.style.cssText = "transition: transform 500ms ease, opacity 20ms ease, width 300ms ease;";
                line.style.transform = "translate(0px, 5px)"
                line.style.opacity = "1"
                // Game Container
                gameContainer.style.top = "-100px";
                //Song Container
                songContainer.style.top = "0";
                ss.update(menu.pp[defaultMenuPPAcc]);
                // Sliderbreak
                sliderBreak.style.transform = "scale(0)";
                sliderBreak.style.opacity = "0";
                // PP FC
                ppFC.style.transform = "scale(0)";
                ppFC.style.opacity = "0";
                break;
		}
	} catch (err) {
		console.log(err);
	};
};
