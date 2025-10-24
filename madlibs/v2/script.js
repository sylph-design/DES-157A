(function () {
    "use strict";
    console.log("reading js");
    
    let animal = document.querySelector("#animal").value;
    let pluralNoun = document.querySelector("#pluralNoun").value;
    let verb1 = document.querySelector("#verb1").value;
    let verb2 = document.querySelector("#verb2").value;
    let adverb = document.querySelector("#adverb").value;
    let adjective = document.querySelector("#adjective").value;
    let noun = document.querySelector("#noun").value;
    const form = document.querySelector("form");
    const overlay = document.querySelector("#overlay");
    let randNum;
    let originalPoem = "The ANIMAL alighted onto the shoulder of the bellowing winds. It stretched its PLURALNOUN and asked the sky if the clouds could kiss the rain. It VERB if the ADJECTIVE sun could taste the way the stars VERB when it ADVERB disappears beyond the mountains and down into oblivion. Does the moon wonder about the same? The watched as burning lights plucked away the stars from the sky. The ANIMAL, the NOUN, wondered, where did they go? ";
    let finalPoem = "";
    let poemWords = [];

    function getRandNum() {
        randNum = Math.floor(Math.random() * 5);
        return randNum;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        originalPoem = "The ANIMAL alighted onto the shoulder of the bellowing winds. It stretched its PLURALNOUN and asked the sky if the clouds could kiss the rain. It VERB if the ADJECTIVE sun could taste the way the stars VERB when it ADVERB disappears beyond the mountains and down into oblivion. Does the moon wonder about the same? The watched as burning lights plucked away the stars from the sky. The ANIMAL, the NOUN, wondered, where did they go? ";
        finalPoem = "";

        //fills array with poem words
        poemWords = [];
        console.log(poemWords);
        for (let i = 0; i < originalPoem.length; i++) {
            if (originalPoem[i] === " ") {
                let tempWord = originalPoem.slice(0, i);
                poemWords.push(tempWord);
                originalPoem = originalPoem.slice(i + 1, originalPoem.length);
                i = 0;
            }
        }

        //inserts form words into poem
        poemWords[1] = animal;
        poemWords[13] = pluralNoun;
        poemWords[26] = verb1;
        poemWords[29] = adjective;
        poemWords[37] = verb2;
        poemWords[40] = adverb;
        poemWords[71] = noun;
        poemWords[69] = animal;


        //randomly blacks out words
        for (let j = 0; j < poemWords.length; j++) {

            if (getRandNum() > 1) {
                poemWords[j] = `<mark>${poemWords[j]}</mark>`;
            }
        }

        //insert new poem into overlay
        for (let k = 0; k < poemWords.length; k++) {
            finalPoem = finalPoem + poemWords[k] + " ";
        }
        document.querySelector("p").innerHTML = finalPoem;


        overlay.classList.remove("hidden");
    });

    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            overlay.className = "hidden";
        }
    })

})();