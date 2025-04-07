/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
    const classes = [];

    const addClass = (value) => {
        if (typeof value === 'string') {
            classes.push(value);
        } else if (Array.isArray(value)) {
            value.forEach(addClass);
        } else if (typeof value === 'object') {
            for (const key in value) {
                if (value[key]) {
                    classes.push(key);
                }
            }
        }
    };

    args.forEach(addClass);
    return classes.join(' ');
}

// Exemples d'utilisation
console.log(classNames('foo', 'bar')); // 'foo bar'
console.log(classNames('foo', { bar: true })); // 'foo bar'
console.log(classNames({ 'foo-bar': true })); // 'foo-bar'
console.log(classNames({ 'foo-bar': false })); // ''
console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
console.log(classNames('a', ['b', { c: true, d: false }])); // 'a b c'
console.log(classNames(
    'foo',
    {
        bar: true,
        duck: false,
    },
    'baz',
    { quux: true },
)); // 'foo bar baz quux'
console.log(classNames(null, false, 'bar', undefined, { baz: null }, '')); // 'bar'
