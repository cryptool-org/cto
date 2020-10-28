"use strict";

/**
 * password-class to store a password and add some methods on it
 */
class Password {

    private characters: string;
    private length: number;

    private amountOfLowercaseLetters: number = 0;
    private amountOfUppercaseLetters: number = 0;
    private amountOfDigits: number = 0;
    private amountOfSpecialCharacters: number = 0;

    public constructor(password: string) {

        this.characters = password.replace(/ /g, "");
        this.length = this.characters.length;

        let pw_array: string[] = this.characters.split("");

        for (let i = 0; i < pw_array.length; i++) {
            if (Password.charIsLowercaseLetter(pw_array[i]))
                this.amountOfLowercaseLetters++;
            else if (Password.charIsUppercaseLetter(pw_array[i]))
                this.amountOfUppercaseLetters++;
            else if (Password.charIsDigit(pw_array[i]))
                this.amountOfDigits++;
            else
                this.amountOfSpecialCharacters++;
        }

    }

    /**
     * converts a character to its windows-1252 value (returns value of "?" if not representable by windows-1252)
     *
     * @param {string} char
     * @return {number}
     */
    public static convertToWindows1252Value(char: string): number {

        // inspired by: https://stackoverflow.com/a/13637085

        let windows1252: number[] = [
            0x0000, 0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000E, 0x000F,
            0x0010, 0x0011, 0x0012, 0x0013, 0x0014, 0x0015, 0x0016, 0x0017, 0x0018, 0x0019, 0x001A, 0x001B, 0x001C, 0x001D, 0x001E, 0x001F,
            0x0020, 0x0021, 0x0022, 0x0023, 0x0024, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x002B, 0x002C, 0x002D, 0x002E, 0x002F,
            0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F,
            0x0040, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F,
            0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x005B, 0x005C, 0x005D, 0x005E, 0x005F,
            0x0060, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067, 0x0068, 0x0069, 0x006A, 0x006B, 0x006C, 0x006D, 0x006E, 0x006F,
            0x0070, 0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079, 0x007A, 0x007B, 0x007C, 0x007D, 0x007E, 0x007F,
            0x20AC, 0xFFFD, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6, 0x2030, 0x0160, 0x2039, 0x0152, 0xFFFD, 0x017D, 0xFFFD,
            0xFFFD, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A, 0x0153, 0xFFFD, 0x017E, 0x0178,
            0x00A0, 0x00A1, 0x00A2, 0x00A3, 0x00A4, 0x00A5, 0x00A6, 0x00A7, 0x00A8, 0x00A9, 0x00AA, 0x00AB, 0x00AC, 0x00AD, 0x00AE, 0x00AF,
            0x00B0, 0x00B1, 0x00B2, 0x00B3, 0x00B4, 0x00B5, 0x00B6, 0x00B7, 0x00B8, 0x00B9, 0x00BA, 0x00BB, 0x00BC, 0x00BD, 0x00BE, 0x00BF,
            0x00C0, 0x00C1, 0x00C2, 0x00C3, 0x00C4, 0x00C5, 0x00C6, 0x00C7, 0x00C8, 0x00C9, 0x00CA, 0x00CB, 0x00CC, 0x00CD, 0x00CE, 0x00CF,
            0x00D0, 0x00D1, 0x00D2, 0x00D3, 0x00D4, 0x00D5, 0x00D6, 0x00D7, 0x00D8, 0x00D9, 0x00DA, 0x00DB, 0x00DC, 0x00DD, 0x00DE, 0x00DF,
            0x00E0, 0x00E1, 0x00E2, 0x00E3, 0x00E4, 0x00E5, 0x00E6, 0x00E7, 0x00E8, 0x00E9, 0x00EA, 0x00EB, 0x00EC, 0x00ED, 0x00EE, 0x00EF,
            0x00F0, 0x00F1, 0x00F2, 0x00F3, 0x00F4, 0x00F5, 0x00F6, 0x00F7, 0x00F8, 0x00F9, 0x00FA, 0x00FB, 0x00FC, 0x00FD, 0x00FE, 0x00FF
        ];

        let unicodeToWindows1252 = {};

        for (let i = 0; i < windows1252.length; ++i) {
            unicodeToWindows1252[String.fromCharCode(windows1252[i])] = i;
        }

        let character: string = char.charAt(0);

        if (!(character in unicodeToWindows1252)) {
            character = '?'; // chars which are not in the charset are set to ? in ct1
        }

        return unicodeToWindows1252[character];

    }

