<template>
    <div id='substitution'>
        <label>
            <input name='showSubstitution' type='checkbox' @change='active()'/>
            {{ $t('substitutiontxt') }}<span v-show='toggle'>:</span>
        </label>
        <div v-show='toggle'>
        <textarea name='substitutiontxt' id='substitutiontxt' cols='63' rows='5' wrap='hard' readonly='true'
                  class='readonly' v-model='substitutiontxt'></textarea>
            <div id='displayOptions'>
              <radioSubGroups></radioSubGroups>
            </div>
        </div>
    </div>
</template>
<script src="./substitutiontext.js"></script>
