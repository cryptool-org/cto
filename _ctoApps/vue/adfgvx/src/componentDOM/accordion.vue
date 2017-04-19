<template>
    <div>
        <!-- Show background -->
        <button type="button" class="accordion" @mouseover="toggleAccordion()">Show background</button>
        <div class="panel">
            <p>
                ADFGX and the successor ADFGVX were developed by the German intelligence officer Fritz Nebel (* 1891; † 1967).
                ADFGX was used for the first time at the 5th of March in 1918 during World War I. Only a few months later,
                on the 1st of June, an extended version of this cipher called ADFGVX was used.
                A group of German cryptologists considered this cipher to be unbreakable. Since the German troops
                were close to Paris, it was crucial for the allied forces to break this cipher and get intelligence about
                the next movements of the German troops. On the 2nd of June, the French crypt analyst Geoges Painvin
                managed to break the encoding for a German radio message. A little later he managed to decrypt a message
                which revealed the position of the German troops. This was arguably one of the most important reasons why
                the German attack failed.<sup>1</sup>
                The transmitted messages of the Germans were only composed of the characters A, D, F, G, V and X.
                These characters have been chosen because they are easily distinguishable in the Morse alphabet
                .<sup>2</sup>
            </p>
            <hr>

            <h4>References</h4>
            <p>
                <sup>1</sup> Singh, Simon: "Geheime Botschaften", Carl Hanser Verlag, 1999, P. 132<br />
                <sup>2</sup> Singh, Simon: "Geheime Botschaften", Carl Hanser Verlag, 1999, P. 448
            </p>
            <hr>
        </div>

        <!-- Show description -->
        <button type="button" class="accordion" @mouseover="toggleAccordion()">Show ADFGX description</button>
        <div class="panel">
            <p>
                The cipher uses a combination of substitution and transposition. The first step of encryption uses a
                25-letter alphabet written into a 5x5 square matrix filled with a keyed alphabet using all the
                letters of the alphabet, with J being replaced by I.
                The grid is filled from a keyed alphabet which is created from a key word, with repeated letters being omitted,
                followed by the unused letters of the alphabet in alphabetic order.
                For example using the key word <span class="mono">FAILURE</span> and appending unused alphabet letters produces the keyed alphabet:</p>
            <p id="indent"><span class="mono">FAILUREBCDGHKMNOPQSTVWXYZ</span></p>
            <p>The keyed alphabet is written into the matrix in a selected route, e.g. horizontal, diagonal or clockwise to form the following matrix:</p>

            <div class="tableGrid">
                <div class="tableRow">
                    <div class="tblCell"></div>
                    <div class="tblCell"><strong>A</strong></div>
                    <div class="tblCell"><strong>D</strong></div>
                    <div class="tblCell"><strong>F</strong></div>
                    <div class="tblCell"><strong>G</strong></div>
                    <div class="tblCell"><strong>X</strong></div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>A</strong></div>
                    <div class="tblCell">F</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">I</div>
                    <div class="tblCell">L</div>
                    <div class="tblCell">U</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>D</strong></div>
                    <div class="tblCell">R</div>
                    <div class="tblCell">E</div>
                    <div class="tblCell">B</div>
                    <div class="tblCell">C</div>
                    <div class="tblCell">D</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>F</strong></div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">H</div>
                    <div class="tblCell">K</div>
                    <div class="tblCell">M</div>
                    <div class="tblCell">N</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>G</strong></div>
                    <div class="tblCell">O</div>
                    <div class="tblCell">P</div>
                    <div class="tblCell">Q</div>
                    <div class="tblCell">S</div>
                    <div class="tblCell">T</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>X</strong></div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">W</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">Y</div>
                    <div class="tblCell">Z</div>
                </div>
            </div>

            <p>Plaintext letters of the message are located in the grid and replaced by the row and column indicator letters. So plaintext letter T is replaced by ciphertext letters GX, R is replaced by DA and so on. This ciphertext is then written into a block horizontally and each column is read off vertically to form the final ciphertext. The order in which the columns are read is determined by the alphabetic order of the letters of a second keyword. The number of letters in the keyword also defines the width of the rectangle used.</p>
            <p>For example, encipher the following quote "<i>Trying is the first step to failing.</i>” using the keywords <span class="mono">FAILURE</span> and <span class="mono">VICTORY</span> gives:</p>
            <pre>
                Transposition block:
                VICTORY
                -------
                GXDAXGA
                FFXFAAF
                GGGXFDD
                DAAAFDA
                GGGXGGG
                XDDGDGX
                GAAAADA
                FAGAFFX
                FA
            </pre>
            <p class="mono">
                Ciphertext: DXGAG DAGXF GAGDA AAXAF FGDAF GADDG GDFAF XAXGA AGFGD GXGFF AFDAG XAX
            </p>
            <hr>
        </div>

        <!-- Show description -->
        <button type="button" class="accordion" @mouseover="toggleAccordion()">Show ADFGVX description</button>
        <div class="panel">
            <p>
                The encoding procedure according to ADFGVX consists of two phases. For the first phase (substitution),
                the Polybius cipher is used. A matrix with 6 rows and columns is formed. Each character from the alphabet
                A-Z has to be written down in this matrix as well as the numbers 0-9.
                The predecessor substitution ADFGX used a matrix with only 5 rows and columns.
                In addition to that, the encoding procedure according to ADFGX is analogous to ADFGVX, which will be explained below.
                Such a matrix could look like this:
            </p>

            <div class="tableGrid">
                <div class="tableRow">
                    <div class="tblCell"></div>
                    <div class="tblCell"><strong>A</strong></div>
                    <div class="tblCell"><strong>D</strong></div>
                    <div class="tblCell"><strong>F</strong></div>
                    <div class="tblCell"><strong>G</strong></div>
                    <div class="tblCell"><strong>V</strong></div>
                    <div class="tblCell"><strong>X</strong></div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>A</strong></div>
                    <div class="tblCell">J</div>
                    <div class="tblCell">E</div>
                    <div class="tblCell">5</div>
                    <div class="tblCell">C</div>
                    <div class="tblCell">L</div>
                    <div class="tblCell">1</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>D</strong></div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">3</div>
                    <div class="tblCell">4</div>
                    <div class="tblCell">7</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">2</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>F</strong></div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">N</div>
                    <div class="tblCell">S</div>
                    <div class="tblCell">0</div>
                    <div class="tblCell">U</div>
                    <div class="tblCell">P</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>G</strong></div>
                    <div class="tblCell">M</div>
                    <div class="tblCell">F</div>
                    <div class="tblCell">K</div>
                    <div class="tblCell">Z</div>
                    <div class="tblCell">8</div>
                    <div class="tblCell">9</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>V</strong></div>
                    <div class="tblCell">I</div>
                    <div class="tblCell">6</div>
                    <div class="tblCell">Q</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">W</div>
                    <div class="tblCell">B</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell"><strong>X</strong></div>
                    <div class="tblCell">T</div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">Y</div>
                    <div class="tblCell">O</div>
                    <div class="tblCell">R</div>
                    <div class="tblCell">H</div>
                </div>
            </div>
            <p>
                For the message <span class="mono">"GEHEIMNACHRICHT"</span> the character G will be substituted according to the matrix shown above to XD.
                (row X and column D). The E is replaced by AD (row A and column D) and the H by XX (row X and column X).
                After substituting all characters we get: <span class="mono">"XD AD XX AD VA GA FD DV AG XX XV VA AG XX XA"</span>.
            </p>
            <p>
                Transposition is used for the second phase of encoding. The matrix is read in row by row and read out column by column.
                Also, an arbitrary keyword has to be chosen. Let’s assume the key would be <span class="mono">"MYKEY"</span>.
            </p>
            <div class="tableGrid">
                <div class="tableRow">
                    <div class="tblCell"><strong>M</strong></div>
                    <div class="tblCell"><strong>Y</strong></div>
                    <div class="tblCell"><strong>K</strong></div>
                    <div class="tblCell"><strong>E</strong></div>
                    <div class="tblCell"><strong>Y</strong></div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">X</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">X</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">X</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">A</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">G</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">F</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">D</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">V</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">X</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">X</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">A</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">G</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">A</div>
                </div>
            </div>
            <p>
                For the last step, the columns are swapped. This happens by sorting the keyword alphabetically.
                The result would be this matrix:
            </p>
            <div class="tableGrid">
                <div class="tableRow">
                    <div class="tblCell"><strong>E</strong></div>
                    <div class="tblCell"><strong>K</strong></div>
                    <div class="tblCell"><strong>M</strong></div>
                    <div class="tblCell"><strong>Y</strong></div>
                    <div class="tblCell"><strong>Y</strong></div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">D</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">X</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">V</div>
                    <div class="tblCell">D</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">A</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">D</div>
                    <div class="tblCell">F</div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">D</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">X</div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">A</div>
                    <div class="tblCell">X</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">A</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">V</div>
                    <div class="tblCell">A</div>
                </div>
                <div class="tableRow">
                    <div class="tblCell">X</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">G</div>
                    <div class="tblCell">X</div>
                    <div class="tblCell">A</div>
                </div>
            </div>
            <p>
                The character M of the keyword has been header of the first column before swapping.<br />
                Now it has become column 3.<br />
                The character Y of the keyword has been header of the second column before swapping.<br />
                Now it has become column 4.<br />
                The character K of the keyword has been header of the third column before swapping.<br />
                Now it has become column 2.<br />
                In result the original columns have been swapped to the positions (3-4-2-1-5).
            </p>
            <p>
                To get the ciphertext, the matrix has to be read out column by column from the top to the bottom.<br />
                The final ciphertext would be: <span class="mono">"DV DX AX AD FG VX XX GV XG DA AA VX XA DX AA"</span>.
            </p>
            <hr>
        </div>

        <!-- Show background -->
        <!--button type="button" class="accordion" @mouseover="toggleAccordion()">Show background</button>
        <div class="panel">
            <h4>Hintergrund</h4>
            <p>
            ADFGX und der ADFGVX wurden von dem deutschen Nachrichtenoffizier Fritz Nebel (* 1891; † 1967) erfunden. ADFGX kam das erste Mal am 5. März 1918 während des Ersten Weltkriegs zum Einsatz. Schon wenige Monate später, am 1. Juni 1918, kam der um den Buchstaben „V“ erweiterte Nachfolger ADFGVX zum Einsatz. Eine Gruppe von deutschen Kryptographen hielt es für ein vielversprechendes und nicht zu knackendes Verfahren. Da die deutschen Truppen kurz vor Paris standen, war es für die Alliierten hingegen von entscheidender Bedeutung, die Verschlüsselung zu knacken, um informiert zu sein, an welcher Stelle die Deutschen einen Vorstoß planen. Am 2. Juni konnte der französische Kryptoanalytiker Geoges Painvin erstmals einen ADFGVX-Funkspruch der Deutschen knacken. Später fing er einen Funkspruch ab, der den Standort der Deutschen Truppen verriet, was entschieden dazu beigetragen hat, dass der Angriff der Deutschen fehlschlug.1 Die übermittelten Nachrichten der Deutschen bestanden nur noch aus den Buchstaben A, D, F, G, V und X. Diese Buchstaben wurden aufgrund der guten Unterscheidbarkeit im Morsealphabet gewählt.2
            </p>
        </div>

        <!-- Show functionality -->
        <!--button type="button" class="accordion" @mouseover="toggleAccordion()">Show security</button>
        <div class="panel">
            <h4>Sicherheit</h4>
            <p>
                Um eine ADFGVX-Chiffre zu entschlüsseln, muss sowohl der Aufbau der Substitutionsmatrix als auch der Schlüssel für die Transposition bekannt sein. Das Ergebnis der Substitution ist allerdings nur eine monoalphabetische Ersetzung der Buchstaben, die keinen wirklichen Schutz bietet. Dementsprechend trägt im Grunde genommen nur die Transposition zum Schutz bei und es muss versucht werden, die Reihenfolge der Spaltenverschiebung herauszufinden.
                Nach erster Phase der Verschlüsselung liegt nur eine monoalphabetische Chiffrierung vor. Ohne zweite Phase der Transposition wäre das Ergebnis der Substitution nicht sicherer als eine Caesar-Verschlüsselung.
            </p>
        </div-->

        <!-- Show security -->
        <button type="button" class="accordion" @mouseover="toggleAccordion()">Show security</button>
        <div class="panel">
            <p>
                To decode an ADFGVX cipher, the structure of the substitution matrix has to be known as well as the key for the transposition. However, the result of the substitution step is only a monoalphabetic substitution of the characters, which is not very secure. The transposition procedure is mainly responsible for the security of the cipher and an attacker has to find out how this procedure works.
                The first phase of encoding results in a monoalphabetic substitution. Without the second phase this cipher would not be more secure than the Caesar cipher.
            </p>
            <hr>
        </div>
    </div>
</template>
<style src="./accordion.css"></style>
<script src="./accordion.js"></script>
