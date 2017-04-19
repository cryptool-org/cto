<template>
  <div class='notown' v-if='toggle'>
    <div id="keywordBox">
      <div class="keyword">
        <label class="left" for="keywdId1">{{ $t('firstKeyword') }}
          <label v-show="cType === '1' || cType === '4'" id="first" >{{ $t('beginningFirstK1') }} :</label>
          <label v-show="cType === '2'" id="first" >{{ $t('beginningFirstK2') }} :</label>
          <label v-show="cType === '3'" id="first" >{{ $t('beginningFirstK3') }} :</label>
        </label>
        <input type="text" id="keywdId1" name="keyName1" maxlength="38" size="38" v-model='firstKeyword' />
      </div>
      <div id="K4Key" class="keyword" v-show='show'>
        <label class="left">{{ $t('secondKeyword') }} <label id="second">{{ $t('beginningSecond') }}:</label></label>
        <input type="text" id="keywdId2" name="keyName2" maxlength="38" size="38" @keypress="validateKeypress(event, 0)" v-model='secondKeyword' />
      </div>
    </div>

    <div id="ciphType">
      <input id="showK1" type="radio" name="ciphTyp" value="1" v-model='cType' @change='changeType()' />
      <label for="showK1">K1</label>
      <input id="showK2" type="radio" name="ciphTyp" value="2" v-model='cType' @change='changeType()' />
      <label for="showK2">K2</label>
      <input id="showK3" type="radio" name="ciphTyp" value="3" v-model='cType' @change='changeType()' />
      <label for="showK3">K3</label>
      <input id="showK4" type="radio" name="ciphTyp" value="4" v-model='cType' @change='changeType()' />
      <label for="showK4">K4</label>
    </div>
  </div>
</template>
<script src="./keywordbox.js"></script>
