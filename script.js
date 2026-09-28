/* =====================================================
   PREM FILM STUDIOS
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   CINEMATIC INTRO
===================================================== */

const intro = document.getElementById("intro");

const enterBtn =
    document.getElementById("enterBtn");


enterBtn.addEventListener("click", function () {

    intro.classList.add("hide");

});


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const navButtons =
    document.querySelectorAll(".nav-btn");


const pages =
    document.querySelectorAll(".page");


navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const target =
            button.getAttribute("data-target");


        /* Remove active navigation */

        navButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        /* Hide all pages */

        pages.forEach(function(page) {

            page.classList.remove("active-page");

        });


        /* Show selected page */

        const selectedPage =
            document.getElementById(target);


        selectedPage.classList.add("active-page");


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});


/* =====================================================
   FILM AI ASSISTANT
===================================================== */

const aiInput =
    document.getElementById("aiInput");


const askBtn =
    document.getElementById("askBtn");


const aiAnswer =
    document.getElementById("aiAnswer");


const micBtn =
    document.getElementById("micBtn");


const stopVoiceBtn =
    document.getElementById("stopVoiceBtn");


/* =====================================================
   FILM KNOWLEDGE
===================================================== */

const filmKnowledge = [


    {

        keywords: [

            "short film",

            "shortfilm"

        ],

        answer:

        "Start with one clear idea. " +

        "Develop a simple story, write the screenplay, " +

        "plan your shots, shoot the required scenes, " +

        "then edit for emotion, pacing and clarity."

    },


    {

        keywords: [

            "script",

            "screenplay",

            "writing"

        ],

        answer:

        "A practical screenplay structure is " +

        "opening situation, character goal, conflict, " +

        "turning point, climax and ending. " +

        "For a short film, keep the story focused."

    },


    {

        keywords: [

            "camera",

            "shot",

            "angle",

            "cinematography"

        ],

        answer:

        "Use wide shots to establish location, " +

        "medium shots for interaction, close-ups " +

        "for emotion and detail shots for important objects. " +

        "Choose every shot for storytelling."

    },


    {

        keywords: [

            "editing",

            "edit"

        ],

        answer:

        "First organize your footage. " +

        "Select the strongest takes, build the story, " +

        "refine pacing, add sound design and music, " +

        "then color correct and export."

    },


    {

        keywords: [

            "director",

            "directing"

        ],

        answer:

        "A director turns the screenplay into a visual " +

        "and emotional experience. Focus on performance, " +

        "blocking, camera language, rhythm and communication."

    },


    {

        keywords: [

            "actor",

            "acting",

            "audition"

        ],

        answer:

        "Understand the character's objective, listen " +

        "to the other character and control body language. " +

        "Avoid forcing emotion. Practice and record yourself."

    },


    {

        keywords: [

            "vfx",

            "visual effects"

        ],

        answer:

        "Plan VFX before shooting. Decide the camera movement, " +

        "lighting, tracking points and clean plates. " +

        "Good VFX starts during pre-production."

    },


    {

        keywords: [

            "social media",

            "instagram",

            "youtube",

            "reels"

        ],

        answer:

        "For social media, make the opening seconds visually " +

        "strong. Keep the story easy to understand, " +

        "use subtitles when useful and create a strong hook."

    },


    {

        keywords: [

            "production",

            "filmmaking",

            "film making"

        ],

        answer:

        "The filmmaking pipeline is development, " +

        "pre-production, production, post-production " +

        "and distribution. Good planning saves time."

    },


    {

        keywords: [

            "music",

            "sound",

            "background score"

        ],

        answer:

        "Sound can make a scene feel cinematic. " +

        "Record clean dialogue, add atmosphere, " +

        "use effects carefully and choose music " +

        "that supports the emotion."

    }

];


/* =====================================================
   GET AI ANSWER
===================================================== */

function getFilmAnswer(question) {


    const text =
        question.toLowerCase();


    for (
        const item of filmKnowledge
    ) {


        for (
            const keyword of item.keywords
        ) {


            if (
                text.includes(keyword)
            ) {

                return item.answer;

            }

        }

    }


    return (

        "I am the PREM FILM STUDIOS Film AI Assistant. " +

        "Ask me about short films, scripts, camera shots, " +

        "acting, directing, editing, VFX, sound, production " +

        "or social media."

    );

}


/* =====================================================
   TEXT TO SPEECH
===================================================== */

function speak(text) {


    if (
        "speechSynthesis" in window
    ) {


        window.speechSynthesis.cancel();


        const voice =
            new SpeechSynthesisUtterance(text);


        voice.rate = 0.95;

        voice.pitch = 1;

        voice.volume = 1;


        window.speechSynthesis.speak(voice);

    }

}


/* =====================================================
   ASK BUTTON
===================================================== */

function askAI() {


    const question =
        aiInput.value.trim();


    if (!question) {

        return;

    }


    const answer =
        getFilmAnswer(question);


    aiAnswer.textContent =
        answer;


    speak(answer);

}


askBtn.addEventListener(

    "click",

    askAI

);


/* ENTER KEY */

aiInput.addEventListener(

    "keydown",

    function(event) {


        if (
            event.key === "Enter"
        ) {

            askAI();

        }

    }

);


/* =====================================================
   VOICE RECOGNITION
===================================================== */

let recognition = null;


if (

    "SpeechRecognition" in window ||

    "webkitSpeechRecognition" in window

) {


    const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;


    recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    /* LISTENING */

    recognition.onstart =
        function() {


            micBtn.textContent =
                "🎙 Listening...";


        };


    /* RESULT */

    recognition.onresult =
        function(event) {


            const transcript =

                event
                .results[0][0]
                .transcript;


            aiInput.value =
                transcript;


            askAI();

        };


    /* ERROR */

    recognition.onerror =
        function() {


            micBtn.textContent =
                "🎙 Start Voice Assistant";

        };


    /* STOP */

    recognition.onend =
        function() {


            micBtn.textContent =
                "🎙 Start Voice Assistant";

        };


}


/* =====================================================
   START MICROPHONE
===================================================== */

micBtn.addEventListener(

    "click",

    function() {


        if (recognition) {

            recognition.start();

        }

        else {

            alert(

                "Voice recognition is not supported " +

                "by this browser. Please try Chrome."

            );

        }

    }

);


/* =====================================================
   STOP VOICE
===================================================== */

stopVoiceBtn.addEventListener(

    "click",

    function() {


        if (recognition) {

            recognition.stop();

        }


        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.cancel();

        }

    }

);
