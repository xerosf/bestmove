import { formatPrice, parsePropertyDate, encodeHTML, MONTH_MAP } from '../utils/utils';

describe('Utility Functions', () => {
    describe('formatPrice', () => {
        test('formats price as GBP currency', () => {
            expect(formatPrice(500000)).toBe('£500,000');
            expect(formatPrice(1250000)).toBe('£1,250,000');
            expect(formatPrice(75000)).toBe('£75,000');
        });
    });

    describe('parsePropertyDate', () => {
        test('converts property date object to JavaScript Date', () => {
            const dateObj = { day: 15, month: 'March', year: 2025 };
            const result = parsePropertyDate(dateObj);

            expect(result.getFullYear()).toBe(2025);
            expect(result.getMonth()).toBe(2); // March = 2 (0-indexed)
            expect(result.getDate()).toBe(15);
        });
    });

    describe('encodeHTML', () => {
        test('encodes HTML special characters', () => {
            expect(encodeHTML('<script>')).toBe('&lt;script&gt;');
            expect(encodeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
            expect(encodeHTML('"quoted"')).toBe('&quot;quoted&quot;');
        });

        test('handles empty/null input', () => {
            expect(encodeHTML('')).toBe('');
            expect(encodeHTML(null)).toBe('');
        });
    });

    describe('MONTH_MAP', () => {
        test('contains all 12 months with correct indices', () => {
            expect(MONTH_MAP.January).toBe(0);
            expect(MONTH_MAP.December).toBe(11);
            expect(Object.keys(MONTH_MAP).length).toBe(12);
        });
    });
});
