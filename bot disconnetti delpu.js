async function bot (name) {
    const userClass = "voiceUser__0470a clickable__137bc userSmall_e40291"
    const buttonId = "user-context-voice-disconnect"
    const clickDelay = 200

    function lClick (element) {
        let leftClickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 0
        });

        element.dispatchEvent(leftClickEvent);
    }

    function rClick (element) {
        let rightClickEvent = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 2
        });

        element.dispatchEvent(rightClickEvent);
    }
        
    function getPeople () {
        return document.getElementsByClassName(userClass)
    }

    function getDButton () {
        return document.getElementById(buttonId)
    }

    function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //while (true) {
        Array.from(getPeople()).forEach(element => {
            if (element.children[0].children[1].innerHTML == name) {
                rClick(element)
                se
                lClick(getDButton)
            }
        });
        //lClick(getDButton())
        //sleep?
    //}
}