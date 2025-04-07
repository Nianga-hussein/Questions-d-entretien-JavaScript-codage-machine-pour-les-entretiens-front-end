// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.

export default class EventEmitter {
    constructor() {
        this.events = {}; // Object to hold event listeners
    }

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = []; // Initialize the array if it doesn't exist
        }
        this.events[eventName].push(listener); // Add the listener to the event
        return this; // Return the instance for chaining
    }

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    off(eventName, listener) {
        if (!this.events[eventName]) return this; // If no listeners exist, do nothing

        // Filter out the listener to be removed
        this.events[eventName] = this.events[eventName].filter(
            (existingListener) => existingListener !== listener
        );
        return this; // Return the instance for chaining
    }

    /**
     * @param {string} eventName
     * @param  {...any} args
     * @returns {boolean}
     */
    emit(eventName, ...args) {
        if (!this.events[eventName]) return false; // If no listeners, return false

        // Call each listener with the provided arguments
        this.events[eventName].forEach((listener) => {
            listener(...args);
        });
        return true; // Return true if there were listeners
    }
}

// Example usage
const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
    console.log(`The sum is ${a + b}`);
}

emitter.on('foo', addTwoNumbers);
emitter.emit('foo', 2, 5); // > "The sum is 7"

emitter.on('foo', (a, b) => console.log(`The product is ${a * b}`));
emitter.emit('foo', 4, 5); // > "The sum is 9"
// > "The product is 20"

emitter.off('foo', addTwoNumbers);
emitter.emit('foo', -3, 9); // > "The product is -27"
