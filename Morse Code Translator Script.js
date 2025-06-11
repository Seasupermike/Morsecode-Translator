// JavaScript source code
let MorseCode = ``

let DIT = new Audio("DIT.wav")
let DAH = new Audio("DAH.wav")
let SoundPlaying = false;
let Paused = false;
let DurationMills = 0;

function UpdateMorseCode() {
    let Charaters = document.getElementById("WrittenText").value.split("")
    MorseCode = ``

    for (let i = 0; i < Charaters.length; i++) {
        MorseCode += Convert(Charaters[i])
    }

    UpdateUndefinedCharaters()
    $("#MorseCode").html(MorseCode)
}

function Convert(Letter) {
    for (let i = 0; i < Codes.length; i++) {
        if (Codes[i].Uppercase == Letter || Codes[i].Lowercase == Letter) {
            return Codes[i].Morse;
        }
    }
    return "";
}

async function ToggleSound() {
    let Charaters = MorseCode.split("")

    if (SoundPlaying) {
        DIT.pause();
        DAH.pause();

        DIT.currentTime = 0;
        DAH.currentTime = 0;

        SoundPlaying = false
        Paused = false
        $("#PauseButton").attr("src", "Images/Blank.png");
        $("#SoundButton").attr("src", "Images/Play.png");
    } else {
        SoundPlaying = true
        $("#PauseButton").attr("src", "Images/Pause.png");
        $("#SoundButton").attr("src", "Images/Stop.png");

        DurationMills = (CountCharacters(MorseCode, ".") * 500) + (CountCharacters(MorseCode, "_") * 750) + (CountCharacters(MorseCode, "&nbsp;") * 250)
        for (let i = 0; i < Charaters.length && SoundPlaying; undefined) {
            if (!Paused) {
                if (Charaters[i] == ".") {
                    (new Audio("Sounds/DIT.wav")).play();
                    await Delay(500)
                    DurationMills -= 500;
                }

                if (Charaters[i] == "_") {
                    DAH.play();
                    await Delay(750);
                    DurationMills -= 750;
                }

                if (Charaters[i] == "&nbsp;") {
                    await Delay(250);
                    DurationMills -= 250;
                }

                i++
                UpdateDuration()
            } else {
                await Delay(50);
            }
        }

        SoundPlaying = false;
        Paused = false;
        $("#PauseButton").attr("src", "Images/Blank.png");
        $("#SoundButton").attr("src", "Images/Play.png");
        $("#Duration").html("")
    }
}

function UpdateDuration() {
    let DurationSecs = 0;
    let DurationMins = 0;

    let DisplayedMills;
    let DisplayedSecs;

    for (let i = 0; i < MorseCode.length; i++) {

    }
    if (DurationMills >= 1000) {
        DurationMills -= 1000;
        DurationSecs++;
    }
    
    if (DurationSecs >= 60) {
        DurationSecs -= 60;
        DurationMins++;
    }

    if (DurationMills < 10) {
        DisplayedMills = "000" + Math.floor(DurationMills);
    } else if (DurationMills < 100) {
        DisplayedMills = "00" + Math.floor(DurationMills);
    } else if (DurationMills < 1000) {
        DisplayedMills = "0" + Math.floor(DurationMills);
    } else {
        DisplayedMills = Math.floor(DurationMills);
    }

    if (DurationSecs < 10) {
        DisplayedSecs = "0" + DurationSecs;
    } else {
        DisplayedSecs = DurationSecs;
    }

    $("#Duration").html(DurationMins + ":" + DisplayedSecs + ":" + DisplayedMills)
}

function TogglePause() {
    if (Paused) {
        Paused = false
        $("#PauseButton").attr("src", "Pause.png")
    } else {
        Paused = true
        $("#PauseButton").attr("src", "Play.png")
    }
}

function UpdateUndefinedCharaters() {
    let Message = "There is no morse code value for "
    let UndefinedCharaters = []
    let Charaters = document.getElementById("WrittenText").value.split("")

    for (let i = 0; i < Charaters.length; i++) {
        if (Convert(Charaters[i]) == "") {
            if (CheckForDupilactes(UndefinedCharaters, Charaters[i])) {
                // Do nothing
            } else {
                UndefinedCharaters[UndefinedCharaters.length] = Charaters[i];
            }
        }
    }

    for (let i = 0; i < UndefinedCharaters.length; i++) {
        if (UndefinedCharaters[i] != undefined) {
            if (i > 0) {
                Message += " " + UndefinedCharaters[i]
            } else {
                Message += " " + UndefinedCharaters[i]
            }
        }
    }

    if (Message == "There is no morse code value for ") {
        $("#ErrorList").html("")
    } else {
        $("#ErrorList").html(Message)
    }
}