    /**
     * converts a character to the c++ equivalent used in datatype "char"
     *
     * @param {string} char
     * @return {number}
     */
    public static convertToAsciiCharValue(char: string): number {

        let windows1252Value = Password.convertToWindows1252Value(char);

        if(windows1252Value >= 128 && windows1252Value <= 255) {
            windows1252Value -= 256;
        }

        return windows1252Value;

    }

    /**
     * checks if a char is a lowercase letter
     *
     * @param {string} char
     * @return {boolean}
     */
    public static charIsLowercaseLetter(char: string): boolean {
        return (/[a-z]/.test(char));
    }

    /**
     * checks if a char is a uppercase letter
     *
     * @param {string} char
     * @return {boolean}
     */
    public static charIsUppercaseLetter(char: string): boolean {
        return (/[A-Z]/.test(char));
    }

    /**
     * checks if a char is a digit
     *
     * @param {string} char
     * @return {boolean}
     */
    public static charIsDigit(char: string): boolean {
        return (/[0-9]/.test(char));
    }

    /**
     * returns all characters from password
     *
     * @return {string}
     */
    public getCharacters(): string {
        return this.characters;
    }

    /**
     * returns the length of the password
     *
     * @return {number}
     */
    public getLength(): number {
        return this.length;
    }

    /**
     * returns the amount of lowercase letters
     *
     * @return {number}
     */
    public getAmountOfLowercaseLetters(): number {
        return this.amountOfLowercaseLetters;
    }

    /**
     * returns the amount of uppercase letters
     *
     * @return {number}
     */
    public getAmountOfUppercaseLetters(): number {
        return this.amountOfUppercaseLetters;
    }

    /**
     * returns the amount of digits
     *
     * @return {number}
     */
    public getAmountOfDigits(): number {
        return this.amountOfDigits;
    }

    /**
     * returns the amount of special characters
     *
     * @return {number}
     */
    public getAmountOfSpecialCharacters(): number {
        return this.amountOfSpecialCharacters;
    }

}

/**
 * abstract password-qualifier to use the same methods on every password-qualifier
 */
abstract class PasswordQualifier {

    protected password: Password;
    protected quality: number;

    /**
     * calculates the password-quality in percent (0-100)
     *
     * @return {number}
     */
    public abstract getPasswordQuality(): number;

    /**
     * calculates the basic password-entropy (source: cryptool1)
     *
     * @return {number}
     */
    public getPasswordEntropy(): number {

        if (this.quality == undefined) {

            this.quality = this.getPasswordQuality();
            return this.getPasswordEntropy();

        }

        else {
            return Math.floor(this.quality * 128 / 100);
        }

    };

    public constructor(password: string) {
        this.password = new Password(password);
    }

}

/**
 * password-qualifier using the keepass-algorithm
 * (all methods are only ported from cryptool1)
 */
class KeepassPasswordQualifier extends PasswordQualifier {

    private static keepassChlower: number = 1;
    private static keepassChupper: number = 2;
    private static keepassChnumber: number = 4;
    private static keepassChsimpleSpecial: number = 8;
    private static keepassChextSpecial: number = 16;
    private static keepassChhigh: number = 32;
    private static keepassChescape: number = 64;

