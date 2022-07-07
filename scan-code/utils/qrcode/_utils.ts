export const URShift = (number: number, bits: number) => number >= 0 ? number >> bits : (number >> bits) + (2 << ~bits)
