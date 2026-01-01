/**
 * Utility Functions
 * Shared helper functions used across the application
 */

/**
 * Map of month names to their zero-indexed values
 * Used for date parsing from property data
 */
export const MONTH_MAP = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};

/**
 * Format a price number as GBP currency
 * @param {number} price - The price to format
 * @returns {string} Formatted price string (e.g., "£500,000")
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Parse a property date object into a JavaScript Date
 * @param {{ day: number, month: string, year: number }} added - The date object from property data
 * @returns {Date} JavaScript Date object
 */
export function parsePropertyDate(added) {
    return new Date(added.year, MONTH_MAP[added.month], added.day);
}

/**
 * Encode HTML special characters to prevent XSS
 * @param {string} str - The string to encode
 * @returns {string} HTML-encoded string
 */
export function encodeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
