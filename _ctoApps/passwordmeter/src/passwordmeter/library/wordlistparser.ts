"use strict";

declare let jQuery: any;

/**
 * contains functions for parsing a wordlist
 */
class WordlistParser {

    /**
     * parses a wordlist from string
     *
     * @param {string} wordlist
     * @return {Array<string>}
     */
    public static parseFromString(wordlist: string): Array<string> {

        let wordlistArray: Array<string> = wordlist.split("\n");

        for(let i = 0; i < wordlistArray.length; i++) {
            wordlistArray[i] = wordlistArray[i].split(" ")[0];
        }

        return wordlistArray;

    }

    /**
     * loads and parses a wordlist via ajax
     *
     * @param {string} filepath full path to file
     * @param {(wordlist: Array<string>) => void} callback
     */
    public static loadViaAjax(filepath: string, callback: (wordlist: Array<string>) => void): void {

        jQuery.get(filepath, function(data: string) {

            callback(WordlistParser.parseFromString(data));

        });

    }

    /**
     * loads and parses a wordlist from local file
     *
     * @param {File} file file-object from file-input
     * @param {(wordlist: Array<string>) => void} callback
     */
    public static loadFromFile(file: File, callback: (wordlist: Array<string>) => void): void {

        let reader = new FileReader();

        reader.onload = function() {

            callback(WordlistParser.parseFromString(reader.result as string));

        };

        reader.readAsText(file);

    }

    /**
     * converts an already parsed wordlist to password-score format
     *
     * @param {Array<string>} wordlist
     * @return {Object}
     */
    public static convertToPasswordScoreFormat(wordlist: Array<string>): object {

        let psWordlist: object = {};

        for(let i = 0; i < wordlist.length; i++) {
            psWordlist[wordlist[i]] = i + 1;
        }

        return psWordlist;

    }

    /**
     * converts a wordlist in password-score format into an array of strings
     *
     * @param {Object} psWordlist
     * @return {Array<string>}
     */
    public static convertFromPasswordScoreFormat(psWordlist: object): Array<string> {

        let wordlist: Array<string> = [];

        for (let key in psWordlist) {
            if (psWordlist.hasOwnProperty(key)) {
                wordlist.push(key);
            }
        }

        return wordlist;

    }

    /**
     * stores a wordlist in browserstorage via localForage
     *
     * @param localForageInstance
     * @param {string} wordlistName
     * @param {Array<string>} wordlist
     * @param {() => void} callback
     */
    public static storeInBrowserStorage(localForageInstance: any, wordlistName: string, wordlist: Array<string>, callback: () => void): void {

        localForageInstance.setItem(wordlistName, wordlist, callback);

    }

    /**
     * loads a wordlist from browserstorage via localForage
     *
     * @param localForageInstance
     * @param {string} wordlistName
     * @param {(wordlist: Array<string>) => void} callback
     */
    public static loadFromBrowserStorage(localForageInstance: any, wordlistName: string, callback: (error: any, wordlist: Array<string>) => void): void {

        localForageInstance.getItem(wordlistName, callback);

    }

    /**
     * removes a wordlist from browserstorage via localForage
     *
     * @param localForageInstance
     * @param {string} wordlistName
     * @param {() => void} callback
     */
    public static removeFromBrowserStorage(localForageInstance: any, wordlistName: string, callback: () => void): void {

        localForageInstance.removeItem(wordlistName, callback);

    }

}