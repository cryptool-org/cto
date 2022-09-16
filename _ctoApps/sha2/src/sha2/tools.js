function auto_grow_textfield(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

step = -1
chunk_index = 0

function nextStep() {
    if(step < 47) {
        step = step + 1
        createAlgorithmVisualization()  
    }
}

function pastStep() {
    if(step > 0) {
        step = step - 1
        createAlgorithmVisualization()  
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playVis() {
    while(step < 47) {
        await sleep(500)
        nextStep()
    }
}

async function resetVis() {
    step = 47
    await sleep(600)
    step = -1
    createAlgorithmVisualizationInitial()

}

function nextChunk() {
    let chunk_amount = algo_info.main_algorithm.length

    if(chunk_index < chunk_amount-1) {
        chunk_index += 1
        step = -1
        vis2Step = 0
        vis2StepPrevious = -1
        innerSteps = 0

        document.getElementById("slider1").value = 0

        createAlgorithmVisualizationInitial()
        createAlgorithmVisualization2()

    }
}

function previousChunk() {
    let chunk_amount = algo_info.main_algorithm.length

    if(chunk_index > 0) {
        chunk_index -= 1
        step = -1
        vis2Step = 0
        vis2StepPrevious = -1
        innerSteps = 0

        document.getElementById("slider1").value = 0

        createAlgorithmVisualizationInitial()
        createAlgorithmVisualization2()
    }

}

function formatInteger(int) {
    if(int < 10) {
        return `<span style="color: rgb(20, 179, 20)">[0${String(int)}]</span>`
    }

    return `<span style="color: rgb(20, 179, 20)">[${String(int)}]</span>`

}


function createAlgorithmVisualizationInitial() {

    let data = ''
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="previousChunk()">&#8678;</button>'
    data += '&nbsp;&nbsp;<span style="color: rgb(20, 179, 20)">CHUNK ' + `${chunk_index+1}/${algo_info.main_algorithm.length}` + '</span>&nbsp;&nbsp;'
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="nextChunk()">&#8680;</button>'

    document.getElementById("chunk_control").innerHTML = data
    data = ''


    data += `<br><button type="button" class="btn btn-secondary" style="margin: 5px" onClick="resetVis()">${dynamic3}</button>` //HIER
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="pastStep()">&#8678;</button>'
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="nextStep()">&#8680;</button>'
    data += `<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="playVis()">${dynamic4}</button>`

    document.getElementById("step_control").innerHTML = data
    data = ''

    data += '<br><br><p>'

    for(let c = 0; c<64; c+=4) {

        data += '<span style="font-size: 13px">'
        data += `${formatInteger(c)}` + algo_info.main_algorithm[chunk_index]["chunk_preprocessed"][c] + '&nbsp;&nbsp;'
        data += `${formatInteger(c+1)}` + algo_info.main_algorithm[chunk_index]["chunk_preprocessed"][c+1] + '&nbsp;&nbsp;'
        data += `${formatInteger(c+2)}` + algo_info.main_algorithm[chunk_index]["chunk_preprocessed"][c+2] + '&nbsp;&nbsp;'
        data += `${formatInteger(c+3)}` + algo_info.main_algorithm[chunk_index]["chunk_preprocessed"][c+3] + '&nbsp;&nbsp;'
        data += '</span><br>'
    }

    data += '</p>'

    document.getElementById("algorithm_vis").innerHTML = data

}

function createAlgorithmVisualization() {
    let data = ''

    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="previousChunk()">&#8678;</button>'
    data += '&nbsp;&nbsp;<span style="color: rgb(20, 179, 20)">CHUNK ' + `${chunk_index+1}/${algo_info.main_algorithm.length}` + '</span>&nbsp;&nbsp;'
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="nextChunk()">&#8680;</button>'

    document.getElementById("chunk_control").innerHTML = data
    data = ''

    let sh1Arr = algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh1"]]
    let sh2Arr = algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh2"]]
    let add1Arr = algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add1"]]
    let add2Arr = algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add2"]]

    data += '<br><br><p>'
    data += 'A = (rotr(' + '<span style="color: blue">CHUNK</span>' + ',7)) XOR (rotr(' + '<span style="color: blue">CHUNK</span>' + ', 18)) XOR (shr(' + '<span style="color: blue">CHUNK</span>' + ',3))<br>'
    data += 'B = (rotr(' + '<span style="color: magenta">CHUNK</span>' + ',17)) XOR (rotr(' + '<span style="color: magenta">CHUNK</span>' + ', 19)) XOR (shr(' + '<span style="color: magenta">CHUNK</span>' + ',10))<br>' 
    data += `<span style="color: red">CHUNK</span> ${dynamic5} add (add (add (<span style="color: orange">1.CHUNK</span>, A), <span style="color: orange"> 2.CHUNK</span>), B)`
    data += '</p>'

    data += '<p>'
    for(let c = 0; c<64; c+=4) {

        data += '<span style="font-size: 13px">'

        if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh1"] == c) {

            data += `${formatInteger(c)}` + '<span style="color: blue">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh2"] == c) {

            data += `${formatInteger(c)}` + '<span style="color: magenta">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_y"] == c) {

            data += `${formatInteger(c)}` + '<span style="color: red">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add1"] == c) {

            data += `${formatInteger(c)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add2"] == c) {

            data += `${formatInteger(c)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;</span>'

        }else {
            data += `${formatInteger(c)}` + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c] + '&nbsp;&nbsp;'
        }

        if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh1"] == c+1) {

            data += `${formatInteger(c+1)}` + '<span style="color: blue">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh2"] == c+1) {

            data += `${formatInteger(c+1)}` + '<span style="color: magenta">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_y"] == c+1) {

            data += `${formatInteger(c+1)}` + '<span style="color: red">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add1"] == c+1) {

            data += `${formatInteger(c+1)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add2"] == c+1) {

            data += `${formatInteger(c+1)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;</span>'

        }else {
            data += `${formatInteger(c+1)}` + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+1] + '&nbsp;&nbsp;'
        }

        if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh1"] == c+2) {

            data += `${formatInteger(c+2)}` + '<span style="color: blue">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh2"] == c+2) {

            data += `${formatInteger(c+2)}` + '<span style="color: magenta">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_y"] == c+2) {

            data += `${formatInteger(c+2)}` + '<span style="color: red">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add1"] == c+2) {

            data += `${formatInteger(c+2)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add2"] == c+2) {

            data += `${formatInteger(c+2)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;</span>'

        }else {
            data += `${formatInteger(c+2)}` + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+2] + '&nbsp;&nbsp;'
        }

        if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh1"] == c+3) {

            data += `${formatInteger(c+3)}` + '<span style="color: blue">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_sh2"] == c+3) {

            data += `${formatInteger(c+3)}` + '<span style="color: magenta">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_y"] == c+3) {

            data += `${formatInteger(c+3)}` + '<span style="color: red">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add1"] == c+3) {

            data += `${formatInteger(c+3)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;</span>'

        }else if(algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_add2"] == c+3) {

            data += `${formatInteger(c+3)}` + '<span style="color: orange">' + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;</span>'

        }else {
            data += `${formatInteger(c+3)}` + algo_info.main_algorithm[chunk_index]["loop1"][step]["lp1_w"][c+3] + '&nbsp;&nbsp;'
        }

        data += '</span><br>'

    }

    data += '</p>'
    document.getElementById("algorithm_vis").innerHTML = data

}



vis2Step = 0
vis2StepPrevious = -1
innerSteps = 0

function vis2nextStep() {


    if(vis2Step < 64) {
        if(innerSteps < 2) {
            innerSteps += 1
            createAlgorithmVisualization2()
        }else {
            if(vis2Step+1 != 64) {
                vis2Step += 1
                vis2StepPrevious += 1
                innerSteps = 0
                document.getElementById("slider1").value = vis2Step
                createAlgorithmVisualization2()
            }
        }
    }
}

function vis2pastStep() {

    if(vis2Step == 0 && innerSteps > 0) {
        innerSteps -= 1
        createAlgorithmVisualization2()
    }else {

        if(vis2Step != 0)

            switch(innerSteps) {
                case 0:
                    vis2Step -= 1
                    vis2StepPrevious -= 1
                    innerSteps = 2
                    document.getElementById("slider1").value = vis2Step
                    createAlgorithmVisualization2()
                    break;
                
                case 1:
                    innerSteps = 0
                    createAlgorithmVisualization2()
                    break;

                case 2:
                    innerSteps = 1
                    createAlgorithmVisualization2()
                    break;
            }
        }
    }

function spawnRange() {
    chunk_index = 0
    vis2Step = 0
    vis2StepPrevious = -1
    innerSteps = 0

    let data = ''

    data += '<input type="range" class="form-range" value="0" min="0" max="63" id="slider1">'
    document.getElementById("step2_control").innerHTML = data

    document.getElementById("slider1").addEventListener('mouseup', function() {
        vis2Step = parseInt(this.value)
        vis2StepPrevious = parseInt((this.value)-1)
        innerSteps = 0
        createAlgorithmVisualization2()
    });
}

function createAlgorithmVisualization2() {
    let data = ''

    let previousConstants = undefined

    if(vis2StepPrevious != -1) {
        previousConstants = algo_info.main_algorithm[chunk_index]["loop2"][vis2StepPrevious]["loop2_constants"]
    }else {
        previousConstants = algo_info.main_algorithm[chunk_index]["preConstants"]
    }

    let currentConstants = algo_info.main_algorithm[chunk_index]["loop2"][vis2Step]["loop2_constants"]

    let constKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    data += `<span style="color: rgb(20, 179, 20)">${vis2Step+1} / 64<span><br><br>`

    document.getElementById("step2_control_label").innerHTML = data
    data = ''

    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="vis2pastStep()">&#8678;</button>'
    data += '<button type="button" class="btn btn-secondary" style="margin: 5px" onClick="vis2nextStep()">&#8680;</button>'

    switch(innerSteps) {
        case 0:

            data += '<br><p>'
            data += `${dynamic6}<br>`
            data += `${dynamic7}`
            data += '</p>'

            data += '<br><table>'

            data += `<tr><td><span style="color: rgb(10, 179, 20)">${dynamic8}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic9}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic10}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[0]}</span></td><td><span style="color: blue">${previousConstants[0]}</span></td><td></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[1]}</span></td><td><span style="color: blue">${previousConstants[1]}</span></td><td><span style="color: blue">${previousConstants[0]}</span></td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[2]}</span></td><td><span style="color: blue">${previousConstants[2]}</span></td><td><span style="color: blue">${previousConstants[1]}</span></td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[3]}</span></td><td>${previousConstants[3]}</td><td><span style="color: blue">${previousConstants[2]}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[4]}</span></td><td><span style="color: yellow">${previousConstants[4]}</span></td><td></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[5]}</span></td><td><span style="color: yellow">${previousConstants[5]}</span></td><td><span style="color: yellow">${previousConstants[4]}</span></td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[6]}</span></td><td><span style="color: yellow">${previousConstants[6]}</span></td><td><span style="color: yellow">${previousConstants[5]}</span></td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[7]}</span></td><td>${previousConstants[7]}</td><td><span style="color: yellow">${previousConstants[6]}</span></td></tr>`
            data += '</table>'

            document.getElementById("algorithm_vis2").innerHTML = data

            break;

        case 1:

            data += '<br><p>'
            data += `<span style="color: blue">S1</span> = XOR(&nbsp;&nbsp;rotr(<span style="color: rgb(20, 179, 20)">e</span>,&nbsp;&nbsp; 6),&nbsp;&nbsp; rotr(<span style="color: rgb(20, 179, 20)">e</span>,&nbsp;&nbsp; 11),&nbsp;&nbsp; rotr(<span style="color: rgb(20, 179, 20)">e</span>,&nbsp;&nbsp; 25)&nbsp;&nbsp;) <span style="font-size: 15px">||</span> `
            data += '<span style="color: yellow">ch</span> = XOR(&nbsp;&nbsp;AND(<span style="color: rgb(20, 179, 20)">e</span>,&nbsp;&nbsp; <span style="color: rgb(20, 179, 20)">f</span>),&nbsp;&nbsp; AND(&nbsp;&nbsp;NOT(<span style="color: rgb(20, 179, 20)">e</span>),&nbsp;&nbsp; <span style="color: rgb(20, 179, 20)">g</span>)&nbsp;&nbsp;) <span style="font-size: 15px">||</span> '
            data += `<span style="color: red">temp1</span> = add(&nbsp;&nbsp;add(&nbsp;&nbsp;add(<span style="color: rgb(20, 179, 20)">h</span>,&nbsp;&nbsp; <span style="color: blue">S1</span>),&nbsp;&nbsp; <span style="color: yellow">ch</span>),&nbsp;&nbsp; k[${vis2Step}]),&nbsp;&nbsp; w[${vis2Step}]&nbsp;&nbsp;)<br>`
            data += `k[${vis2Step}] ${dynamic22} ${vis2Step+1}. ${dynamic23} `
            data += `w[${vis2Step}] ${dynamic22} ${vis2Step+1}. ${dynamic24} ${chunk_index+1}. Chunks (${dynamic25})`
            data += '</p>'


            data += '<br><table>'

            data += `<tr><td><span style="color: rgb(10, 179, 20)">${dynamic8}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic9}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic10}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[0]}</span></td><td>${previousConstants[0]}</td><td><span style="color: red">${currentConstants[0]}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[1]}</span></td><td>${previousConstants[1]}</td><td>${previousConstants[0]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[2]}</span></td><td>${previousConstants[2]}</td><td>${previousConstants[1]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[3]}</span></td><td>${previousConstants[3]}</td><td>${previousConstants[2]}</td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[4]}</span></td><td>${previousConstants[4]}</td><td></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[5]}</span></td><td>${previousConstants[5]}</td><td>${previousConstants[4]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[6]}</span></td><td>${previousConstants[6]}</td><td>${previousConstants[5]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[7]}</span></td><td>${previousConstants[7]}</td><td>${previousConstants[6]}</td></tr>`
            data += '</table>'

            document.getElementById("algorithm_vis2").innerHTML = data

            break;


        case 2:

            data += '<br><br><p>'
            data += '<span style="color: blue">S0</span> = XOR(&nbsp;&nbsp;rotr(<span style="color: rgb(20, 179, 20)">a</span>,&nbsp;&nbsp; 2),&nbsp;&nbsp; rotr(<span style="color: rgb(20, 179, 20)">a</span>,&nbsp;&nbsp; 13), rotr(<span style="color: rgb(20, 179, 20)">a</span>,&nbsp;&nbsp; 22)&nbsp;&nbsp;) <span style="font-size: 15px">||</span> '
            data += '<span style="color: yellow">m</span> = XOR(&nbsp;&nbsp;AND(<span style="color: rgb(20, 179, 20)">a</span>,&nbsp;&nbsp; <span style="color: rgb(20, 179, 20)">b</span>),&nbsp;&nbsp; AND(<span style="color: rgb(20, 179, 20)">a</span>,&nbsp;&nbsp; <span style="color: rgb(20, 179, 20)">c</span>),&nbsp;&nbsp; AND(<span style="color: rgb(20, 179, 20)">b</span>,&nbsp;&nbsp; <span style="color: rgb(20, 179, 20)">c</span>)&nbsp;&nbsp;) <span style="font-size: 15px">||</span> '
            data += '<span style="color: red">temp2</span> = add(&nbsp;&nbsp;<span style="color: blue">S0</span>,&nbsp;&nbsp; <span style="color: yellow">m</span>&nbsp;&nbsp;)'
            data += '</p>'



            data += '<br><table>'

            data += `<tr><td><span style="color: rgb(10, 179, 20)">${dynamic8}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic9}</span></td><td><span style="color: rgb(20, 179, 20)">${dynamic10}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[0]}</span></td><td>${previousConstants[0]}</td><td>${currentConstants[0]}</td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[1]}</span></td><td>${previousConstants[1]}</td><td>${previousConstants[0]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[2]}</span></td><td>${previousConstants[2]}</td><td>${previousConstants[1]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[3]}</span></td><td>${previousConstants[3]}</td><td>${previousConstants[2]}</td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[4]}</span></td><td>${previousConstants[4]}</td><td><span style="color: red">${currentConstants[4]}</span></td></tr>`

            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[5]}</span></td><td>${previousConstants[5]}</td><td>${previousConstants[4]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[6]}</span></td><td>${previousConstants[6]}</td><td>${previousConstants[5]}</td></tr>`
            data += `<tr><td><span style="color: rgb(20, 179, 20)">${constKeys[7]}</span></td><td>${previousConstants[7]}</td><td>${previousConstants[6]}</td></tr>`
            data += '</table>'

            document.getElementById("algorithm_vis2").innerHTML = data

            break;

    }

    if(vis2Step == 63 && innerSteps == 2) {
        finalConstantAdditionToHash()
    }else {
        document.getElementById("algorithm_vis2_final").innerHTML = ''
    }

}

