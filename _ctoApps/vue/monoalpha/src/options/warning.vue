<template>
  <div id="errors">
    <label v-show="warningClash" class="warning textCenter">{{ $t('warningClash') }}:
      <label>{{clashes}}</label>
    </label>
  </div>
</template>
<script src="./warning.js"></script>