    private static getBitsetCharSet(char: string): number {

        let bitset: number = 0;

        if (Password.convertToAsciiCharValue(char) < Password.convertToAsciiCharValue(' ')) bitset = KeepassPasswordQualifier.keepassChescape;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue('A')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('Z'))) bitset = KeepassPasswordQualifier.keepassChupper;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue('a')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('z'))) bitset = KeepassPasswordQualifier.keepassChlower;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue('0')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('9'))) bitset = KeepassPasswordQualifier.keepassChnumber;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue(' ')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('/'))) bitset = KeepassPasswordQualifier.keepassChsimpleSpecial;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue(':')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('@'))) bitset = KeepassPasswordQualifier.keepassChextSpecial;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue('[')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('`'))) bitset = KeepassPasswordQualifier.keepassChextSpecial;
        if ((Password.convertToAsciiCharValue(char) >= Password.convertToAsciiCharValue('{')) && (Password.convertToAsciiCharValue(char) <= Password.convertToAsciiCharValue('~'))) bitset = KeepassPasswordQualifier.keepassChextSpecial;
        if (Password.convertToAsciiCharValue(char) > Password.convertToAsciiCharValue('~')) bitset = KeepassPasswordQualifier.keepassChhigh;

        return bitset;

    }

    private static getBitsetCharSpace(bitset: number): number {

        let dw_char_space: number = 0;

        const charspaceEscape: number = 60;
        const charspaceAlpha: number = 26;
        const charspaceNumber: number = 10;
        const charspaceSimpspecial: number = 16;
        const charspaceExtspecial: number = 17;
        const charspaceHigh: number = 112;

        if (bitset & KeepassPasswordQualifier.keepassChescape) dw_char_space += charspaceEscape;
        if (bitset & KeepassPasswordQualifier.keepassChupper) dw_char_space += charspaceAlpha;
        if (bitset & KeepassPasswordQualifier.keepassChlower) dw_char_space += charspaceAlpha;
        if (bitset & KeepassPasswordQualifier.keepassChnumber) dw_char_space += charspaceNumber;
        if (bitset & KeepassPasswordQualifier.keepassChsimpleSpecial) dw_char_space += charspaceSimpspecial;
        if (bitset & KeepassPasswordQualifier.keepassChextSpecial) dw_char_space += charspaceExtspecial;
        if (bitset & KeepassPasswordQualifier.keepassChhigh) dw_char_space += charspaceHigh;

        return dw_char_space;

    }

    private getCharSpace(): number {

        let pw_chars: string[] = this.password.getCharacters().split("");
        let pw_length: number = this.password.getLength();

        if (pw_length === 0) return 0;

        let bitset_char_space: number = 0;
        for (let i = 0; i < pw_length; i++) {
            bitset_char_space |= KeepassPasswordQualifier.getBitsetCharSet(pw_chars[i]);
        }

        return KeepassPasswordQualifier.getBitsetCharSpace(bitset_char_space);

    }

    private getBitQuality(): number {

        let char_space: number = this.getCharSpace();

        if (this.password.getLength() === 0 || char_space === 0) return 0;

        let dbl_bits_per_char: number = Math.log(char_space) / Math.log(2.00);
        return Math.ceil(dbl_bits_per_char * this.password.getLength());

    }

    public getPasswordQuality(): number {

        let quality: number = this.getBitQuality();
        quality = Math.floor((quality > 128) ? 100 : (quality * 100) / 128);

        this.quality = quality;
        return quality;

    }

}

/**
 * password-qualifier using the mozilla-algorithm
 * (all methods are only ported from cryptool1)
 */
class MozillaPasswordQualifier extends PasswordQualifier {

    public getPasswordQuality(): number {

        let quality = 0;
        let length = this.password.getLength();
        let amountOfDigits = this.password.getAmountOfDigits();
        let amountOfSpecialCharacters = this.password.getAmountOfSpecialCharacters();
        let amountOfUppercaseLetters = this.password.getAmountOfUppercaseLetters();

        if (length >= 1 && length <= 5) quality += length * 10;
        if (length > 5) quality += 50;
        quality -= 20;

        if (amountOfDigits >= 1 && amountOfDigits <= 3) quality += amountOfDigits * 10;
        if (amountOfDigits > 3) quality += 30;

        if (amountOfSpecialCharacters >= 1 && amountOfSpecialCharacters <= 3) quality += amountOfSpecialCharacters * 15;
        if (amountOfSpecialCharacters > 3) quality += 45;

        if (amountOfUppercaseLetters >= 1 && amountOfUppercaseLetters <= 3) quality += amountOfUppercaseLetters * 10;
        if (amountOfUppercaseLetters > 3) quality += 30;

        if (quality < 0) quality = 0;
        if (quality > 100) quality = 100;

        return quality;

    }

    public getPasswordEntropy(): number {
        return undefined;
    }

}

interface PgpAsciiRange {
    base: number;
    length: number;
    totalLength: number;
}

/**
 * password-qualifier using the pgp-algorithm
 * (all methods are only ported from cryptool1)
 */
class PgpPasswordQualifier extends PasswordQualifier {

