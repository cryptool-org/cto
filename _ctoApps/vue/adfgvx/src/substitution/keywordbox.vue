<template>
  <div id="keywordBox">
    <div class="keyword">
      <label class="left" for="keywdId1">{{ $t('firstKeyword') }}:</label>
      <input type="text" id="keywdId1" name="keyName1" maxlength="36" v-model='firstKeyword' />
    </div>
  </div>
</template>
<style src="./keywordbox.css" />
<script src="./keywordbox.js"></script>
