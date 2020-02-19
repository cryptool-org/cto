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
                The Caesar cipher is named after the Roman military and political leader
                Gaius Julius Caesar (100 BC – 44 BC).<sup>1</sup>
                Caesar used this relatively simple form of ciphering to encode military messages.
            </p>
            <hr>
            <h4>References</h4>
            <p>
                <sup>1</sup> "Gaius Julius Cäsar", http://de.wikipedia.org/wiki/Julius_Caesar, 2009-02-20
            </p>
        </div>

        <!-- Show description -->
        <div id="Desc" class="tabcontent">
            <span @click="closeTab('Desc')" class="topright">x</span>
            <p>
                The classic version uses the capital letters A-Z, but, in principle, an arbitrary alphabet can be used.
                The first step is to write the alphabet down two times.
            </p>
            <pre>
                A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
                A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
            </pre>
            <p>
                Now, the bottom alphabet is shifted by an arbitrary number of positions.
                The number of positions is the key-value.
                Shifting the bottom alphabet 3 positions to the right yields the following result:
            </p>
            <pre>
                A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
                D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  A  B  C
            </pre>
            <p>
                The letter A becomes the letter D. B is replaced by E and C replaced by F, etc.
                The word "example" would be encoded by: "hadpsoh".
            </p>
            <hr/>
        </div>

        <!-- Show security -->
        <div id="Security" class="tabcontent">
            <span @click="closeTab('Security')" class="topright">x</span>
            <p>
                The key length is identical to the size of the given alphabet.
                Using the capital letters A-Z as alphabet allows 26 different keys,
                with the 26th key rendered meaningless because it would map each letter to itself.
                With only 25 meaningful keys, it would be quite easy to test for all possible keys until
                the correct one is found (brute-force analysis).
                The Caesar cipher can also easily be cracked with a frequency-analysis.
            </p>
            <hr>
        </div>
    </div>
</template>
<style src="./tabs.cto.css"></style>
<script src="./tab.js"></script>
