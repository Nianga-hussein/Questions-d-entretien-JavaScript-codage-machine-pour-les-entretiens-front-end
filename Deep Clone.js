/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
    // Check if the input is null or not an object
    if (value === null || typeof value !== 'object') {
        return value; // Return the value if it's not an object
    }

    // Create an array or object to hold the cloned values
    const clone = Array.isArray(value) ? [] : {};

    // Recursively copy properties
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            clone[key] = deepClone(value[key]);
        }
    }

    return clone;
}

// Example usage
const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
console.log(clonedObj1.user.role); // 'guest'
console.log(obj1.user.role); // 'admin'

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
console.log(obj2.foo[0].bar); // 'bax'
console.log(clonedObj2.foo[0].bar); // 'baz'
