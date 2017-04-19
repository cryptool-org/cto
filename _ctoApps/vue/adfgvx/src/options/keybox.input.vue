<template>
  <div id='keyBox'>
    <div>
        <p>{{ $t('key') }}:
        <input name='key' type='text' id='key' v-model='keyValue' @keyup='checkKey()'/>
        </p>
    </div>

    <div>
        <p>{{ $t('columns') }}:
        <input name='columns' id='columns' class='readonly' readonly='true' :value='columns' />
        </p>
    </div>
  </div>
</template>
<script src="./keybox.input.js"></script>
