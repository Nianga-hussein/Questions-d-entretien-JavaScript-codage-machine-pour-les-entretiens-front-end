/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(items, options) {
    // Handle unique items
    if (options?.unique) {
        items = [...new Set(items)];
    }

    // Filter out empty strings
    items = items.filter(item => item);

    // Handle sorting
    if (options?.sorted) {
        items.sort();
    }

    // Handle length option
    const length = options?.length;
    if (length && length > 0) {
        const shownItems = items.slice(0, length);
        const othersCount = items.length - shownItems.length;

        if (othersCount > 0) {
            const othersText = othersCount === 1 ? '1 other' : `${othersCount} others`;
            return `${shownItems.join(', ')} and ${othersText}`;
        }

        return shownItems.join(', ');
    }

    // Format the output based on the number of items
    if (items.length === 0) {
        return ''; // No items
    } else if (items.length === 1) {
        return items[0]; // Single item
    } else if (items.length === 2) {
        return `${items[0]} and ${items[1]}`; // Two items
    } else {
        // More than two items
        const lastItem = items.pop(); // Remove the last item for formatting
        return `${items.join(', ')} and ${lastItem}`; // Join with commas and add "and" before the last item
    }
}

// Example usage
console.log(listFormat([])); // ''
console.log(listFormat(['Bob'])); // 'Bob'
console.log(listFormat(['Bob', 'Alice'])); // 'Bob and Alice'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'])); // 'Bob, Ben, Tim, Jane and John'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 3 })); // 'Bob, Ben, Tim and 2 others'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 4 })); // 'Bob, Ben, Tim, Jane and 1 other'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 3, sorted: true })); // 'Ben, Bob, Jane and 2 others'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], { length: 3, unique: true })); // 'Bob, Ben, Tim and 2 others'
console.log(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 3, unique: true })); // 'Bob, Ben, Tim and 2 others'
console.log(listFormat(['Bob', 'Ben', '', '', 'John'])); // 'Bob, Ben and John'
