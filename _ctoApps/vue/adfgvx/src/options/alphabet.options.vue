<template>
  <transition name="fade">
    <div v-if="toggle" id='alphabetOptions'>
      <ul>
          <li><span>{{ $t('alpha_headline') }}:</span></li>
          <li><input v-model="uppercase" name='uppercase' type='checkbox' id='uppercase' />
              <label>{{ $t('alpha_uppercase') }}</label></li>
          <li><input v-model='lowercase' name='lowercase' type='checkbox' id='lowercase' />
              <label>{{ $t('alpha_lowercase') }}</label></li>
          <li><input v-model="digits" name='digits' type='checkbox' id='digits' />
              <label>{{ $t('alpha_digits') }}</label></li>
          <li><input v-model="punctuationmarks" name='punctuationmarks' type='checkbox' id='punctuationmarks' />
              <label>{{ $t('alpha_puctuationmarks') }}</label></li>
          <li><input v-model="umlauts" name='umlauts' type='checkbox' id='umlauts' />
              <label>{{ $t('alpha_umlauts') }}</label></li>
          <li><input v-model="blanks" name='blanks' type='checkbox' id='blanks' />
              <label>{{ $t('alpha_blanks') }}</label></li>
      </ul>
    </div>
  </transition>
</template>
<script src="./alphabet.options.js"></script>
