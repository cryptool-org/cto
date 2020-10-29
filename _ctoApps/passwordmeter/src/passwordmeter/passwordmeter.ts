/// <reference path="./library/ct1pqmlib.ts" />
/// <reference path="./library/zxcvbn.d.ts" />
/// <reference path="./library/wordlistparser.ts" />
/// <reference path="./library/password-score.js" />

"use strict";

declare let CTO_Globals: any;
declare let localforage: any;

(function ($) {
    $(function () {

        /**
         * create a instance of localForage to save wordlists
         */
        let wordlistStorage = localforage.createInstance({
            name: "wordlistStorage"
        });

        /**
         * create a instance of localForage to save wordlist-configs
         */
        let wordlistConfigStorage = localforage.createInstance({
            name: "wordlistConfigStorage"
        });

        /**
         * interface to check if a ajaxWordlist is already loaded
         */
        interface AjaxWordListLoaded {
            name: string;
            loaded: boolean;
            langSuffix: string;
        }

        /**
         * used ajax wordlists
         */
        let ajaxWordlists: Array<AjaxWordListLoaded> = [
            {
                name: "wordlists/english.txt",
                loaded: false,
                langSuffix: "en"
            },
            {
                name: "wordlists/german.txt",
                loaded: false,
                langSuffix: "de"
            }
        ];

        /**
         * options for password-score (global scope for performance reasons)
         */
        let psOptions: Array<object> = [];

        /**
         * interface to store wordlist-config
         */
        interface PsWorldlistConfig {
            status: "used" | "unused" | "loading";
            method: "ajax" | "file";
            length: number;
        }

        let totalPercent: number = 0;
        let totalPercentFactor: number = (1 / 5);

        /**
         * interface to connect a html-selector with a password-qualifier
         */
        interface GuiConnectionWithPasswordQualifier {
            resultSelector: string;
            passwordQualifier: PasswordQualifier;
        }

        /**
         * converts an amount of seconds to a readable string
         * inspired by zxcvbn
         *
         * @param {number} seconds
         * @return {string}
         */
        function convertSecondsToReadableEnglishString(seconds: number): string {

            let minute: number = 60;
            let hour: number = minute * 60;
            let day: number = hour * 24;
            let month: number = day * 31;
            let year: number = month * 12;
            let century: number = year * 100;

            let timeNum: number = null;
            let readable: string = seconds + "";

            if (seconds < 1) {
                readable = "less than a second";
            }

            else if (seconds < minute) {
                timeNum = Math.round(seconds);
                readable = timeNum + " second";
            }

            else if (seconds < hour) {
                timeNum = Math.round(seconds / minute);
                readable = timeNum + " minute";
            }

            else if (seconds < day) {
                timeNum = Math.round(seconds / hour);
                readable = timeNum + " hour";
            }

            else if (seconds < month) {
                timeNum = Math.round(seconds / day);
                readable = timeNum + " day";
            }

            else if (seconds < year) {
                timeNum = Math.round(seconds / month);
                readable = timeNum + " month";
            }

            else if (seconds < century) {
                timeNum = Math.round(seconds / year);
                readable = timeNum + " year";
            }

            else {
                readable = "centuries";
            }

            if (timeNum != null && timeNum != 1) {
                readable += "s";
            }

            return readable;

        }

        /**
         * translates an english output text to german
         * only if the cto-language is german
         *
         * @param {string} text
         * @return {string}
         */
        function translate(text: string): string {

            if(CTO_Globals.lang === "de") {

                // translate zxcvbn feedback and warnings
                text = text.replace("Use a few words, avoid common phrases", "Benutzen Sie ein paar W&ouml;rter, vermeiden Sie h&auml;fige W&ouml;rter");
                text = text.replace("No need for symbols, digits, or uppercase letters", "Kein Bedarf an Symbolen, Zahlen oder Gro&szlig;buchstaben");
                text = text.replace("Add another word or two. Uncommon words are better", "F&uuml;gen Sie ein oder zwei W&ouml;rter hinzu. Seltene W&ouml;rter sind besser");
                text = text.replace("Straight rows of keys are easy to guess", "Tastaturfolgen sind leicht zu erraten");
                text = text.replace("Short keyboard patterns are easy to guess", "Kurze Tastaturmuster sind leicht zu erraten");
                text = text.replace("Use a longer keyboard pattern with more turns", "Verwenden Sie ein l&aouml;ngeres Tastaturmuster");
                text = text.replace("Repeats like \"aaa\" are easy to guess", "Wiederholungen wie \"aaa\" sind leicht zu erraten");
                text = text.replace("Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"", "Wiederholungen wie \"abcabcabc\" sind nur etwas schwieriger zu erraten als \"abc\"");
                text = text.replace("Avoid repeated words and characters", "Vermeiden Sie wiederholte W&ouml;rter und Zeichen");
                text = text.replace("Sequences like abc or 6543 are easy to guess", "Sequenzen wie abc oder 6543 sind leicht zu erraten");
                text = text.replace("Avoid sequences", "Vermeiden Sie Sequenzen");
                text = text.replace("Recent years are easy to guess", "Jahreszahlen der letzten Jahre sind leicht zu erraten");
                text = text.replace("Avoid recent years", "Vermeiden Sie Jahreszahlen der letzten Jahre");
                text = text.replace("Avoid years that are associated with you", "Vermeiden Sie Jahreszahlen die einen Bezug zu Ihnen haben");
                text = text.replace("Dates are often easy to guess", "Ein Datum ist oft leicht zu erraten");
                text = text.replace("Avoid dates and years that are associated with you", "Vermeiden Sie Jahreszahlen und Daten die einen Bezug zu Ihnen haben");
                text = text.replace("This is a top-10 common password", "Dies ist eins der 10 h&auml;ufigsten Passw&ouml;rter");
                text = text.replace("This is a top-100 common password", "Dies ist eins der 100 h&auml;ufigsten Passw&ouml;rter");
                text = text.replace("This is a very common password", "Dies ist ein sehr h&auml;ufiges Passwort");
                text = text.replace("This is similar to a commonly used password", "Dies &auml;hnelt einem h&auml;ufig verwendeten Passwort");
                text = text.replace("A word by itself is easy to guess", "Ein Wort an sich ist leicht zu erraten");
                text = text.replace("Names and surnames by themselves are easy to guess", "Vor- und Nachnamen sind leicht zu erraten");
                text = text.replace("Common names and surnames are easy to guess", "H&auml;ufige Vor- und Nachnamen sind leicht zu erraten");
                text = text.replace("Capitalization doesn't help very much", "Gro&szlig;schreibung hilft nicht besonders viel");
                text = text.replace("All-uppercase is almost as easy to guess as all-lowercase", "Nur Gro&szlig;buchstaben sind fast so einfach zu erraten wie nur Kleinbuchstaben");
                text = text.replace("Reversed words aren't much harder to guess", "Umgekehrte W&ouml;rter sind nicht viel schwerer zu erraten");
                text = text.replace("Predictable substitutions like '@' instead of 'a' don't help very much", "Vorhersehbare Substitutionen wie \"@\" anstelle von \"a\" helfen nicht sehr");

                // translate time strings
                text = text.replace("less than a second", "Weniger als eine Sekunde");
                text = text.replace("seconds", "Sekunden");
                text = text.replace("second", "Sekunde");
                text = text.replace("minutes", "Minuten");
                text = text.replace("minute", "Minute");
                text = text.replace("hours", "Stunden");
                text = text.replace("hour", "Stunde");
                text = text.replace("days", "Tage");
                text = text.replace("day", "Tag");
                text = text.replace("months", "Monate");
                text = text.replace("month", "Monat");
                text = text.replace("years", "Jahre");
                text = text.replace("year", "Jahr");
                text = text.replace("centuries", "Jahrhunderte");

                // translate password score sequence types
                text = text.replace("dictionary", "W&ouml;rterbuch");
                text = text.replace("sequence", "Sequenz");
                text = text.replace("repetition", "Wiederholung");
                text = text.replace("keyboard", "Tastatur");
                text = text.replace("date", "Datum");
                text = text.replace("leet", "Leetspeak");

            }

            return text;

        }

        /**
         * initializes the input values (for browser compatibility)
         */
        function initInputValues(callback?: () => void): void {

            $("#password-input").val("");
            $("#show-password-checkbox").prop("checked", true);
            $("#show-wordlists-checkbox").prop("checked", false);

        }

        /**
         * updates the wordlist-gui
         *
         * @param {() => void} callback
         */
        function updateWordlistGui(callback?: () => void): void {

            let wordlistGuiSelector: string = "#ps-wordlists";
            let htmlToInsert: string = "";

            $(wordlistGuiSelector).text("");

            wordlistConfigStorage.iterate(function (value, key) {

                value = <PsWorldlistConfig> value;

                htmlToInsert += '<tr>';
                switch (value.status) {
                    case "used":
                        htmlToInsert += '<td><input type="checkbox" data-wordlistkey="' + key + '" class="ps-use-wordlist" checked /></td>';
                        break;
                    case "unused":
                        htmlToInsert += '<td><input type="checkbox" data-wordlistkey="' + key + '" class="ps-use-wordlist" /></td>';
                        break;
                    case "loading":
                        htmlToInsert += '<td><div class="loader"></div></td>';
                        break;
                }
                htmlToInsert += '<td>' + key + '</td><td>' + value.length + '</td>';
                switch (value.method) {
                    case "ajax":
                        htmlToInsert += '<td></td>';
                        break;
                    case "file":
                        htmlToInsert += '<td id="ps-delete-wordlist-' + key + '" class="ps-delete-wordlist"><i class="fa fa-trash"></i></td>';
                        break;
                }
                htmlToInsert += '</tr>';

            }, function () {

                $(wordlistGuiSelector).html(htmlToInsert);
                callback();

            });

        }

        /**
         * updates the password-score wordlists
         *
         * @param {() => void} callback
         */
        function updatePasswordScoreWordlists(callback?: () => void): void {

            psOptions = [
                // add querty and qwertz keyboard layout by default
                {
                    "type": "keyboard",
                    "key": "qwerty",
                    "keyboard": Score.prototype.keyboards.QWERTY
                },
                {
                    "type": "keyboard",
                    "key": "qwertz",
                    "keyboard": Score.prototype.keyboards.QWERTZ
                },

                // add support for repetitions, sequences and dates
                {
                    "type": "repetition"
                },
                {
                    "type": "sequences"
                },
                {
                    "type": "dates"
                }
            ];

            // associative array (aka object) to check if all wordlists were loaded
            let checkedWordlists = {};

            // execute the callback only if all wordlists were loaded
            let executeCallback = function(): void {

                if(typeof callback !== "function") return;

                for(let key in checkedWordlists) {
                    if(checkedWordlists[key] !== true) return;
                }

                callback();

            };

            // first iterator to initialize checkedWordlists
            wordlistConfigStorage.iterate(function (value, key) {

                // initialize keys of checkedWordlists with false
                checkedWordlists[key] = false;

            }, function() {

                // second iterator to fill psOptions with wordlists
                wordlistConfigStorage.iterate(function (value, key) {

                    value = <PsWorldlistConfig> value;

                    // only add wordlists if it shall be used
                    if (value.status == "used") {

                        // load requested wordlist from storage
                        WordlistParser.loadFromBrowserStorage(wordlistStorage, key, function (error: any, wordlist: Array<string>) {

                            // add wordlist to psOptions
                            psOptions.push({
                                "type": "dictionary",
                                "leet": true,
                                "key": key,
                                "dictionary": WordlistParser.convertToPasswordScoreFormat(wordlist)
                            });

                            // this wordlist is loaded and added now
                            // --> set it to true in checkedWordlists and try to execute callback
                            checkedWordlists[key] = true;
                            executeCallback();

                        });

                    } else {

                        // this wordlist will not be used, set it to true in checkedWordlists
                        checkedWordlists[key] = true;

                    }

                }, executeCallback);

            });

        }

        /**
         * reads password from gui and removes whitespaces
         *
         * @return {string}
         */
        function readPasswordFromGui(): string {

            let password: string = $("#password-input").val();
            return password.replace(/ /g, "");

        }

        /**
         * updates the results in the html-gui
         *
         * @param {string} selector jquery-selector for the referenced row
         * @param {number} quality percent-amount of quality to set width of progress-bar
         * @param {string} textToInsert text to insert next to the progress-bar
         */
        function updateResult(selector: string, quality: number, textToInsert: string): void {

            $(selector).find(".results-text").text(textToInsert);

            let progressBar: any = $(selector).find(".progress-bar");
            $(progressBar).attr("aria-valuenow", quality);
            $(progressBar).css("width", quality + "%");

            if (readPasswordFromGui() == "") {
                $(progressBar).attr("class", "progress-bar");
                return;
            }

            quality = Math.floor(quality / 25);
            switch (quality) {

                case 0:
                case 1:
                    $(progressBar).attr("class", "progress-bar bg-danger");
                    break;

                case 2:
                    $(progressBar).attr("class", "progress-bar bg-warning");
                    break;

                case 3:
                case 4:
                    $(progressBar).attr("class", "progress-bar bg-success");
                    break;

                default:
                    $(progressBar).attr("class", "progress-bar");
                    break;

            }

        }

        /**
         * calculates all values from ct1-methods and updates the gui
         *
         * @param {string} password
         */
        function calculateAndUpdateCryptoolValues(password: string): void {

            let keepass: KeepassPasswordQualifier = new KeepassPasswordQualifier(password);
            let mozilla: MozillaPasswordQualifier = new MozillaPasswordQualifier(password);
            let pgp: PgpPasswordQualifier = new PgpPasswordQualifier(password);

            let guiConnections = Array<GuiConnectionWithPasswordQualifier>();
            guiConnections.push({resultSelector: "#results-keepass", passwordQualifier: keepass});
            guiConnections.push({resultSelector: "#results-mozilla", passwordQualifier: mozilla});
            guiConnections.push({resultSelector: "#results-pgp", passwordQualifier: pgp});

            for (let i = 0; i < guiConnections.length; i++) {

                let guiConnection: GuiConnectionWithPasswordQualifier = guiConnections[i];
                let quality: number = guiConnection.passwordQualifier.getPasswordQuality();
                let textToInsert: string = quality + "%";

                if (guiConnection.passwordQualifier.getPasswordEntropy() != undefined) {
                    textToInsert += " (" + guiConnection.passwordQualifier.getPasswordEntropy() + " Bits)";
                }

                totalPercent += (quality * totalPercentFactor);
                updateResult(guiConnection.resultSelector, quality, textToInsert);

            }

        }

        /**
         * calculates all zxcvbn values and updates the gui
         *
         * @param {string} password
         */
        function calculateAndUpdateZxcvbnValues(password: string): void {

            let zxcvbnResult: ZxcvbnResult = zxcvbn(password);
            let zxcvbnProgressBarSelector: string = "#results-zxcvbn";
            let zxcvbnQuality: number = zxcvbnResult.score * 25;

            totalPercent += (zxcvbnQuality * totalPercentFactor);
            updateResult(zxcvbnProgressBarSelector, zxcvbnQuality, zxcvbnQuality + "%");

            $("#zxcvbn-time-to-crack-online").text(translate(<string> zxcvbnResult.crack_times_display.online_no_throttling_10_per_second));
            $("#zxcvbn-time-to-crack-offline").text(translate(<string> zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second));

            let zxcvbnSequencesSelector: string = "#zxcvbn-found-sequences";
            $(zxcvbnSequencesSelector).text("");

            if (zxcvbnResult.sequence.length > 0) {
                for (let i = 0; i < zxcvbnResult.sequence.length; i++) {
                    let sequenceToken: string = zxcvbnResult.sequence[i].token;
                    if(sequenceToken != password) {
                        $(zxcvbnSequencesSelector).append('<span class="badge badge-primary mr-1">' + sequenceToken + '</span>');
                    }
                }
            }

            if($(zxcvbnSequencesSelector).text() == "") {
                $(zxcvbnSequencesSelector).text("-");
            }

            let zxcvbnWarningSelector: string = "#zxcvbn-warning";
            $(zxcvbnWarningSelector).text("-");

            if (zxcvbnResult.feedback.warning != "") $(zxcvbnWarningSelector).html('<span class="badge badge-warning mr-1">' + translate(zxcvbnResult.feedback.warning) + '</span>');

            let zxcvbnSuggestionSelector: string = "#zxcvbn-suggestion";
            $(zxcvbnSuggestionSelector).text("-");

            if (zxcvbnResult.feedback.suggestions.length > 0) {
                $(zxcvbnSuggestionSelector).text("");
                for (let i = 0; i < zxcvbnResult.feedback.suggestions.length; i++) {
                    $(zxcvbnSuggestionSelector).append('<div><span class="badge badge-secondary">#' + i + '</span>' + translate(zxcvbnResult.feedback.suggestions[i]) + '</div>');
                }
            }

        }

        /**
         * calculates all values from password-score (david stutz) and updates the gui
         *
         * @param {string} password
         */
        function calculateAndUpdatePasswordscoreValues(password: string): void {

            let psScore: any;
            let psEntropy: number = 0;

            try {
                psScore = new Score(password);
                psEntropy = psScore.calculateEntropyScore(psOptions);
                psEntropy = Math.floor(psEntropy);
            } catch (err) {
                psEntropy = 0;
            }

            // mapping entropy to percentage
            let magic: number = 0.020117973905426252;
            let psPercent:number = 100 - 100 * Math.pow(Math.E, -magic * psEntropy);
            psPercent = (psEntropy >= 80) ? 100 : Math.floor(psPercent);
            totalPercent += (psPercent * totalPercentFactor);
            updateResult("#results-ps", psPercent, psPercent + "% (" + psEntropy + " Bits)");

            let psCracktimeSelector: string = "#ps-cracktime";
            let psCracktimeValue: string = convertSecondsToReadableEnglishString(psScore.calculateAverageTimeToCrack(psEntropy, 6));
            $(psCracktimeSelector).text(translate(psCracktimeValue));

            let psFoundMatchesListSelector: string = "#ps-found-matches-list";
            $(psFoundMatchesListSelector).html('<tr><td>-</td><td>-</td><td>-</td></tr>');

            if (!psScore.cache.minimumMatches) return;

            if (psScore.cache.minimumMatches.length > 0) {
                $(psFoundMatchesListSelector).text("");
                let alreadyFoundMatches: Array<string> = [];
                for (let i = 0; i < psScore.cache.minimumMatches.length; i++) {

                    let pattern: string = psScore.cache.minimumMatches[i].pattern;
                    let entropy: string = psScore.cache.minimumMatches[i].entropy.toFixed(2);
                    let type: string = psScore.cache.minimumMatches[i].type;

                    if (alreadyFoundMatches.indexOf(pattern) != -1) continue;

                    alreadyFoundMatches.push(pattern);
                    $(psFoundMatchesListSelector).append('<tr><td>' + pattern + '</td><td>' + entropy + '</td><td>' + translate(type) + '</td></tr>');
                }
            }


        }

        /**
         * main function to load and update the values of the password-check
         */
        function checkPasswordAndUpdateValues(): void {

            let password: string = readPasswordFromGui();

            $("#password-length-value").text(password.length);

            if(password.length >= 80) {
                $("#long-password-warning").css("display", "block");
            } else {
                $("#long-password-warning").css("display", "");
            }

            calculateAndUpdateCryptoolValues(password);
            calculateAndUpdateZxcvbnValues(password);
            calculateAndUpdatePasswordscoreValues(password);

            totalPercent = Math.floor(totalPercent);
            updateResult("#results-total", totalPercent, totalPercent + "%");
            totalPercent = 0;
        }

        /**
         * checks if all used technologies are supported by the browser
         * if not, a message will be shown
         */
        function checkBrowserCompatibility(): void {

            let result: boolean = true;

            if (!File || !FileReader || !FileList) {
                result = false;
            }

            if (!localforage.supports(localforage.INDEXEDDB)) {
                result = false;
            }

            if (result == false) {

                $("#compatibility-warning").css("display", "block");

            }

        }

        /**
         * loads all ajax wordlists (if not already loaded) and updates the wordlist-gui
         */
        function loadAjaxWordlists(): void {

            updateWordlistGui(function () {

                wordlistConfigStorage.iterate(function (value, key) {

                    value = <PsWorldlistConfig> value;

                    for (let i = 0; i < ajaxWordlists.length; i++) {

                        if (ajaxWordlists[i].name == key && value.method == "ajax") {
                            ajaxWordlists[i].loaded = true;
                        }

                    }

                }, function () {

                    for (let j = 0; j < ajaxWordlists.length; j++) {

                        if (ajaxWordlists[j].loaded == true) continue;

                        wordlistConfigStorage.setItem(ajaxWordlists[j].name, <PsWorldlistConfig> {

                            method: "ajax",
                            status: "loading",
                            length: 0

                        }, function () {

                            updateWordlistGui(function () {

                                WordlistParser.loadViaAjax(CTO_Globals.base + CTO_Globals.pluginRootPath + ajaxWordlists[j].name, function (wordlist: Array<string>) {

                                    WordlistParser.storeInBrowserStorage(wordlistStorage, ajaxWordlists[j].name, wordlist, function () {

                                        let used = "unused";

                                        if (CTO_Globals.lang == ajaxWordlists[j].langSuffix) used = "used";

                                        wordlistConfigStorage.setItem(ajaxWordlists[j].name, <PsWorldlistConfig> {

                                            method: "ajax",
                                            status: used,
                                            length: wordlist.length

                                        }, function () {
                                            updatePasswordScoreWordlists(function () {
                                                updateWordlistGui(function () {
                                                    checkPasswordAndUpdateValues();
                                                });
                                            });
                                        });

                                    });

                                });

                            });
                        });

                    }

                });

            });

        }

        /**
         * show or hide password-input on checkbox-change
         */
        $("#show-password-checkbox").change(function () {
            if ($(this).is(":checked")) {
                $("#password-input").attr("type", "text");
            }

            else {
                $("#password-input").attr("type", "password");
            }
        });

        /**
         * add event listener for password-checking
         */
        $("#password-input").on("input", checkPasswordAndUpdateValues);

        /**
         * show or hide wordlist-manager
         */
        $("#show-wordlists-checkbox").change(function () {
            if ($(this).is(":checked")) {
                $("#wordlist-inputs").css("display", "block");
                loadAjaxWordlists();
            }

            else {
                $("#wordlist-inputs").css("display", "none");
            }
        });

        /**
         * add event listener for wordlist-upload
         */
        $(document).on("change", "input.wordlist-input", function () {
            let file = this.files[0];

            if (!file) {
                return;
            }

            wordlistConfigStorage.setItem(file.name, <PsWorldlistConfig> {

                method: "file",
                status: "loading",
                length: 0

            }, function () {
                updateWordlistGui(function () {

                    WordlistParser.loadFromFile(file, function (wordlist: Array<string>) {

                        WordlistParser.storeInBrowserStorage(wordlistStorage, file.name, wordlist, function () {

                            wordlistConfigStorage.setItem(file.name, <PsWorldlistConfig> {

                                method: "file",
                                status: "used",
                                length: wordlist.length

                            }, function () {
                                updatePasswordScoreWordlists(function () {
                                    updateWordlistGui(function () {
                                        checkPasswordAndUpdateValues();
                                    });
                                });
                            });

                        });

                    });

                });
            });
        });

        /**
         * add event listener for using or not using a wordlist
         */
        $(document).on("change", ".ps-use-wordlist", function () {

            // read key of wordlistConfig from element
            let wordlistkey: string = $(this).attr("data-wordlistkey");
            let status: string = "";

            // set new status value
            if ($(this).is(":checked")) {
                status = "used";
            } else {
                status = "unused";
            }

            // load item from indexedDB (to get method and length)
            wordlistConfigStorage.getItem(wordlistkey, function (error: any, value: PsWorldlistConfig) {

                let newvalue = <PsWorldlistConfig> {
                    method: value.method,
                    status: status,
                    length: value.length
                };

                // write new value to indexedDB, update
                wordlistConfigStorage.setItem(wordlistkey, newvalue, function () {
                    updatePasswordScoreWordlists(function () {
                        updateWordlistGui(function () {
                            checkPasswordAndUpdateValues();
                        });
                    });
                });

            });

        });

        /**
         * add event listener for wordlist-deletion
         */
        $(document).on("click", ".ps-delete-wordlist", function () {

            let id: string = $(this).attr("id");
            id = id.replace("ps-delete-wordlist-", "");

            wordlistConfigStorage.setItem(id, <PsWorldlistConfig> {

                method: "file",
                status: "loading",
                length: 0

            }, function () {

                updateWordlistGui(function () {
                    WordlistParser.removeFromBrowserStorage(wordlistStorage, id, function () {
                        wordlistConfigStorage.removeItem(id, function () {
                            updatePasswordScoreWordlists(function () {
                                updateWordlistGui(function () {
                                    checkPasswordAndUpdateValues();
                                });
                            });
                        });
                    });
                });

            });

        });

        initInputValues();
        checkBrowserCompatibility();
        updatePasswordScoreWordlists();

    });
})(jQuery);