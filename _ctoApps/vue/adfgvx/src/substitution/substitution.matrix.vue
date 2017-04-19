<template>
    <div class="substitution-matrix-wrapper" v-show='own'>
        <div class="matrix">
            <p>{{ $t('substitution_matrix') }}</p>
            <div id='matrix' class='adfgvx-matrix'></div>
        </div>

        <div class="buttonBoxVertical">
            <keywordbox></keywordbox>
            <div id="newBox">
                <div class="keyword">
            <label class="left" for="mymatrix">{{ $t('specify_matrix') }}:</label>
            <input name='mymatrix' type='text' maxlength="36" id='mymatrix' v-model='mymatrix' @keyup='genMyKeysquare();'/>
                </div>
            </div>
            <warningPopup></warningPopup>
            <input type='button' name='key1' :value="$t('random_matrix')" @click='genRandomKeysquare();'>
            <input type='button' name='key2' :value="$t('standard_matrix')" @click='genStandardKeysquare();'>
            <div class='select'>
                <label for="selectKeyRoute">{{ $t('keywordRoute') }}:</label>
                <select id="selectKeyRoute" v-model="selectOption" @change="selectKeyRoute">
                    <option v-for="route in routeNames" :value="route">
                        {{ route }}
                    </option>
                </select>
                <!-- label for="selectMatrixRoute">Select matrix route (computed new matrix):</label>
                <select id="selectMatrixRoute" @change="selectMatrixRoute">
                    <option v-for="route in routeNames" :value="route">
                        {{ route }}
                    </option>
                </select-->
            </div>
        </div>
    </div>
</template>
<style src="./substitution.css"></style>
<script src="./substitution.matrix.js"></script>
