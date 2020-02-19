import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import Popup from "../options/popup.vue"
import AppData from '../config/app.data';
import Control from "./control";
import ButtonBox from "../options/buttonbox.vue";
import ArrayList from "../lib/array.list";
import ResultObject from "../model/result.object";

var SocketBox = Vue.component('socketbox', {
    mixins: [AppData, EventBus, EventNames],

    created() {
        this.arrayList.init(3, 'tab');
        this.arrayList.set('tab3', new ResultObject());
        this.arrayList.set('tab2', new ResultObject());
        this.arrayList.set('tab1', new ResultObject());
        this.control = new Control(this);
        this.socketRooms = this.control.socket.gRooms();
        //this.selectRoom = this.control.socket.room;
        let maxHCon = (2 * navigator.hardwareConcurrency) || 4;
        for (let i = 0; i < maxHCon; i++) {
            this.numberWorkers[i] = i+1;
        }
        if (this.numberWorkers.length > 1) {
            this.selectWorker = parseInt(this.numberWorkers.length - 1);
        }
        //this.control.pool.changeWorkerSize(this.selectWorker);
        this.eventBus.$on(EventNames.Crypt, obj => {
            this.codtxt = obj.txt;
            this.resetSettings();
            //console.log(window.navigator);
        });
        this.eventBus.$on(EventNames.Compute, () => {
            this.exe();
            let obj = {codtxt: this.codtxt,
                keyValue: this.keyValue, keyRange: this.hexKeys.length,
                maxComputeLen: this.selectCompLen, mode: this.mode, alpha: this.hexKeys, number: 1
            };
            this.control.alone(obj);
        });
        this.eventBus.$on(EventNames.Distribute, () => {
            this.control.socket.send('g.names');
            console.log(this.control.getCurrentJob());
            this.control.socket.send('compute', {
                cmd: 'distribute', sid: this.control.socket.id(), job: this.control.getCurrentJob() }
                //codtxt: this.codtxt, keyValue: this.keyValue,
                //maxComputeLen: this.selectCompLen, mode: this.mode}
            );
            console.log(this.keyValue);
        });
        this.eventBus.$on(EventNames.KeyValue, value => {
            this.keyValue = value;
            this.resetSettings();
        });
        this.eventBus.$on(EventNames.BitSelected, obj => {
            this.bitValue = obj.bit;
            this.keyValue = obj.keyValue;
        });
        this.eventBus.$on(EventNames.JobLocal, value => {
            if (value) {
            }
        });
        this.eventBus.$on(EventNames.JobDefine, value => {
            this.defineJob = value;
        });
        this.eventBus.$on(EventNames.ResourceSpend, value => {
            this.spendResource = value;
        });
        this.eventBus.$on(EventNames.GroupType, msg => {
            this.setSettings(this.tab, msg);
            if (msg == '3') {
                this.selectWorker = this.numberWorkers.length / 2;
            }
            //this.matchValues = [];
            //this.show = false;
        });
    },
    beforeDestroy() {
        this.control.socket.send('exit');
        this.control.socket.close();
        this.control.pool.stop();
    },
    data() {
        return {
            control: null,
            decryptText: '',
            isJobCreate: false,
            isFilled: false,
            defineJob: false,
            jobName: '',
            jobLength: false,
            numberWorkers: [1],
            selectWorker: 1,
            searchValues: '',
            matchValues: [],
            connectClients: 0,
            numberResults: 0,
            open: false,
            modalToggle: false,
            arrayList: new ArrayList(),
            resultObj: new ResultObject(),
            selectRoom: '/none',
            selectJob: '/none',
            socketRooms: [],
            socketType: 'socketRooms',
            selectCompLen: 96,
            spendResource: false,
            tab: '1',
            computeLengths: [16, 32, 64, 96, 128], //,160, 192, 224, 256],
            //date: '',//new Date().toLocaleTimeString('en-GB'),
            //inter: '', interComKeys: '',
        }
    },
    watch: {
        socketType: function (newVal, oldVal) {
            if (newVal === oldVal) { return; }
            this.socketRooms = this.control.socket.gRooms();
        },
        socketRooms: function (newVal, oldVal) {
            if (newVal === oldVal) { return; }
            this.socketRooms = newVal;
        },
        selectJob: function (newVal, oldVal) {
            console.log(newVal);
            this.switchRoom(newVal);
        },
        selectRoom: function (newVal, oldVal) {
            this.switchRoom(newVal);
            let valid = this.jobName.length > 3 && this.jobName.length < 21;
            this.isFilled = valid && this.newVal !== '/none';
        },
        isJobCreate: function(newVal, oldVal) {
            if (newVal) {
                this.eventBus.$emit(EventNames.RoomSelected, true);
            } else if (oldVal) {
                this.eventBus.$emit(EventNames.RoomSelected, false);
            }
        },
        jobName: function(newVal, oldVal) {
            let valid = newVal.length > 3 && newVal.length < 21;
            this.jobLength = valid;
            this.isFilled = valid && this.selectRoom !== '/none';
        },
        selectWorker: function(newVal, oldVal) {
            //console.log(this.selectWorker);
            window.clearInterval(this.resultObj.interComKeys);
            this.resultObj.numberOfComKeys = 0;
            this.resultObj.numberOfKeys = 0;
            this.control.pool.changeWorkerSize(newVal);
        },
        searchValues: function (newVal, oldVal) {
            this.matchValues = [];
            if (this.searchValues.length !== 0) {
                let array = this.searchValues.split(' ');
                this.matchValues = this.resultObj.searchByKeywords(array);
                this.show = true;
            } else {
                this.show = false;
            }
        },
        toggle: function() {
            this.eventBus.$emit(EventNames.Toggle, this.toggle);
        }
    },
    methods: {
        setSettings(oTab, nTab) {
            if (oTab == nTab) { return; }

            let resObj = new ResultObject();
            resObj.setSettings(this.resultObj);
            if (oTab == '3') {
                this.arrayList.set('tab3', resObj);
            } else if (oTab == '2') {
                this.arrayList.set('tab2', resObj);
            } else if (oTab == '1') {
                this.arrayList.set('tab1', resObj);
            }
            this.tab = nTab;

            let resultObj = null;
            if (this.tab == '3') {
                resultObj = this.arrayList.get('tab3');
            } else if (this.tab == '2') {
                resultObj = this.arrayList.get('tab2');
            } else if (this.tab == '1') {
                resultObj = this.arrayList.get('tab1');
            }

            console.log(resultObj.matchValues);

            this.resultObj.setSettings(resultObj);
            if (this.resultObj.numberOfKeys < 1) {
                this.finish = false;
                this.show = false;
            } else {
                this.finish = true;
            }
            this.matchValues = [];
        },
        resetSettings() {
            window.clearInterval(this.resultObj.interComKeys);
            this.finish = false;
            this.show = false;
            this.matchValues = [];
            this.resultObj.startTime = '';
            this.resultObj.startDate = '';
            this.resultObj.date = '';
            this.resultObj.elapTime = '';
            this.resultObj.inter = '';
            this.resultObj.interComKeys = '';
            this.resultObj.throughput = 0;
            this.resultObj.numberAllKeys = 0;
            this.resultObj.numberOfComKeys = 0;
            this.resultObj.numberOfKeys = 0;

            if (this.tab == '3') {
                this.arrayList.reset('tab3');
            } else if (this.tab == '2') {
                this.arrayList.reset('tab2');
            } else if (this.tab == '1') {
                this.arrayList.reset('tab1');
            }
        },
        switchRoom(newVal) {
            let bool = this.control.socket.switch(newVal);
            /*if (bool) {
                this.eventBus.$emit(EventNames.RoomSelected, true);
            }*/
            if (newVal === '/none' || newVal === '/root') {
                this.eventBus.$emit(EventNames.RoomSelected, false);
            }
        },
        createJob() {
            this.control.socket.send('job.create', { sid: this.control.socket.id(),
                name: this.jobName, codtxt: this.codtxt, keyValue: this.keyValue,
                maxComputeLen: this.selectCompLen, mode: this.mode}
            );
            this.isFilled = false;
            //this.jobName = ''; bug
        },
        exe() {
            this.start = true;
            this.run = true;
            this.finish = false;
            this.resultObj.numberAllKeys = 0;
            this.resultObj.throughput = 0;
            this.resultObj.startTime = new Date();
            this.resultObj.startDate = this.resultObj.startTime.toLocaleTimeString('en-GB');
            this.resultObj.inter = setInterval( () => {
                //this.date = new Date().toLocaleTimeString('en-GB');
                let mil = Date.now() - this.resultObj.startTime.getTime() - 3600000;
                this.resultObj.elapTime = new Date(mil).toLocaleTimeString('en-GB');
            }, 100);
            this.resultObj.interComKeys = setInterval( () => {
                this.resultObj.numberOfComKeys = this.control.pool.getComputedKeysCount()[0];
                this.resultObj.numberOfKeys = this.control.pool.getComputedKeysCount()[1];
            }, 150);

            this.show = false;
            this.matchValues = [];
            this.eventBus.$emit(EventNames.ComputingRun, true);
        },
        showList() {
            this.show = !this.show;
            if (this.show) {
               this.matchValues = this.resultObj.matchValues;
            } else {
               this.matchValues = [];
            }
        },
        fine(calc, obj) {
            this.start = false;
            this.run = false;
            this.finish = true;
            //console.debug(new Date());
            let bool = !this.defineJob && !this.spendResource || calc;
            if (bool) {
                this.calcStats(obj);
            }
            this.eventBus.$emit(EventNames.ComputingRun, false);
        },
        calcStats(obj) {
            window.clearInterval(this.resultObj.inter);
            let date = new Date();
            this.resultObj.date = date.toLocaleTimeString('en-GB');
            this.resultObj.jobId = this.control.getCurrentJob()._id;
            this.resultObj.matchValues = this.control.getResults();

            let n = 0;
            for (let k = 0; k < obj.keyValue.length; k++) {
                if (obj.keyValue[k].indexOf('*') > -1) {
                    n++;
                }
            }
            this.resultObj.numberAllKeys = Math.pow(obj.alpha.length, n);
            let diff = date.getTime() - this.resultObj.startTime.getTime();
            console.debug(diff);
            this.resultObj.throughput = parseInt(this.resultObj.numberAllKeys / (diff / 1000));
        },
        stop() {
            //this.fine(false, { keyValue: this.keyValue, alpha: this.hexKeys });
            this.start = false;
            this.run = false;
            this.finish = true;
            this.control.pool.stop();
            this.resultObj.date = new Date().toLocaleTimeString('en-GB');
            window.clearInterval(this.resultObj.inter);
            window.clearInterval(this.resultObj.interComKeys);
            this.eventBus.$emit(EventNames.ComputingRun, false);
            this.control.socket.send('abort', { sid: this.control.socket.id(), job: this.control.getCurrentJob() });
        },
        decrypt(obj) {
            //console.debug(obj);
            this.control.pool.manDecryptText(obj, this.setDecryptText);
        },
        setDecryptText(response) {
            console.debug(response);
            this.decryptText = response;
            this.modalToggle = true;
        }
    },
    components: {
        Popup,
        ButtonBox
    },
});
export default SocketBox;