    private static asciiSpace: PgpAsciiRange[] = [
        {base: 0x000000, length: 32, totalLength: 32},
        {base: 0x000020, length: 1, totalLength: 1},
        {base: 0x000021, length: 3, totalLength: 15},
        {base: 0x000024, length: 1, totalLength: 1},
        {base: 0x000025, length: 3, totalLength: 15},
        {base: 0x000028, length: 1, totalLength: 3},
        {base: 0x000029, length: 1, totalLength: 3},
        {base: 0x00002a, length: 1, totalLength: 15},
        {base: 0x00002b, length: 1, totalLength: 6},
        {base: 0x00002c, length: 1, totalLength: 15},
        {base: 0x00002d, length: 1, totalLength: 1},
        {base: 0x00002e, length: 2, totalLength: 15},
        {base: 0x000030, length: 10, totalLength: 10},
        {base: 0x00003a, length: 2, totalLength: 15},
        {base: 0x00003c, length: 3, totalLength: 6},
        {base: 0x00003f, length: 2, totalLength: 15},
        {base: 0x000041, length: 26, totalLength: 26},
        {base: 0x00005b, length: 1, totalLength: 3},
        {base: 0x00005c, length: 1, totalLength: 15},
        {base: 0x00005d, length: 1, totalLength: 3},
        {base: 0x00005e, length: 1, totalLength: 2},
        {base: 0x00005f, length: 1, totalLength: 1},
        {base: 0x000060, length: 1, totalLength: 2},
        {base: 0x000061, length: 26, totalLength: 26},
        {base: 0x00007b, length: 1, totalLength: 3},
        {base: 0x00007c, length: 1, totalLength: 6},
        {base: 0x00007d, length: 1, totalLength: 3},
        {base: 0x00007e, length: 1, totalLength: 6},
        {base: 0x00007f, length: 33, totalLength: 33}
    ];

    private static log2(c: number): number {

        let mask: number = -1;
        let mask1: number = 1;
        let logV: number = 0;

        if (!c) {
            return 0;
        }

        while (c & mask) {

            mask <<= 1;
            mask1 <<= 1;
            logV++;

        }

        mask1 >>= 1;

        if ((c - mask1) < Math.floor(mask1 / 2)) {
            logV--;
        }

        return logV;

    }

    private static getCategory(c: number): number {

        let iL: number = 0;
        let iR: number = PgpPasswordQualifier.asciiSpace.length;
        let i: number = Math.floor((iR - iL) / 2);

        while (iL < (iR - 1)) {

            if (c < PgpPasswordQualifier.asciiSpace[i].base) {
                iR = i;
                i = Math.floor((iL + i) / 2);

                continue;
            }

            if (c > (PgpPasswordQualifier.asciiSpace[i].base + PgpPasswordQualifier.asciiSpace[i].length - 1)) {
                iL = i;
                i = Math.floor((iR + i) / 2);

                continue;
            }

            return i;

        }

        if (c >= PgpPasswordQualifier.asciiSpace[iL].base && c < (PgpPasswordQualifier.asciiSpace[iL].base + PgpPasswordQualifier.asciiSpace[iL].length)) {
            return iL;
        }

        if (c >= PgpPasswordQualifier.asciiSpace[iR].base && c < PgpPasswordQualifier.asciiSpace[iR].base + PgpPasswordQualifier.asciiSpace[iR].length) {
            return iR;
        }

        return -1;

    }

    private static getCategoryLength(c: number): number {

        let idx: number = PgpPasswordQualifier.getCategory(c);

        if (idx !== -1) {
            return PgpPasswordQualifier.asciiSpace[idx].totalLength;
        }

        return 1;

    }

    private estimateMinEntropyBits(): number {

        let result: number = 0;

        for (let i = 0; i < this.password.getLength(); i++) {
            result += PgpPasswordQualifier.log2(PgpPasswordQualifier.getCategoryLength(Password.convertToAsciiCharValue(this.password.getCharacters().charAt(i))));
        }

        return result;

    }

    private estimateMaxEntropyBits(): number {

        let scope: number = 0;
        let idx: number;
        let numUnrecognizedRanges: number = 0;

        let haveRanges: boolean[] = new Array(PgpPasswordQualifier.asciiSpace.length);

        let maxIndex: number = 0;

        for (let i = 0; i < this.password.getLength(); i++) {

            idx = PgpPasswordQualifier.getCategory(Password.convertToAsciiCharValue(this.password.getCharacters().charAt(i)));

            if (idx !== -1) {

                haveRanges[idx] = true;
                if (idx > maxIndex) maxIndex = idx;

            }

            else numUnrecognizedRanges++;

        }

        for (let i = 0; i <= maxIndex; i++) {

            if (haveRanges[i] === true) {

                scope += PgpPasswordQualifier.asciiSpace[i].totalLength;
                haveRanges[i] = false;

            }

        }

        scope += numUnrecognizedRanges;

        return this.password.getLength() * PgpPasswordQualifier.log2(scope);

    }

    public getPasswordQuality(): number {

        let result: number;

        let min: number = this.estimateMinEntropyBits();
        let max: number = this.estimateMaxEntropyBits();

        if (min > max) return 0;

        result = max - min;
        result = Math.floor(this.password.getLength() ? (min + result / 2) : (this.password.getLength() / 2));

        result = Math.floor((result > 128) ? 100 : (result * 100 / 128));

        this.quality = result;
        return result;

    }

}