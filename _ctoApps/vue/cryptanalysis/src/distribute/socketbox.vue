<template>
    <div id='socketBox'>
        <!--popup></popup>
        <div><input @click='toggle = !toggle' type='button' id='msg' value='Socket messages' ></div-->

        <div v-show="defineJob" id="distributeJob" class="select">
            <h4>{{ $t('defineJob') }}</h4>
            <div class="input has-feedback">
                <label for="job">{{ $t('jobName') }}:</label>
                <div>
                <input name='job' class="form-control" :class="clazz" type='text' id='job' size="32" v-model="jobName" placeholder='Give the job a name (required)'/>
                <span v-show="jobLength" class="glyphicon glyphicon-ok form-control-feedback"></span>
                <span v-show="!jobLength" class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
                </div>
            </div>
            <div class="drop">
                <div>
                    <label for='bindRoom'>{{ $t('bindRoom') }}:</label>
                    <select id='bindRoom' v-model='selectRoom'>
                        <option value="/none">/none</option>
                        <option v-for='room in socketRooms' :value='room.name'>{{room.name}} ({{room.status}})</option>
                    </select>
                </div>
                <div>
                    <label for='computeLength'>{{ $t('lenDecryption') }}:</label>
                    <select id='computeLength' v-model='selectCompLen'>
                        <option v-for='clen in computeLengths' :value='clen'>{{clen}}</option>
                    </select>
                </div>
                <div>
                    <label for='mode'>{{ $t('mode') }}:</label>
                    <select id='mode' v-model='mode'>
                        <option>ECB</option>
                        <option>CBC</option>
                    </select>
                </div>
            </div>
            <input class="btn btn-lg" :disabled="!isFilled" @click='createJob()' type='button' id='createJob' :value="$t('buttonCreate')" >
        </div>

        <div v-show="spendResource || defineJob" class="socket">
            <div class="flexCon" v-show="!defineJob">
                <div class="input-group">
                    <input id='socketJobs' type="radio" value='socketJobs' name="optradio" v-model="socketType">
                    <label for='socketJobs' class='radio'>{{ $t('chooseJob') }}:
                        <label>
                        <select v-model='selectJob' :disabled="socketType != 'socketJobs'">
                            <option value="/none">/none</option>
                            <option v-for='room in socketRooms' :value='room.name' v-if="room.jobName">{{room.jobName}} ({{room.status}})</option>
                        </select>
                        </label>
                    </label>
                    <input id='socketRooms' type="radio" value='socketRooms' name="optradio" v-model="socketType">
                    <label for='socketRooms' class='radio'>{{ $t('chooseRoom') }}:
                        <label>
                        <select v-model='selectRoom' :disabled="socketType != 'socketRooms'">
                            <option value="/none">/none</option>
                            <option v-for='room in socketRooms' :value='room.name'>{{room.name}} ({{room.status}})</option>
                        </select>
                        </label>
                    </label>
                </div>
            </div>
            <div>
                <span class='clients'>{{ $t('connectClients') }}:
                    <span id='connectClients'></span>
                </span>
            </div>
            <div class="msg">
                <div v-show="true" id='messages' class='msgcontent'><h4>{{ $t('msgSocket') }}</h4></div>
            </div>
        </div>

        <buttonbox></buttonbox>

        <div class="flex">
            <div class='select'>
                <p v-show="!spendResource && !defineJob">
                    <label for='mode'>{{ $t('mode') }}:</label>
                    <select id='mode' v-model='mode'>
                        <option>ECB</option>
                        <option>CBC</option>
                    </select>
                </p>
                <p v-show="!spendResource && !defineJob">
                    <label for='computeLength'>{{ $t('lenDecryption') }}:</label>
                    <select id='computeLength' v-model='selectCompLen'>
                        <option v-for='clen in computeLengths' :value='clen'>{{clen}}</option>
                    </select>
                </p>
                <p>
                    <label for='countWorker'>{{ $t('countWorker') }}:</label>
                    <select id='countWorker' v-model='selectWorker' :disabled="run">
                        <option v-for='number in numberWorkers' :value='number'>{{number}}</option>
                    </select>
                </p>
            </div>
            <div class='info'>
                <div>
                    <b>{{ $t('jobLocal') }}</b>
                    <div class='keys'>{{ $t('computedKeys') }}:&nbsp;<label id='numberOfKeys'>{{resultObj.numberOfComKeys}} / {{resultObj.numberOfKeys}}</label></div>
                    <!--div>Start time:<label class='time'> {{startDate}}</label></div>
                    <div v-show="run">Elapsed time:<label class='time'> {{date}}</label></div>
                    <div v-show="!run">End time:<label class='time'> {{date}}</label></div-->
                </div>
                <!--div>End:<label class='time'> {{endDate}}</label></div-->
                <div>
                    <b>{{ $t('jobOverall') }}</b>
                    <div class='keys'>{{ $t('computedKeys') }}:&nbsp;<label>{{resultObj.numberAllKeys}}</label></div>
                    <div class='keys'>{{ $t('throughput') }}:&nbsp;<label>{{resultObj.throughput}}</label></div>
                    <div>{{ $t('timeStart') }}:&nbsp;<label class='time'>{{resultObj.startDate}}</label></div>
                    <div v-show="run">{{ $t('timeElapse') }}:&nbsp;<label class='time'>{{resultObj.elapTime}}</label></div>
                    <div v-show="!run">{{ $t('timeEnd') }}:&nbsp;<label class='time'>{{resultObj.date}}</label></div>
                </div>
            </div>
            <input class="btn btn-lg" :disabled="!run" @click='stop' type='button' id='stop' :value="$t('buttonStop')" >
            <input v-show="!show" class="btn btn-lg" :disabled="!finish" @click='showList' type='button' id='best' :value="$t('buttonListShow')" >
            <input v-show="show" class="btn btn-lg" :disabled="!finish" @click='showList' type='button' id='best' :value="$t('buttonListHide')" >
        </div>
        <div class='socketFilter'>
            <!--div id='messages'><h4>Socket messages</h4></div-->
            <div><h4>{{ $t('results') }}:</h4>
                <input type='search' autocomplete="off" name='search' v-model='searchValues' id='search' :placeholder="$t('searchBy')">
            </div>
        </div>

        <!-- The Modal -->
        <div v-show="modalToggle" id="ctoModal" class="ctoModal">
            <div class="ctoModalContent">
                <span @click="modalToggle = !modalToggle" class="close">&times;</span>
                <h4>{{ $t('decryptText') }}</h4>
                <p>{{decryptText}}</p>
            </div>
        </div>
        <!--div id="modal" class="modal fade">
            <div class="modal-dialog">
            <div class="modal-content">
                <span @click="modalToggle = !modalToggle" class="close">&times;</span>
                <h4>{{ $t('decryptText') }}</h4>
                <p>{{decryptText}}</p>
            </div>
            </div>
        </div-->

        <div id='results'>
            <ol id='result'>
                <li v-for="obj of matchValues">
                    <b>{{obj.key}}:</b><span>{{obj.calc}}</span><br/>
                    {{obj.otxt}}
                    <input @click='decrypt(obj)' type='button' id='dec' :value="$t('buttonDecrypt')" >
                </li>
            </ol>
        </div>
    </div>
</template>
<style src="./messages.css"></style>
<style src="./modal.css"></style>
<style src="./socketbox.css"></style>
<script src="./socketbox.js"></script>
