<template>
  <div id='keyBox'>
      <div class='keyBoxOptions'>
        <label for="bit">{{ $t('keyLength') }}:</label>
        <select id="bit" v-model="selectOption">
          <option value="128">128 Bit</option>
          <option value="192">192 Bit</option>
          <option value="256">256 Bit</option>
        </select>
      </div>
      <div class='keyBoxOptions has-feedback'>
        <label for="key">{{ $t('keyKnown') }}:</label>
        <div>
            <input name='key' type='text' class="form-control" id='key' @keyup='checkKey' v-model="keyValue" :class="clazz"/>
            <span v-show="!warningLength" class="glyphicon glyphicon-ok form-control-feedback"></span>
            <span v-show="warningLength" class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
            <svg @mouseover="help" @click="close" class="icon">
              <use xlink:href="#signs"></use>
            </svg>
        </div>
      </div>
      <infobox></infobox>
  </div>
</template>
<style src="./icon.css" />
<style src="./keybox.css" />
<script src="./keybox.js"></script>