function CopyMorseCode() {
    let CopyableText = MorseCode.replaceAll("<br>", Codes[37].Uppercase).replaceAll("&nbsp;", " ")
    navigator.clipboard.writeText(CopyableText)
}

async function TemporarilyChangeClass(Id, Time, Class) {
    // Time is in milliseconds
    $(Id).addClass(Class);
    await Delay(Time);
    $(Id).removeClass(Class);
}

async function Delay(Time) {
    return new Promise(Resolve => setTimeout(Resolve, Time))
}

function CheckForDupilactes(Arr, Target) {
    for (let i = 0; i < Arr.length; i++) {
        if (Arr[i] == Target) {
            return true;
        }
    }
    return false;
}

function CountCharacters(Text, Target) {
    let Characters = Text.split("");
    if (Target == undefined) {
        return Characters.length;
    }

    let Count = 0;
    for (let i = 0; i < Characters.length; i++) {
        if (Text[i] == Target) {
            Count++;
        }
    }

    return Count;
}

const Codes = [
    { Uppercase: `A`, Lowercase: `a`, Morse: `._` },
    { Uppercase: `B`, Lowercase: `b`, Morse: `_...` },
    { Uppercase: `C`, Lowercase: `c`, Morse: `_._.` },
    { Uppercase: `D`, Lowercase: `d`, Morse: `_..` },
    { Uppercase: `E`, Lowercase: `e`, Morse: `.` },
    { Uppercase: `F`, Lowercase: `f`, Morse: `.._.` },
    { Uppercase: `G`, Lowercase: `g`, Morse: `__.` },
    { Uppercase: `H`, Lowercase: `h`, Morse: `....` },
    { Uppercase: `I`, Lowercase: `i`, Morse: `..` },
    { Uppercase: `J`, Lowercase: `j`, Morse: `.___.` },
    { Uppercase: `K`, Lowercase: `k`, Morse: `_._` },
    { Uppercase: `L`, Lowercase: `l`, Morse: `._..` },
    { Uppercase: `M`, Lowercase: `m`, Morse: `__` },
    { Uppercase: `N`, Lowercase: `n`, Morse: `_.` },
    { Uppercase: `O`, Lowercase: `o`, Morse: `___` },
    { Uppercase: `P`, Lowercase: `p`, Morse: `.__.` },
    { Uppercase: `Q`, Lowercase: `q`, Morse: `__._` },
    { Uppercase: `R`, Lowercase: `r`, Morse: `._.` },
    { Uppercase: `S`, Lowercase: `s`, Morse: `...` },
    { Uppercase: `T`, Lowercase: `t`, Morse: `_` },
    { Uppercase: `U`, Lowercase: `u`, Morse: `.._` },
    { Uppercase: `V`, Lowercase: `v`, Morse: `..._` },
    { Uppercase: `W`, Lowercase: `w`, Morse: `.__` },
    { Uppercase: `X`, Lowercase: `x`, Morse: `_.._` },
    { Uppercase: `Y`, Lowercase: `y`, Morse: `_.__` },
    { Uppercase: `Z`, Lowercase: `z`, Morse: `__..` },
    { Uppercase: `0`, Morse: `_____` },
    { Uppercase: `1`, Morse: `.____` },
    { Uppercase: `2`, Morse: `..___` },
    { Uppercase: `3`, Morse: `...__` },
    { Uppercase: `4`, Morse: `...._` },
    { Uppercase: `5`, Morse: `.....` },
    { Uppercase: `6`, Morse: `_....` },
    { Uppercase: `7`, Morse: `__...` },
    { Uppercase: `8`, Morse: `___..` },
    { Uppercase: `9`, Morse: `____.` },
    { Uppercase: ` `, Morse: `&nbsp;` },
    {
        Uppercase: `
`, Morse: `<br>`
    },
    { Uppercase: `;`, Morse: `_._._.` },
    { Uppercase: `,`, Morse: `__..__` },
    { Uppercase: `'`, Morse: `.____.` },
    { Uppercase: '`', Morse: `._.._.` },
    { Uppercase: `.`, Morse: `._._._` },
    { Uppercase: `?`, Morse: `..__..` },
    { Uppercase: `'`, Morse: `.____.` },
    { Uppercase: `&`, Morse: `._...` },
    { Uppercase: `!`, Morse: `_._.__` },
    { Uppercase: `=`, Morse: `_..._` },
    { Uppercase: `:`, Morse: `___...` },
    { Uppercase: `/`, Morse: `_.._.` },
    { Uppercase: `(`, Morse: `_.._.` },
    { Uppercase: `)`, Morse: `_.__._` },
    { Uppercase: `-`, Morse: `-....-` }
]
