export default function debounce(callback, wait) {
    let timeout = null;

    return function(...args) {
        const context = this;

        // Annule le timeout précédent
        clearTimeout(timeout);

        // Définit un nouveau timeout
        timeout = setTimeout(() => {
            callback.apply(context, args);
        }, wait);
    };
}

// Exemple d'utilisation
let i = 0;

function increment() {
    i++;
}

const debouncedIncrement = debounce(increment, 100);

// t = 0: Appel de debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: i est toujours 0 car 100ms ne se sont pas écoulées.
// t = 100: increment() est invoqué et i est maintenant 1.
setTimeout(() => debouncedIncrement(), 100);
