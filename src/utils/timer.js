

export const timerFunction = (typingTimeout, callback=()=>{}, delay=600) => {
    clearTimeout(typingTimeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    typingTimeout = setTimeout(() => {
        callback()
    }, delay);
}