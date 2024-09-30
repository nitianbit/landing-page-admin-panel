export const getUTMParameters = (input) => {
    const params = new URLSearchParams(window.location.search);
    const queryParameters = {};
    params.forEach((value, key) => {
        queryParameters[key] = value;
    });
    return queryParameters;
};

export const getTime = (input) => {
    // Convert the string input to a Date object
    const dateObject = new Date(input);

    // Check if the conversion resulted in a valid Date
    if (isNaN(dateObject.getTime())) {
        console.error('Invalid Date string:', input);
        throw new TypeError('Expected a valid Date string');
    }

    return dateObject.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24-hour format
    });
};

export const getDate = (input) => {
    // Convert the string input to a Date object
    const dateObject = new Date(input);

    // Check if the conversion resulted in a valid Date
    if (isNaN(dateObject.getTime())) {
        console.error('Invalid Date string:', input);
        throw new TypeError('Expected a valid Date string');
    }

    return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

// Example usage
const dateString = '2024-09-16T14:07:49.101Z'; // ISO 8601 format
try {
    const time = getTime(dateString);
    const date = getDate(dateString);

    console.log(`Time: ${time}`); // Outputs: Time: 14:07:49
    console.log(`Date: ${date}`); // Outputs: Date: 09/16/2024
} catch (error) {
    console.error(error.message);
}
