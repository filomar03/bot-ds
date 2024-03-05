//Prolonged use of this script could make the account temporarily rate-limited

let endSpam = false

//clickDelay min value: 1, or it will cause errors when trying disconnecting a person that is already in the channel when starting bot, unknown cause
//loopDelay min value: 0, no know issues
//disconnectDelay min value: 300, reccomended value: 500, setting it below 300 will make the bot fail, since that is the average time for a user to be disconnected after clicking disconnect button
const startSpamBot = (target, clickDelay = 1, loopDelay = 0, disconnectDelay = 0) => {
    const usersClass = "voiceUser__0470a clickable__137bc userSmall_e40291"
    const buttonId = "user-context-voice-disconnect"

    function leftClickEvent() {
        return new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 0
        });
    }

    function rightClickEvent() {
        return new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 2
        });
    }
    
    function getUsers() {
        return document.getElementsByClassName(usersClass)
    }

    function userName(user) {
        return user.children[0].children[1].innerHTML
    }

    function getButton() {
        return document.getElementById(buttonId)
    }

    let time = false

    function loop() {
        if (endSpam) {
            console.log('Stopping spam.')
            return
        }
        
        let disconnecting = false

        //TODO: remove (debug purpouse: find out avg time to disconnect user since disconnect button is clicked)
        if (time) {
            console.log(Date.now() - time)
        }

        Array.from(getUsers()).forEach(user => {
            if (userName(user) == target) {
                user.dispatchEvent(rightClickEvent())
                new Promise(resolve => {
                    setTimeout(() => {
                        //TODO: remove (debug purpouse: find out avg time to disconnect user since disconnect button is clicked)
                        if (!time) {
                            time = Date.now()
                        }

                        getButton().dispatchEvent(leftClickEvent())
                        resolve()
                    }, clickDelay)
                }).then(() => {
                    setTimeout(loop, disconnectDelay)
                })
                disconnecting = true
                return
            }
        })

        if (!disconnecting) setTimeout(loop, loopDelay)

        //TODO: remove (debug purpouse: find out avg time to disconnect user since disconnect button is clicked)
        if (!disconnecting && time) {
            console.log('time to disconnect: ' + Date.now() - time)
            time = false
        }
    }

    endSpam = false
    console.log('Starting spam.')
    loop()
}

const stopSpamBot = () => endSpam = true