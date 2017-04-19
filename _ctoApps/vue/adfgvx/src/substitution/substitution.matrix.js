import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from "../config/app.data";
import SubstitutionFactory from "./substitution.factory";
import KeywordBox from "./keywordbox.vue";
import WarningPopup from "./warning.popup.vue";
import Routes from "../model/routes";
import CTOLibService from "../lib/ctolib.service";

var SubstitutionMatrix = Vue.component('substitutionMatrix', {
    mixins: [EventBus, EventNames, AppData, SubstitutionFactory],

    created() {
      this.eventBus.$on(EventNames.OwnValue, value => {
        this.own = value;
      });
      this.eventBus.$on(EventNames.KeywordFirst, value => {
        this.firstKeyword = value.toUpperCase();
        this.firstKeyword = this.ctolib.makeUnique(this.firstKeyword);
      });
      this.eventBus.$on(EventNames.Matrix, value => {
        this.matrix = value;
        this.initRoutes();
        document.getElementById("matrix").innerHTML = this.createMatrix();
        this.genRandomKeysquare();
        //this.genStandardKeysquare();
      });
      this.eventBus.$on(EventNames.KeySquareGen, value => {
        this.mymatrix = value;
        if (this.matrix.length < 6) {
          this.genKeysquare(value);
          this.allowedKeys = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        } else {
          this.genKeysquareV(value);
          this.allowedKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
      });
    },
    mounted() {
      document.getElementById("matrix").innerHTML = this.createMatrix();
      this.initRoutes();
      this.routeNames = this.routes.getRouteNames();
    },
    components: {
      KeywordBox,
      WarningPopup,
    },
    data() {
      return {
        routes: {},
        routeNames: [],
        matrixTmp: '',
        selected: '',
        selectOption: 'Rows from top left',
        ctolib: new CTOLibService(),
      }
    },
    methods: {
      genRandomKeysquare() {
        this.reset();
        this.eventBus.$emit(EventNames.KeySquareRandom);
      },
      genStandardKeysquare() {
        this.reset();
        this.eventBus.$emit(EventNames.KeySquareStandard);
      },
      genMyKeysquare() {
        this.eventBus.$emit(EventNames.KeySquareMy, this.mymatrix);
      },
      reset() {
        this.firstKeyword = '';
        this.selectOption = 'Rows from top left';
      },
      selectMatrixRoute() {
        var index = document.getElementById("selectMatrixRoute").selectedIndex;
        let keyedAlpha = this.routes.keytoRoute(this.mymatrix, index);

        this.changeMatrix(keyedAlpha);
      },
      selectKeyRoute() {
        var index = document.getElementById("selectKeyRoute").selectedIndex;
        let alpha = this.getKeywordAlpha();
        let keyedAlpha = this.routes.keytoRoute(alpha, index);

        this.changeMatrix(keyedAlpha);
      },
      changeMatrix(keyedAlpha) {
        let k = '';
        for (let i = 0; i < this.matrix.length; i++) {
          k += keyedAlpha.substr(i * this.matrix.length, this.matrix.length);
        }
        console.log(k);
        this.mymatrix = k;
        this.genMyKeysquare();
      },
      getKeywordAlpha: function() {
        let alphabet = this.allowedKeys;
        for (let k = 0; k < this.firstKeyword.length; k++) {
          let char = this.firstKeyword[k];
          alphabet = alphabet.replace(char, '');
        }
        return this.firstKeyword + alphabet;
      },
      initRoutes() {
        this.routes = new Routes(this.matrix.length);
        this.routes.genRoutes();
      }
    }
});
export default SubstitutionMatrix;
