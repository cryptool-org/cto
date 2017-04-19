<template>
  <div id='cipherOptions'>
      <label>
          <input name='atbash' type='button' id='atbash' @click='atbash()' value='Atbash (reverse)'/>
      </label>
      <div>
          <label for="keywords">
              <input id="keywords" type="checkbox" name="keywords" value="0" v-model="keywords" />
              Use keywords
          </label>
      </div>
  </div>
</template>
<script src="./cipher.options.js"></script>
