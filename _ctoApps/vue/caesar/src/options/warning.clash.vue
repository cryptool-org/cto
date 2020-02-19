<template>
    <div class="infobox visible" >
        <!--span v-show="warningLength" class='popuptext visible'>{{ $t('warningLength') }}</span-->
        <label v-show="warnClash" class="infoboxtext visible warning textCenter">{{ $t('warningClash') }}:
            <label v-for='clash in clashes'>{{clash}}</label>
        </label>
    </div>
</template>
<!--style src="./popup.css" /-->
<style src="./warning.clash.css" />
<script src="warning.clash.js"></script>
