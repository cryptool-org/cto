<template>
    <div>
        <ul class="tab menu nav">
            <li><a href="javascript:void(0)" class="tablinks" @click="openTab(event, 'Desc')">Description</a></li>
            <li><a href="javascript:void(0)" class="tablinks" @click="openTab(event, 'Background')">Background</a></li>
            <li><a href="javascript:void(0)" class="tablinks" @click="openTab(event, 'Security')">Security</a></li>
        </ul>
        <!-- Show background -->
        <div id="Background" class="tabcontent">
            <span @click="closeTab('Background')" class="topright">x</span>
            <p>
                The monoalphabetic substitution takes a letter of an alphabet and substitutes it with another letter,
                this way a ciphertext is generated. The way of converting is fixed.
                A character of the plaintext will be replaced by the same ciphertext character, during the entire ciphertext.
                There is no additional key. The only way of security is to keep the substitution-table secret.
                A popular example for the monoalphabetic substitution is the caesar cipher.
            </p>
            <hr>
        </div>

        <!-- Show description -->
        <div id="Desc" class="tabcontent">
            <span @click="closeTab('Desc')" class="topright">x</span>
            <p>
                One of the oldest of cipher types was the simple substitution or monoalphabetic substitution ciphers in which each letter of the alphabet is replaced by another letter. Each plaintext letter is substituted by a unique ciphertext letter. The earliest known example is the Atbash cipher which is found in the Old Testament and dates from around 600-500BC. It uses the Hebrew alphabet where the first letter of the Hebrew alphabet is replaced by the last letter, the 2nd letter is replaced by the 2nd to last letter and so on. Using the English alphabet the Atbash substitution is:</p>
            <div class="indent">
                <p>Atbash cipher</p>
            </div>
            <pre>
                Plaintext:  abcdefghijklmnopqrstuvwxyz
                Ciphertext: ZYXWVUTSRQPONMLKJIHGFEDCBA
            </pre>
            <p>
                Another example is the Caesar cipher which was used by the Roman general and statesman Julius Caesar (100 BC-44 BC) to exchange messages with Marcus Tullius Cicero (106 BC-43 BC) and others. In this type each plaintext letter was replaced by the letter standing three places further along in the alphabet. So plaintext letter A is replaced by ciphertext letter D, B is replaced by E and so on. The full substitution is:</p>
            <div class="indent">
                <p>Caesar cipher</p>
            </div>
            <pre>
                Plaintext:  abcdefghijklmnopqrstuvwxyz
                Ciphertext: DEFGHIJKLMNOPQRSTUVWXYZABC
            </pre>
            <p>
                Later versions of the substitution cipher used a keyword to create a keyed alphabet which can be used for the plaintext alphabet, the ciphertext alphabet or both. Where word divisions are kept the American Cryptogram Association (ACA) refers to the monoalphabet substitution cipher as the "Aristocrat" cipher. Another type of cipher, the Patristocrat, uses the same method of encryption but normal word divisions are not retained. An additional "rule" used by the ACA is that no plaintext letter can be substituted by the same ciphertext letter so the keyed alphabets can be shifted to avoid this. Four types of substitution are used depending on how the keyed alphabet is used and these are known in the ACA as keyword types K1, K2, K3 and K4.</p><br/>

            <p>K1 Keyword: Keyed plain alphabet, straight cipher alphabet</p><br/>
            <pre>
                pt: <span class="gcarlin">gcarlin</span>bdefhjkmopqstuvwxyz
                CT: QRSTUVWXYZABCDEFGHIJKLMNOP
            </pre>
            <p>K2 Keyword: Straight plain alphabet, keyed cipher alphabet</p><br/>
            <pre>
                pt: abcdefghijklmnopqrstuvwxyz
                CT: HJKMOPQSTUVWXYZ<span class="gcarlin">GCARLIN</span>BDEF
            </pre>

            <p>K3 Keyword: Keyed plain alphabet, keyed cipher alphabet with the same keywords</p><br/>
            <pre>
                pt: <span class="gcarlin">gcarlin</span>bdefhjkmopqstuvwxyz
                CT: FHJKMOPQSTUVWXYZ<span class="gcarlin">GCARLIN</span>BDE
            </pre>

            <p>K4 Keyword: Keyed plain alphabet, keyed cipher alphabet with different keywords</p><br/>
            <pre>
                pt: <span class="gcarlin">gcarlin</span>bdefhjkmopqstuvwxyz
                CT: KLMNPRSVWXYZ<span class="gcarlin">QUOTE</span>ABCDFGHIJ
            </pre>

            <p>
                The following examples encipher the George Carlin quote "<i>To be intoxicated is to feel sophisticated but not be able to say it.</i>” using the four keyword types and the keyed alphabets shown above.<br/><br/>
                <span id="examples">Examples:</span><br/>
                Type: Monoalphabetic Substitution<br/>
                Keyword Type: K1<br/>
                Plaintext keyword: GCARLIN</p><br/>
            <pre>
                Plaintext:  to be intoxicated is to feel sophisticated but not be able to say it
                Ciphertext: JF XZ VWJFNVRSJZY VI JF AZZU IFGBVIJVRSJZY XKJ WFJ XZ SXUZ JF ISO VJ
            </pre><br/>

            <p>Type: Monoalphabetic Substitution<br/>
                Keyword Type: K2<br/>
                Ciphertext keyword: GCARLIN</p><br/>
            <pre>
                Plaintext:  to be intoxicated is to feel sophisticated but not be able to say it
                Ciphertext: LZ JO TYLZDTKHLOM TR LZ POOW RZGSTRLTKHLOM JIL YZL JO HJWO LZ RHE TL
            </pre><br/>

            <p>
                Type: Monoalphabetic Substitution<br/>
                Keyword Type: K3<br/>
                Plaintext keyword: GCARLIN<br/>
                Ciphertext keyword: GCARLIN
            </p><br/>
            <pre>
                Plaintext:  to be intoxicated is to feel sophisticated but not be able to say it
                Ciphertext: RZ QT OPRZBOHJRTS OA RZ UTTM AZGVOAROHJRTS QLR PZR QT JQMT RZ AJD OR
            </pre><br/>

            <p>Type: Monoalphabetic Substitution<br/>
                Keyword Type: K4<br/>
                Plaintext keyword: GCARLIN<br/>
                Ciphertext keyword: QUOTE</p><br/>
            <pre>
                Plaintext:  to be intoxicated is to feel sophisticated but not be able to say it
                Ciphertext: CT VX RSCTHRLMCXW RB CT YXXP BTEZRBCRLMCXW VDC STC VX MVPX CT BMI RC
            </pre>
            <hr/>
        </div>

        <!-- Show security -->
        <div id="Security" class="tabcontent">
            <span @click="closeTab('Security')" class="topright">x</span>
            <p>
                The Monoalphabetic substitution can easily be cracked with a frequency-analysis.
            </p>
            <hr>
        </div>
    </div>
</template>
<style src="./tabs.cto.css"></style>
<script src="./tabs.js"></script>