function greenify(html) {
    return `<span style="color: rgb(20, 179, 20)">${html}</span>`
}

function chunker(bits, chunk_length=8) {

    let chunked = Array()

    for (let i = 0; i < bits.length; i += chunk_length) {
        let chunk = bits.slice(i, i + chunk_length);
        chunked.push(chunk)
    }

    return chunked
}


function finalConstantAdditionToHash() {

    if(chunk_index == (algo_info.main_algorithm.length)-1) {

        let const_keys = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']

        let data = ''

        data += '<br><p>'
        data += `<br>${dynamic11}<br>${dynamic12}`
        data += `${dynamic13}`
        data += `${dynamic14}`
        data += `<br>${greenify(dynamic15)} = add( ${greenify(dynamic16)}, ${greenify(dynamic17)} )</p>`

        data += '<table>'
        data += `<tr><td>${greenify(dynamic8)}</td><td>${greenify(dynamic16)}</td><td>${greenify(dynamic17)}</td><td>${greenify(dynamic15)}</td></tr>`
        
        for(let c = 0; c<8; c++) {
            data += '<tr>' + `<td><span style="color: rgb(20, 179, 20)">${const_keys[c]}</span></td>` + `<td>${algo_info.main_algorithm[chunk_index]["old_constants"][c]}</td>` + `<td>${algo_info.main_algorithm[chunk_index]["loop2"][63]["loop2_constants"][c]}</td>` + `<td>${algo_info.main_algorithm[chunk_index]["new_constants"][c]}</td>` + '</tr>'
        }

        data += '</table>'

        data += `<br><p>${dynamic18}<br>`

        data += '<table>'
        data += `<tr><td>${greenify(dynamic15)}</td><td>${greenify(dynamic19)}</td></tr>`

        let hash_digest = chunker(algo_info.hash_digest, 8)

        for(let c = 0; c<8; c++) {
            data += `<tr><td>${algo_info.main_algorithm[chunk_index]["new_constants"][c]}</td><td>${hash_digest[c]}</td></tr>`
        }

        data += '</table>'

        data += `<br><p>${dynamic20} ${greenify(algo_info.hash_digest)}</p>`


        document.getElementById("algorithm_vis2_final").innerHTML = data

    }else {

        let const_keys = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']

        let data = ''

        data += '<br><p>'
        data += `<br>${dynamic11}<br>Die berechneten Konstanten sind in der unteren Tabelle (3. Spalte) nochmals zu sehen. `
        data += `${dynamic12} `
        data += `<br>${greenify(dynamic15)} = add( ${greenify(dynamic16)}, ${greenify(dynamic21)} )</p>`

        data += '<table>'
        data += `<tr><td>${greenify(dynamic8)}</td><td>${greenify(dynamic16)}</td><td>${greenify(dynamic17)}</td><td>${greenify(dynamic15)}</td></tr>`
        
        for(let c = 0; c<8; c++) {
            data += '<tr>' + `<td><span style="color: rgb(20, 179, 20)">${const_keys[c]}</span></td>` + `<td>${algo_info.main_algorithm[chunk_index]["old_constants"][c]}</td>` + `<td>${algo_info.main_algorithm[chunk_index]["loop2"][63]["loop2_constants"][c]}</td>` + `<td>${algo_info.main_algorithm[chunk_index]["new_constants"][c]}</td>` + '</tr>'
        }

        data += '</table>'

        document.getElementById("algorithm_vis2_final").innerHTML = data

    }

} 