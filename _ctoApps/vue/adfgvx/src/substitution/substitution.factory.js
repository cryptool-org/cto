import AppData from "../config/app.data";

var SubstitutionFactory = {
  mixins: [AppData],

  created() {
    if (AppData.data().matrix !== 'undefined') {
      this.matrix = AppData.data().matrix;
    } else {
      this.matrix = ['A','D','F','G','V','X'];
    }
  },
  data() {
    return {
      values: [],
    }
  },
  methods: {
    createMatrix() {
      this.values = [];
      console.log('matrix: ' + this.matrix);
      let res = "<div class='row'><div class='cellHead' id='null'>&</div>";
      for(let k = 0; k < this.matrix.length; k++) {
        res += "<div class='cellHead'>" + this.matrix[k] + "</div>";
      }
      res += "</div>";

      for(let k = 0; k < this.matrix.length; k++) {
        res += "<div class='row'><div class='cellHead'>" + this.matrix[k] + "</div>";
        for(let l = 0; l < this.matrix.length; l++) {
          let id = this.matrix[k] + this.matrix[l];
          this.values.push({ id: id, value: '' });
          res += "<div class='cell' id='" + id + "'>{{id}}</div>";
        }
        res += "</div>";
      }
      return res;
    },
    updateValues(id, value) {
      this.values.forEach(obj => {
        if (obj.id === id) {
          obj.value = value;
        }
      });
    },
    //generates/formates keysquare for substitution
    //@author Christian Sieche
    //@version 30.12.2008
    //@params: keysquare (string)
    // generate keysquare for substitution
    genKeysquare(keysquare) {
      document.getElementById("AA").innerHTML=keysquare.charAt(0);
      document.getElementById("AD").innerHTML=keysquare.charAt(1);
      document.getElementById("AF").innerHTML=keysquare.charAt(2);
      document.getElementById("AG").innerHTML=keysquare.charAt(3);
      document.getElementById("AX").innerHTML=keysquare.charAt(4);

      document.getElementById("DA").innerHTML=keysquare.charAt(5);
      document.getElementById("DD").innerHTML=keysquare.charAt(6);
      document.getElementById("DF").innerHTML=keysquare.charAt(7);
      document.getElementById("DG").innerHTML=keysquare.charAt(8);
      document.getElementById("DX").innerHTML=keysquare.charAt(9);

      document.getElementById("FA").innerHTML=keysquare.charAt(10);
      document.getElementById("FD").innerHTML=keysquare.charAt(11);
      document.getElementById("FF").innerHTML=keysquare.charAt(12);
      document.getElementById("FG").innerHTML=keysquare.charAt(13);
      document.getElementById("FX").innerHTML=keysquare.charAt(14);

      document.getElementById("GA").innerHTML=keysquare.charAt(15);
      document.getElementById("GD").innerHTML=keysquare.charAt(16);
      document.getElementById("GF").innerHTML=keysquare.charAt(17);
      document.getElementById("GG").innerHTML=keysquare.charAt(18);
      document.getElementById("GX").innerHTML=keysquare.charAt(19);

      document.getElementById("XA").innerHTML=keysquare.charAt(20);
      document.getElementById("XD").innerHTML=keysquare.charAt(21);
      document.getElementById("XF").innerHTML=keysquare.charAt(22);
      document.getElementById("XG").innerHTML=keysquare.charAt(23);
      document.getElementById("XX").innerHTML=keysquare.charAt(24);
    },
    genKeysquareV(keysquare) {
      document.getElementById("AA").innerHTML=keysquare.charAt(0);
      document.getElementById("AD").innerHTML=keysquare.charAt(1);
      document.getElementById("AF").innerHTML=keysquare.charAt(2);
      document.getElementById("AG").innerHTML=keysquare.charAt(3);
      document.getElementById("AV").innerHTML=keysquare.charAt(4);
      document.getElementById("AX").innerHTML=keysquare.charAt(5);

      document.getElementById("DA").innerHTML=keysquare.charAt(6);
      document.getElementById("DD").innerHTML=keysquare.charAt(7);
      document.getElementById("DF").innerHTML=keysquare.charAt(8);
      document.getElementById("DG").innerHTML=keysquare.charAt(9);
      document.getElementById("DV").innerHTML=keysquare.charAt(10);
      document.getElementById("DX").innerHTML=keysquare.charAt(11);

      document.getElementById("FA").innerHTML=keysquare.charAt(12);
      document.getElementById("FD").innerHTML=keysquare.charAt(13);
      document.getElementById("FF").innerHTML=keysquare.charAt(14);
      document.getElementById("FG").innerHTML=keysquare.charAt(15);
      document.getElementById("FV").innerHTML=keysquare.charAt(16);
      document.getElementById("FX").innerHTML=keysquare.charAt(17);

      document.getElementById("GA").innerHTML=keysquare.charAt(18);
      document.getElementById("GD").innerHTML=keysquare.charAt(19);
      document.getElementById("GF").innerHTML=keysquare.charAt(20);
      document.getElementById("GG").innerHTML=keysquare.charAt(21);
      document.getElementById("GV").innerHTML=keysquare.charAt(22);
      document.getElementById("GX").innerHTML=keysquare.charAt(23);

      document.getElementById("VA").innerHTML=keysquare.charAt(24);
      document.getElementById("VD").innerHTML=keysquare.charAt(25);
      document.getElementById("VF").innerHTML=keysquare.charAt(26);
      document.getElementById("VG").innerHTML=keysquare.charAt(27);
      document.getElementById("VV").innerHTML=keysquare.charAt(28);
      document.getElementById("VX").innerHTML=keysquare.charAt(29);

      document.getElementById("XA").innerHTML=keysquare.charAt(30);
      document.getElementById("XD").innerHTML=keysquare.charAt(31);
      document.getElementById("XF").innerHTML=keysquare.charAt(32);
      document.getElementById("XG").innerHTML=keysquare.charAt(33);
      document.getElementById("XV").innerHTML=keysquare.charAt(34);
      document.getElementById("XX").innerHTML=keysquare.charAt(35);
      //document.getElementById("mymatrix").value=keysquare;
      //document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
    },
  }
};
export default SubstitutionFactory;
