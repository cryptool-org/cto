
import { get_rand_key, insert_number_automatic, phi_function, check_coprime } from "../utilities/rsaHelperFunctions.js"

const start_string = '<i class="fa fa-play" aria-hidden="true"></i>&nbsp;${{rsa.VISUAL-AUTOMATIC-RUN}}$'
const continue_string = '<i class="fa fa-play" aria-hidden="true"></i>&nbsp;${{rsa.VISUAL-CONTINUE}}$'
const pause_string = '<i class="fa fa-pause" aria-hidden="true"></i>&nbspPause'
let alert_vis_key_gen_id
let reset_and_overwrite_warning
let reset_warning
/**
 * 
 */
$(function () {

    $('[data-toggle="tooltip"]').tooltip()
    init_boards_and_elements()
    $('button[data-toggle="popover"]').popover()
    visualization_controller("start", "two-lines")
    visualization_controller("start", "circle")
});

/**
 * 
 * 
 */
$(window).resize(() => {
    if (window_resize_tab == "false") {
        if (active_tab == "circle-tab") {
            resizeThrottler(circle_board, $("#jxgbox").parent().width(), $("#jxgbox").parent().height())
        } else if (active_tab == "two-lines-tab") {
            resizeThrottler(two_lines_board, $("#jxg2line").parent().width(), $("#jxg2line").parent().height())
        }
    }
})
/***
 * 
 */
function resizeThrottler(board, width, height) {
    board.resizeContainer(width, height)
}


let line_width = $("#jxg2line").parent().width()
let line_height = $("#jxg2line").parent().height()
let circle_width = $("#jxg2line").parent().width()
let circle_height = $("#jxg2line").parent().height()
let active_tab = "two-lines-tab"
$('#visualization-list a').on('click', function (e) {
    e.preventDefault()
    active_tab = $(this).attr("aria-controls")

    if (active_tab == "circle-tab") {

        line_width = $("#jxg2line").parent().width()
        line_height = $("#jxg2line").parent().height()
    } else if (active_tab == "two-lines-tab") {
        circle_width = $("#jxgbox").parent().width()
        circle_height = $("#jxgbox").parent().height()
    }
    $(this).tab('show')

    if (active_tab == "circle-tab") {
        $("#jxgbox").css("width", "100%")
        circle_width = $("#jxgbox").parent().width()
        circle_height = $("#jxgbox").parent().height()

        resizeThrottler(circle_board, circle_width, circle_height)
    } else if (active_tab == "two-lines-tab") {
        line_width = $("#jxg2line").parent().width()
        line_height = $("#jxg2line").parent().height()
        resizeThrottler(two_lines_board, line_width, line_height)
    }



})
var window_resize_tab = "false"
// ENABLE SWITCHING TABS
var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)
    triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
        window_resize_tab = this.getAttribute("resize-value")
        if (window_resize_tab == "false") {
            if (active_tab == "circle-tab") {
                resizeThrottler(circle_board, $("#jxgbox").parent().width(), $("#jxgbox").parent().height())
            } else if (active_tab == "two-lines-tab") {
                resizeThrottler(two_lines_board, $("#jxg2line").parent().width(), $("#jxg2line").parent().height())
            }
        }
    })

})
/**
 * INITIILAIZE THE BORADS AND THE ELEMENTS
 * 
 */
function init_boards_and_elements() {
    $("#visualization-card button").prop("disabled", true)
    // TWO Lines
    two_lines_board = JXG.JSXGraph.initBoard('jxg2line', { keepaspectratio: false, axis: false, boundingbox: [-100, 100, 100, -100], showcopyright: false });
    line_one_element = two_lines_board.create('segment', [[-95.0, 70.0], [95.0, 70.0]], { highlight: false, fixed: true, name: "up", strokeColor: 'black', });
    line_two_element = two_lines_board.create('segment', [[-95.0, -50.0], [95.0, -50.0]], { highlight: false, fixed: true, name: "down", strokeColor: 'black', });
    two_lines_board.create('legend', [-97, -85], { labels: ["${{rsa.VISUAL-FIXPOINTS}}$", "${{rsa.VISUAL-NORMAL-ASSIGMENT}}$"], colors: ["red", "green"], strokeWidth: 5 });
    // CIRCLE
    circle_board = JXG.JSXGraph.initBoard('jxgbox', { keepaspectratio: false, axis: false, boundingbox: [-5, 5, 5, -5], showcopyright: false });
    // creat circle
    let temp_point = circle_board.create('point', [0.0, 0.0], { strokeColor: "none", color: "none", name: "" })
    circ = circle_board.create('circle', [temp_point, 4.0], { highlight: false, fixed: true, strokeColor: 'black' });
    // create a curve -> tickles cant be created in circles
    ticks = circle_board.create('curve', [[0], [0]],
        {
            fixed: true,
            strokeWidth: 1,
            strokeColor: 'black',
            strokeOpacity: 0.5,
            highlight: false,
            hasLabel: true,

        });
    two_lines_board.create('text', [-97, 90, "${{rsa.VISUAL-PLAINTEXT}}$ m"], { fontSize: 15, fixed: true, });
    two_lines_board.create('text', [-97, -70, "${{rsa.VISUAL-CIPHERTEXT}}$ c"], { fontSize: 15, fixed: true, });
    // default
    create_circle(0)
    // default
    create_points_on_line(line_one_element, 0, two_lines_board)
    create_points_on_line(line_two_element, 0, two_lines_board)
}


// GLOBAL VARIABLES

let circle_board, circ, ticks, valid_key_for_take_over
let two_lines_board, line_one_element, line_two_element

/**
 * 
 * @param {*} input_value 
 */
function take_over_key_pair_for_visualization(input_value) {

    let key = valid_key_for_take_over
    switch (input_value) {
        case "two-lines":
            two_lines_information.n = key["n"]
            two_lines_information.e = key["e"]
            two_lines_information.d = key["d"]
            switch_de_encrypt_modus("two-lines")
            // ENABLE ALL BUTTONS IN Two-lines CARD EXCEPT THE PREVIOUS BT
            $("#visualization-card #two-lines-tab button").not('#previous-step-arrow-two-line-button').prop("disabled", false)
            break
        case "circle":
            circle_information.n = key["n"]
            circle_information.e = key["e"]
            circle_information.d = key["d"]
            switch_de_encrypt_modus("circle")
            // ENABLE ALL BUTTONS IN circle CARD EXCEPT THE PREVIOUS BT
            $("#visualization-card #circle-tab button").not('#previous-step-arrow-circle-button').prop("disabled", false)
            break
        default:
            two_lines_information.n = key["n"]
            two_lines_information.e = key["e"]
            two_lines_information.d = key["d"]
            switch_de_encrypt_modus("two-lines")
            $("#visualization-card #two-lines-tab button").not('#previous-step-arrow-two-line-button').prop("disabled", false)
            circle_information.n = key["n"]
            circle_information.e = key["e"]
            circle_information.d = key["d"]
            switch_de_encrypt_modus("circle")
            $("#visualization-card #circle-tab button").not('#previous-step-arrow-circle-button').prop("disabled", false)
    }
}

/**
 * 
 * @param {*} input_value 
 */
function delete_key_pair_for_visualization(input_value) {
    valid_key_for_take_over = null
    switch (input_value) {
        case "two-lines":
            two_lines_information.n = null
            two_lines_information.e = null
            two_lines_information.d = null

            switch_de_encrypt_modus("two-lines")
            // ENABLE ALL BUTTONS IN Two-lines CARD EXCEPT THE PREVIOUS BT
            $("#visualization-card #two-lines-tab button").prop("disabled", true)
            break
        case "circle":
            circle_information.n = null
            circle_information.e = null
            circle_information.d = null

            switch_de_encrypt_modus("circle")
            // ENABLE ALL BUTTONS IN circle CARD EXCEPT THE PREVIOUS BT
            $("#visualization-card #circle-tab button").prop("disabled", true)
            break

    }
    switch_de_encrypt_modus("reset-both")
}
/**
 * 
 * @param {*} input_el 
 * @returns 
 */
const visualization_param_input_handler = async (input_el = undefined) => {
    $("#rsa-input .alert").attr("hidden", "true");

    // possible input_el : undefined or p-[input] or q-[input] or lcm[button]

    // INPUTS //
    const p = bigInt($("#p-number-input").val())
    const q = bigInt($("#q-number-input").val())
    const phi = bigInt($("#phi-number-input").val())
    const lcm = bigInt($("#lcm-number-input").val())
    const n = bigInt($("#n-number-input").val())
    const e = bigInt($("#e-number-input").val())
    const d = bigInt($("#d-number-input").val())
    // TEST //
    const lcm_right = bigInt.lcm(p.minus(1), q.minus(1))
    const n_right = bigInt(p).multiply(bigInt(q))
    const phi_right = phi_function(p, q)
    const e_phi_coprime = check_coprime(e, phi)
    const e_lcm_coprime = check_coprime(e, lcm)
    const lcm_hidden = $("#lcm-number-input").attr("hidden")// TRUE -> HIDDEN
    // 
    let valid_lcm_phi_n = true
    let valid_p_q = true
    let valid_e_d = true
    let input_id = ""

    if (input_el != undefined) {
        input_id = input_el.id.split("-")[0]
    }

    //CHECK IF INPUT THERE
    if ($("#p-number-input").val() != "") {
        if (input_id == "p") {
            if (!p.isPrime() || p.lesserOrEquals(0)) {
                valid_p_q = false
                $("#p-number-input").removeClass("is-valid")
                $("#p-number-input").addClass("is-invalid")
                $("#p-is-not-prime-alert").attr("hidden", false);
            } else if (p.equals(q) && $("#q-number-input").val() !== "") {
                valid_p_q = false
                $("#p-number-input").removeClass("is-valid")
                $("#p-number-input").addClass("is-invalid")
                $("#p-is-equal-q-alert").attr("hidden", false)
            }
            else if (p.isPrime()) {
                $("#p-number-input").addClass("is-valid")
                $("#p-number-input").removeClass("is-invalid")
                $("#p-is-prime-alert").attr("hidden", false);
            }

        }
        else if (p.isPrime() && !p.lesserOrEquals(0)) {
            $("#p-number-input").addClass("is-valid")
            $("#p-number-input").removeClass("is-invalid")
        } else {
            $("#p-number-input").removeClass("is-valid")
            $("#p-number-input").addClass("is-invalid")
            valid_p_q = false
        }
    } else {
        $("#phi-n-number-input input").prop("disabled", true)
        // $("#e-d-number-input input").prop("disabled", true)
        $("#p-number-input").removeClass("is-valid")
        $("#p-number-input").removeClass("is-invalid")
        valid_p_q = false
    }
    //CHECK IF INPUT THERE
    if ($("#q-number-input").val() != "") {
        if (input_id == "q") {
            if (!q.isPrime() || q.lesserOrEquals(0)) {
                valid_p_q = false
                $("#q-number-input").removeClass("is-valid")
                $("#q-is-not-prime-alert").attr("hidden", false);
                $("#q-number-input").addClass("is-invalid")
            }
            else if (q.equals(p) && $("#p-number-input").val() !== "") {
                valid_p_q = false
                $("#q-number-input").removeClass("is-valid")
                $("#q-number-input").addClass("is-invalid")
                $("#q-is-equal-p-alert").attr("hidden", false)
            }
            else if (q.isPrime()) {
                $("#q-number-input").addClass("is-valid")
                $("#q-number-input").removeClass("is-invalid")
                $("#q-is-prime-alert").attr("hidden", false);
            }
        } else if (q.isPrime() && !q.lesserOrEquals(0)) {
            $("#q-number-input").addClass("is-valid")
            $("#q-number-input").removeClass("is-invalid")
        } else {
            valid_p_q = false
            $("#q-number-input").removeClass("is-valid")
            $("#q-number-input").addClass("is-invalid")
        }
    } else {
        $("#phi-n-number-input input").prop("disabled", true)
        $("#q-number-input").removeClass("is-valid")
        $("#q-number-input").removeClass("is-invalid")
        valid_p_q = false
    }
    if (valid_p_q) {
        $("#phi-n-number-input input").prop("disabled", false)
        $(".insert-number-automatic[name='phi']").prop("disabled", false)
        $(".insert-number-automatic[name='n']").prop("disabled", false)
        $(".insert-number-automatic[name='lcm']").prop("disabled", false)
    } else {
        $("#phi-n-number-input input").prop("disabled", true)
        $("#e-d-number-input input").prop("disabled", true)
        $(".insert-number-automatic[name='phi']").prop("disabled", true)
        $(".insert-number-automatic[name='n']").prop("disabled", true)
        $(".insert-number-automatic[name='lcm']").prop("disabled", true)
    }
    // TEST N, PHI AND LCM
    if (!$("#phi-number-input").prop("disabled") && valid_p_q) {
        if (lcm_hidden) {
            // PHI
            if ($("#phi-number-input").val() != "") {
                if (input_id == "phi") {
                    if (phi.equals(phi_right)) {
                        $("#phi-number-input").addClass("is-valid")
                        $("#phi-number-input").removeClass("is-invalid")
                        $("#phi-is-coprime").attr("hidden", false);
                    } else {
                        valid_lcm_phi_n = false
                        $("#phi-number-input").removeClass("is-valid")
                        $("#phi-number-input").addClass("is-invalid")
                        $("#phi-is-not-coprime").attr("hidden", false);
                    }
                } else if (phi.equals(phi_right)) {
                    $("#phi-number-input").addClass("is-valid")
                    $("#phi-number-input").removeClass("is-invalid")
                } else {
                    valid_lcm_phi_n = false
                    $("#phi-number-input").removeClass("is-valid")
                    $("#phi-number-input").addClass("is-invalid")
                }
            }
            else {
                valid_lcm_phi_n = false
                $("#phi-number-input").removeClass("is-valid")
                $("#phi-number-input").removeClass("is-invalid")
            }
        } else {
            //LCM
            if ($("#lcm-number-input").val() != "") {
                if (input_id == "lcm") {
                    if (lcm.equals(lcm_right)) {
                        $("#lcm-number-input").addClass("is-valid")
                        $("#lcm-is-coprime").attr("hidden", false);
                        $("#lcm-is-coprime").removeClass("is-invalid")
                    } else {
                        valid_lcm_phi_n = false
                        $("#lcm-number-input").removeClass("is-valid")
                        $("#lcm-is-not-coprime").attr("hidden", false);
                        $("#lcm-is-not-coprime").addClass("is-invalid")
                    }
                } else if (lcm.equals(lcm_right)) {
                    $("#lcm-number-input").addClass("is-valid")
                    $("#lcm-number-input").removeClass("is-invalid")
                } else {
                    valid_lcm_phi_n = false
                    $("#lcm-number-input").removeClass("is-valid")
                    $("#lcm-number-input").addClass("is-invalid")
                }
            }
            else {
                valid_lcm_phi_n = false
                $("#lcm-number-input").removeClass("is-valid")
                $("#lcm-is-coprime").removeClass("is-invalid")
            }
        }
        // N
        if ($("#n-number-input").val() != "") {
            if (input_id == "n") {
                if (n.equals(n_right)) {
                    $("#n-number-input").addClass("is-valid")
                    $("#n-is-correct").attr("hidden", false);
                    $("#n-number-input").removeClass("is-invalid")
                } else {
                    valid_lcm_phi_n = false
                    $("#n-number-input").removeClass("is-valid")
                    $("#n-is-not-correct").attr("hidden", false);
                    $("#n-number-input").addClass("is-invalid")
                }
            } else if (n.equals(n_right)) {
                $("#n-number-input").addClass("is-valid")
                $("#n-number-input").removeClass("is-invalid")
            } else {
                valid_lcm_phi_n = false
                $("#n-number-input").removeClass("is-valid")
                $("#n-number-input").addClass("is-invalid")
            }
        }
        else {
            valid_lcm_phi_n = false
            $("#n-number-input").removeClass("is-valid")
            $("#n-is-coprime").removeClass("is-invalid")
        }
    } else {
        valid_lcm_phi_n = false
        $("#phi-n-number-input input").removeClass("is-valid")
        $("#phi-n-number-input input").removeClass("is-invalid")
    } if (valid_lcm_phi_n && valid_p_q) {
        $("#e-d-number-input input").prop("disabled", false)
        $(".insert-number-automatic[name='e']").prop("disabled", false)
        $(".insert-number-automatic[name='d']").prop("disabled", false)
    } else {
        $(".insert-number-automatic[name='e']").prop("disabled", true)
        $(".insert-number-automatic[name='d']").prop("disabled", true)
    }
    // E AND D
    if (!$("#e-number-input").prop("disabled") && valid_lcm_phi_n && valid_p_q) {
        let e_is_valid = false
        if ($("#e-number-input").val() != "" && e.greater(0)) {
            if (input_id == "e") {
                if ((lcm_hidden && e_phi_coprime == -1) || (!lcm_hidden && e_lcm_coprime == -1)) {
                    $("#e-can-not-be-found").attr("hidden", false)
                }
                else if (lcm_hidden && e_phi_coprime && phi.greater(e)) {
                    $("#e-number-input").addClass("is-valid")
                    $("#e-number-input").removeClass("is-invalid")
                    e_is_valid = true
                    $("#e-is-coprime").attr("hidden", false);
                } else if (!lcm_hidden && e_lcm_coprime && lcm.greater(e)) {
                    $("#e-number-input").addClass("is-valid")
                    $("#e-number-input").removeClass("is-invalid")
                    e_is_valid = true
                    $("#e-is-coprime").attr("hidden", false);
                } else if (lcm_hidden && e.greater(phi)) {
                    $("#e-is-greater-phi-or-lcm").attr("hidden", false);
                    $("#e-number-input").removeClass("is-valid")
                    $("#e-number-input").addClass("is-invalid")
                    valid_e_d = false
                }
                else if (!lcm_hidden && e.greater(lcm)) {
                    $("#e-is-greater-phi-or-lcm").attr("hidden", false);
                    $("#e-number-input").removeClass("is-valid")
                    $("#e-number-input").addClass("is-invalid")
                    valid_e_d = false
                }
                else {
                    valid_e_d = false
                    $("#e-number-input").removeClass("is-valid")
                    $("#e-number-input").addClass("is-invalid")
                    $("#e-is-not-coprime").attr("hidden", false);
                }
            }
            else if (lcm_hidden && e_phi_coprime && phi.greater(e)) {
                $("#e-number-input").addClass("is-valid")
                $("#e-number-input").removeClass("is-invalid")
                e_is_valid = true

            }
            else if (!lcm_hidden && e_lcm_coprime && lcm.greater(e)) {
                $("#e-number-input").addClass("is-valid")
                $("#e-number-input").removeClass("is-invalid")
                e_is_valid = true

            }
            else if (lcm_hidden && e.greater(phi)) {
                $("#e-number-input").removeClass("is-valid")
                $("#e-number-input").addClass("is-invalid")
                valid_e_d = false
            }
            else if (!lcm_hidden && e.greater(lcm)) {
                $("#e-number-input").removeClass("is-valid")
                $("#e-number-input").addClass("is-invalid")
                valid_e_d = false
            }
            else {
                valid_e_d = false
                $("#e-number-input").removeClass("is-valid")
                $("#e-number-input").removeClass("is-invalid")
            }
            if (input_id == "d") {
                if (e_is_valid) {
                    if ((lcm_hidden && d.greater(phi)) || (!lcm_hidden && d.greater(lcm))) {
                        valid_e_d = false

                        $("#d-number-input").removeClass("is-valid")
                        $("#d-number-input").addClass("is-invalid")
                        $("#d-greater-phi-or-lcm").attr("hidden", false)
                    }
                    else if ($("#d-number-input").val() != "" && d.greater(0)) {
                        const e_d_coprime = $("#phi-number-input").attr("hidden") ? (e.multiply(d)).mod(lcm).equals(1) : (e.multiply(d)).mod(phi).equals(1)
                        if (e_d_coprime) {
                            $("#d-number-input").addClass("is-valid")
                            $("#d-number-input").removeClass("is-invalid")
                            $("#d-is-correct").attr("hidden", false)
                        } else {
                            valid_e_d = false
                            $("#d-number-input").removeClass("is-valid")
                            $("#d-number-input").addClass("is-invalid")
                            $("#d-is-not-correct").attr("hidden", false)
                        }
                    } else {
                        valid_e_d = false
                        $("#d-number-input").removeClass("is-invalid")
                        $("#d-number-input").removeClass("is-valid")

                    }
                } else {
                    valid_e_d = false
                    $("#e-is-not-valid").attr("hidden", false)
                    $("#d-number-input").removeClass("is-valid")
                    $("#d-number-input").removeClass("is-invalid")
                }
            } else if ($("#d-number-input").val() != "" && d.greater(0)) {
                const e_d_coprime = $("#phi-number-input").attr("hidden") ? (e.multiply(d)).mod(lcm).equals(1) : (e.multiply(d)).mod(phi).equals(1)
                if (e_d_coprime) {
                    $("#d-number-input").addClass("is-valid")
                    $("#d-number-input").removeClass("is-invalid")
                } else {
                    valid_e_d = false
                    $("#d-number-input").removeClass("is-valid")
                    $("#d-number-input").addClass("is-invalid")
                }
            } else {
                valid_e_d = false
                $("#d-number-input").removeClass("is-valid")
            }
        }
        else {
            valid_e_d = false
            $("#d-number-input").removeClass("is-valid")
            $("#d-number-input").removeClass("is-invalid")
            $("#e-number-input").removeClass("is-valid")
            $("#e-number-input").removeClass("is-invalid")
        }
    } else {
        valid_e_d = false
        $("#e-d-number-input input").removeClass("is-valid")
        $("#e-d-number-input input").removeClass("is-invalid")
    }
    if (valid_e_d) {
        if (e.equals(d)) {
            $("#e-d-equal-alert").attr("hidden", false)
        }
        if (lcm_hidden && ((e.multiply(d)).mod(phi)).equals(1) && d.lesserOrEquals(phi)) {
            $("#popover-d-button").attr("data-content", `(${d} * ${e}) mod ${phi} = 1`)
        }
        else if (!lcm_hidden && ((e.multiply(d)).mod(lcm)).equals(1)) {
            $("#popover-d-button").attr("data-content", `(${d} * ${e}) mod ${lcm} = 1`)
        } else {
            if (lcm_hidden) {
                $("#popover-d-button").attr("data-content", "(d * e) mod φ(n) = 1")
            } else {
                $("#popover-d-button").attr("data-content", "(d * e) mod lcm = 1")
            }
        }
    } else {
        if (lcm_hidden) {
            $("#popover-d-button").attr("data-content", "(d * e) mod φ(n) = 1")
        } else {
            $("#popover-d-button").attr("data-content", "(d * e) mod lcm = 1")
        }
        valid_e_d = false
    }
    clearTimeout(reset_warning)
    if (valid_p_q && valid_lcm_phi_n && valid_e_d) {

        $(".n-key").html(n.value)
        $("#d-key").html(d.value)
        $("#e-key").html(e.value)
        $(".key-generation-visualisation-result").attr("hidden", false)
        if (n.greater(200)) {

            $("#alert-smaller-200").attr("hidden", false)

            $("#visualization-card .alert-warning").show()
            $("#visualization-card button").prop("disabled", true)
        } else {
            // IF KEYS ARE VALID THE BUTTONS ARE GETTING ENABLED
            let new_valid_key = { "n": n, "d": d, "e": e }

            new Promise((resolve, reject) => {
                if (valid_key_for_take_over) {

                    //Check if user write smmth into the inputs
                    if (input_id === "self") {
                        resolve("generated key")
                    }
                    else if (new_valid_key.n.value != valid_key_for_take_over.n.value || new_valid_key.e.value != valid_key_for_take_over.e.value || new_valid_key.d.value != valid_key_for_take_over.d.value) {
                        reset_warning = setTimeout(() => {
                            $("#alert-reset-graphic-input").prop("hidden", true)
                            reject("no user input")
                        }, 10000)
                        $("#alert-reset-graphic-input").prop("hidden", false)
                        $("#alert-reset-graphic-input-yes").on("click", () => {
                            // clearTimeout(reset_warning)
                            $("#alert-reset-graphic-input").prop("hidden", true)
                            resolve("take over new key")
                        })
                        $("#alert-reset-graphic-input-no").on("click", () => {
                            // clearTimeout(reset_warning)
                            $("#alert-reset-graphic-input").prop("hidden", true)
                            reject("reject key")
                        })
                    } else {

                        clearTimeout(reset_warning)
                        reject("same key as previous key")
                    }
                }
                else {

                    resolve("new key")
                }
            }).then(() => {
                valid_key_for_take_over = new_valid_key
                $("#success-key-in-graphic-useable").prop("hidden", false)
                take_over_key_pair_for_visualization("two-lines")
                take_over_key_pair_for_visualization("circle")
                visualization_controller("reset", "two-lines")
                visualization_controller("reset", "circle")
            }).catch((error) => {

            })
        }
    } else {

        if (valid_key_for_take_over) {
            visualization_controller("delete", "two-lines")
            visualization_controller("delete", "circle")
            delete_key_pair_for_visualization("circle")
            delete_key_pair_for_visualization("two-lines")
        }
        $(".n-key").html("")
        $("#d-key").html("")
        $("#e-key").html("")
        $(".key-generation-visualisation-result").attr("hidden", true)
    }

    return setTimeout(() => {
        $("#rsa-input .alert").not("#alert-reset-graphic-input, #alert-overwrite-input, #alert-smaller-200").attr("hidden", true)
    }, 7000)

}


/**
 * 
 * @param {*} vis_box 
 * @param {*} n 
 * @param {*} e 
 * @param {*} d 
 */
function switch_de_encrypt_modus(vis_box = "two-lines") {

    if (vis_box == "two-lines" && two_lines_information.e) {
        if ($("#visualization-encrypt").is(':checked')) {
            if (two_lines_information.start_two_lines) {
                $("#calculation-keys").html(`e = ${two_lines_information.e}, n = ${two_lines_information.n}`)
                $("#header-line-calculation").html("m<sup>" + two_lines_information.e + "</sup> mod " + two_lines_information.n + " = c")
            }
        } else {
            if (two_lines_information.start_two_lines) {
                $("#calculation-keys").html(`d = ${two_lines_information.d}, n = ${two_lines_information.n}`)
                $("#header-line-calculation").html("c<sup>" + two_lines_information.d + "</sup> mod " + two_lines_information.n + " = m")
            }
        }
    } else if (vis_box == "circle" && circle_information.e) {
        if ($("#visualization-circle-encrypt").is(':checked')) {
            if (circle_information.circle_start) {
                $("#calculation-circle-keys").html(`e = ${circle_information.e}, n = ${circle_information.n}`)
                $("#header-circle-calculation").html("m<sup>" + circle_information.e + "</sup> mod " + circle_information.n + " = c")
            }
        } else {
            if (circle_information.circle_start) {
                $("#calculation-circle-keys").html(`d = ${circle_information.d}, n = ${circle_information.n}`)
                $("#header-circle-calculation").html("c<sup>" + circle_information.d + "</sup> mod " + circle_information.n + " = m")
            }
        }
    } else if (vis_box === "reset-both") {
        $("#calculation-keys").html("")
        $("#header-line-calculation").html("")
        $("#calculation-circle-keys").html("")
        $("#header-circle-calculation").html("")
    }
}


// CIRLCE EVENTS
//
//
//

/**
 * 
 * CREATE ARROWS IN CIRCLE
 * 
 */


// PREESENT N -> function for button disabel on/ off
const circle_information = {
    "pause_creating_arrow_in_circle": false, "circle_start": true, "reset_visualization": false,
    "last_number": 0, "last_created_arrow": 0,
    "circle_arrows_array": [], "e": null, "n": null, "d": null, "circle_id": 0
}

/**
 * 
 * @param {*} button 
 * @param {*} encrypt_bool 
 * @returns 
 */
async function start_visualization_circle(button, encrypt_bool = $("#visualization-circle-encrypt").is(':checked')) {
    if (circle_information.n == null ||
        circle_information.e == null ||
        circle_information.d == null) {
        return
    }
    /**
     *  its for reset purpose
     *  the while-loop is break with the help of the internal_id
     *  its reset the previous while loop 
     */
    let internal_id
    if (circle_information.circle_start) {
        circle_information.circle_id++
        internal_id = circle_information.circle_id
        set_up_circle_view_for_start(encrypt_bool)
    }

    if ($(button).val() == "0" || $(button).val() == "1") {
        circle_information.pause_creating_arrow_in_circle = false
    } else if ($(button).val() == "2") {
        circle_information.pause_creating_arrow_in_circle = true
    } else if ($(button).val() == "4") {
        one_circle_iteration(circle_information.circle_arrows_array.length, encrypt_bool)
        // controll function here
        visualization_controller("one_iter", "circle")
        //--
        return
    }
    let curr_point = circle_information.circle_arrows_array.length;
    while (curr_point < circle_information.n) {
        if (circle_information.circle_arrows_array[curr_point]) {
            // if the user press the button Continue/ Pause very fast
            //, it could lead to a async while loop. This is to stop this.
            break
        }
        if (internal_id == circle_information.circle_id - 1 && circle_information.reset_visualization) {
            circle_information.reset_visualization = false
            break
        }
        if (circle_information.pause_creating_arrow_in_circle) {
            visualization_controller("pause", "circle")
            await pause_the_visualization(button)
            break
        }
        curr_point = circle_information.circle_arrows_array.length;
        one_circle_iteration(curr_point, encrypt_bool)
        visualization_controller("loop", "circle")
        await Sleep(parseInt($("#sleep-circle-range").attr("max")) - parseInt($("#sleep-circle-range").val()))


        curr_point++
    }
}
/**
 * 
 * @param {*} encrypt_bool 
 */
function set_up_circle_view_for_start(encrypt_bool) {
    $("#body-calculation").html("")
    create_circle(circle_information.n)
    circle_information.circle_arrows_array = []
    circle_information.circle_start = false
    // circle_information.reset_visualization = false
    circle_information.pause_creating_arrow_in_circle = false
    circle_information.last_number = 0
    circle_information.last_created_arrow = 0

    if (encrypt_bool) {
        $("#calculation-circle-keys").html(`e = ${circle_information.e}, n = ${circle_information.n}`)
        $("#header-circle-calculation").html("m<sup>" + circle_information.e + "</sup> mod " + circle_information.n + " = c")
    } else {
        $("#calculation-circle-keys").html(`d = ${circle_information.d}, n = ${circle_information.n}`)
        $("#header-circle-calculation").html("c<sup>" + circle_information.d + "</sup> mod " + circle_information.n + " = m")
    }
}

/**
 * 
 * @param {*} present_n 
 * @param {*} encrypt_bool 
 */
function one_circle_iteration(present_n, encrypt_bool) {
    let next_number
    if (encrypt_bool) {
        next_number = bigInt(present_n).modPow(circle_information.e, circle_information.n)
        $("#body-calculation").append(`<div class = 'circle-arrow' result=${next_number} value = ${present_n}>` + present_n + "<sup>" + circle_information.e + "</sup> " + " mod " + circle_information.n + " = " + next_number + "</div>")
    }
    else {
        next_number = bigInt(present_n).modPow(circle_information.d, circle_information.n)
        $("#body-calculation").append(`<div class = 'circle-arrow' result=${next_number} value = ${present_n}>` + present_n + "<sup>" + circle_information.d + "</sup> " + " mod " + circle_information.n + " = " + next_number + "</div>")
    }
    // scrollToBottom("circle-calculation-wrapper")
    let created_arrow = create_arrow(circle_information.last_number, next_number, "red")
    circle_information.circle_arrows_array.push(created_arrow)
    // update color of previous created arrow
    if (circle_information.last_created_arrow != 0) {
        circle_information.last_created_arrow.setAttribute({
            color: "black",
        });
    }
    circle_information.last_created_arrow = created_arrow
    circle_information.last_number = next_number
    scrollToBottom("circle-calculation-wrapper")
}


/**
 * 
 * @param {*} milliseconds 
 * @returns 
 */
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


// LINE EVENTS
//
//
//

const two_lines_information = {
    "two_lines_pause": false, "start_two_lines": true, "reset_visualization": false, "two_lines_arrow_array": [], "e": null, "n": null, "d": null, "two_lines_id": 0
}

/**
 * 
 * @param {*} curr_point 
 * @param {*} bool_encrypt 
 */
function one_two_lines_iteration(curr_point, bool_encrypt) {
    let result;
    let color;
    if (bool_encrypt) {

        result = bigInt(curr_point).modPow(two_lines_information.e, two_lines_information.n)
        color = result == curr_point ? "red" : "green"
        $("#body-line-calculation").append(`<div class="two-lines-arrow" value=${curr_point} result=${result}>` + curr_point + "<sup>" + two_lines_information.e + "</sup>" + " mod " + two_lines_information.n + " = " + result + " </div> ")
        line_one_element.points[curr_point].setAttribute({
            color: color, showInfobox: true, previous_color: color
        })
        line_two_element.points[result].setAttribute({
            color: color, showInfobox: true, previous_color: color
        })

    } else {
        result = bigInt(curr_point).modPow(two_lines_information.d, two_lines_information.n)
        color = result == curr_point ? "red" : "green"
        $("#body-line-calculation").append(`<div class="two-lines-arrow" value=${curr_point} result=${result}>` + curr_point + "<sup>" + two_lines_information.d + "</sup>" + " mod " + two_lines_information.n + " = " + result + " </div> ")
        line_one_element.points[result].setAttribute({
            color: color, showInfobox: true, previous_color: color
        })
        line_two_element.points[curr_point].setAttribute({
            color: color, showInfobox: true, previous_color: color
        })
    }
    two_lines_information.two_lines_arrow_array.push(create_arrow(curr_point, result, color, "two_lines", bool_encrypt))
    scrollToBottom("line-calculation-wrapper")


}


/**
 * 
 * @param {*} button 
 * @param {*} bool_encrypt 
 * @returns 
 */
async function start_visualization_two_lines(button, bool_encrypt = $("#visualization-encrypt").is(':checked')) {
    if (two_lines_information.n == null ||
        two_lines_information.e == null ||
        two_lines_information.d == null) return

    // its for reset purpose
    // the while-loop is break with the help of the internal_id
    // its delete the previous while loop 
    let internal_id

    if (two_lines_information.start_two_lines) {
        two_lines_information.two_lines_id++
        internal_id = two_lines_information.two_lines_id
        set_up_two_lines_view_for_start(bool_encrypt)
    }
    // buttons_values 0 -> Start, 1 -> Continue, 2 -> Pause
    if ($(button).val() == "0" || $(button).val() == "1") {
        // CONTINU
        two_lines_information.two_lines_pause = false
    } else if ($(button).val() == "2") {
        //PAUSE
        two_lines_information.two_lines_pause = true
    } else if ($(button).val() == "4") {
        one_two_lines_iteration(two_lines_information.two_lines_arrow_array.length, bool_encrypt)
        // controll function here
        visualization_controller("one_iter", "two-lines")
        //--
        return
    }


    let curr_point = two_lines_information.two_lines_arrow_array.length;

    while (curr_point < two_lines_information.n) {
        if (two_lines_information.two_lines_arrow_array[curr_point]) {
            // if the user press the button Continue/ Pause very fast
            //, it could lead to a async while loop. This is to stop this.
            break
        }
        if (internal_id == two_lines_information.two_lines_id - 1 && two_lines_information.reset_visualization) {
            two_lines_information.reset_visualization = false
            break
        }
        if (two_lines_information.two_lines_pause) {
            visualization_controller("pause", "two-lines")
            await pause_the_visualization(button)
            break
        }
        // its have the purpose if one step in the visualization was made so here it gets updated
        curr_point = two_lines_information.two_lines_arrow_array.length;
        // Whole visualization logic here
        one_two_lines_iteration(two_lines_information.two_lines_arrow_array.length, bool_encrypt)
        //--------------------
        // controll function here
        visualization_controller("loop", "two-lines")
        //--
        await Sleep(parseInt($("#sleep-two-lines-range").attr("max")) - parseInt($("#sleep-two-lines-range").val()))

        curr_point++
    }
}
/**
 * 
 * @param {*} bool_encrypt 
 */
function set_up_two_lines_view_for_start(bool_encrypt) {

    // two_lines_information.reseted_visualization = false
    two_lines_information.start_two_lines = false
    two_lines_information.two_lines_pause = false
    two_lines_information.two_lines_arrow_array = []
    create_points_on_line(line_one_element, two_lines_information.n, two_lines_board, bool_encrypt)
    create_points_on_line(line_two_element, two_lines_information.n, two_lines_board, bool_encrypt)
    if (bool_encrypt) {
        $("#calculation-keys").html(`e = ${two_lines_information.e}, n = ${two_lines_information.n}`)
        $("#header-line-calculation").html("m<sup>" + two_lines_information.e + "</sup> mod " + two_lines_information.n + " = c")
    } else {
        $("#calculation-keys").html(`d = ${two_lines_information.d}, n = ${two_lines_information.n}`)
        $("#header-line-calculation").html("c<sup>" + two_lines_information.d + "</sup> mod " + two_lines_information.n + " = m")
    }

}




/**
 * 
 */
$("#previous-step-arrow-two-line-button").on("click", () => {
    delete_last_line(two_lines_board, two_lines_information.two_lines_arrow_array, "body-line-calculation")
    visualization_controller("one_iter", "two-lines")
    scrollToBottom("line-calculation-wrapper")
    return


})

/**
 * 
 * 
*/
$("#body-calculation").on("mouseenter mouseout", ".circle-arrow", function (e) {
    let event_type = e.type
    let value = this.getAttribute("value")
    let arrow = circle_information.circle_arrows_array[value]
    if (event_type == "mouseenter") {
        // TO OBJECT ARROW PREVIOS COLOR
        arrow.setAttribute({ previous_color: arrow.getAttribute("color") })
        this.style.color = "blue"
        arrow.setAttribute({
            color: "blue"
        })
    } else {
        this.style.color = "black"
        arrow.setAttribute({
            color: arrow.getAttribute("previous_color")
        })
    }
})
/**
 * 
 * 
 */
$("#body-line-calculation").on("mouseenter mouseout", ".two-lines-arrow", function (e) {
    on_mouseover_mouseenter_line(e.type, this.getAttribute("value"))
})

/** HELPER FUNCTIONS */

/**
 * 
 * @param {*} action 
 * @returns 
 * TODO: String button
 */
function visualization_controller(action, type) {
    const current_amount_of_lines = type == "two-lines" ? two_lines_information.two_lines_arrow_array.length : circle_information.circle_arrows_array.length
    const current_n = type == "two-lines" ? two_lines_information.n : circle_information.n
    //Buttons
    const start_button = type == "two-lines" ? $("#start-arrow-two-line-button") : $("#start-circle-visualization")
    const next_button = type == "two-lines" ? $("#next-step-arrow-two-line-button") : $("#next-step-arrow-circle-button")
    const previous_button = type == "two-lines" ? $("#previous-step-arrow-two-line-button") : $("#previous-step-arrow-circle-button")
    const reset_button = type == "two-lines" ? $("#clear-two-line-button") : $("#clear-circle-button")
    const input_radio = type == "two-lines" ? $("input[name='visualization-radio']") : $("input[name='visualization-circle-radio']")
    //
    switch (action) {
        case "start":
            start_button.html(start_string)
            break
        case "loop":
            input_radio.prop("disabled", true)

            if (current_amount_of_lines == 0) {
                // DISABLE
                previous_button.prop("disabled", true);
                next_button.prop("disabled", false);
                reset_button.prop("disabled", true);
                start_button.prop("disabled", false);
                start_button.html(start_string)
                start_button.val(0)
            } else if (current_amount_of_lines >= 1 && current_amount_of_lines < current_n) {
                // DISABLE
                previous_button.prop("disabled", true);
                next_button.prop("disabled", true);
                reset_button.prop("disabled", true);
                start_button.prop("disabled", false);

                start_button.val(2)
                start_button.html(pause_string)

            } else if (current_amount_of_lines == current_n) {
                // DISABLE
                previous_button.prop("disabled", false);
                next_button.prop("disabled", true);
                reset_button.prop("disabled", false)
                start_button.prop("disabled", true);

                start_button.html(continue_string)
                start_button.val(1)
            }
            break
        case "one_iter":
            if (current_amount_of_lines == 0) {
                // DISABLE
                input_radio.prop("disabled", false)
                previous_button.prop("disabled", true);
                next_button.prop("disabled", false);
                reset_button.prop("disabled", true);
                start_button.prop("disabled", false);

                // Start- / Continue- / Restart- BUTTON STRING 
                start_button.html(start_string)
                start_button.val(0)
            } else if (current_amount_of_lines >= 1 && current_amount_of_lines < current_n) {
                // DISABLE
                input_radio.prop("disabled", true)
                previous_button.prop("disabled", false);
                next_button.prop("disabled", false);
                reset_button.prop("disabled", false);
                start_button.prop("disabled", false);

                // Start- / Continue- / Restart- BUTTON STRING 
                start_button.html(continue_string)
                start_button.val(1)
            } else if (current_amount_of_lines == current_n) {
                // DISABLE
                input_radio.prop("disabled", false)
                previous_button.prop("disabled", false);
                next_button.prop("disabled", true);
                reset_button.prop("disabled", false)
                start_button.prop("disabled", true);
                // Start- / Continue- / Restart- BUTTON STRING ;
                start_button.html(continue_string)
                start_button.val(1)
            }
            break
        case "pause":
            previous_button.prop("disabled", false);
            next_button.prop("disabled", false);
            reset_button.prop("disabled", false);
            // BUTTON STRING
            start_button.val("1")
            start_button.html(continue_string)
            break
        case "reset":
            if (type == "two-lines") {
                $("#body-line-calculation").html("")
                two_lines_information.start_two_lines = true
                two_lines_information.reset_visualization = true

                create_points_on_line(line_one_element, two_lines_information.n, two_lines_board, $("#visualization-encrypt").is(':checked'))
                create_points_on_line(line_two_element, two_lines_information.n, two_lines_board, $("#visualization-encrypt").is(':checked'))
            } else {
                $("#body-calculation").html("")
                create_circle(circle_information.n)
                circle_information.circle_start = true
                circle_information.reset_visualization = true
                circle_information.last_number = 0
                circle_information.last_created_arrow = 0
            }
            input_radio.prop("disabled", false)
            reset_button.prop("disabled", false);
            previous_button.prop("disabled", true)
            next_button.prop("disabled", false);
            start_button.prop("disabled", false);
            start_button.html(start_string)
            start_button.val(0)
            break
        case "delete":
            if (type == "two-lines") {
                $("#body-line-calculation").html("")
                two_lines_information.start_two_lines = true
                two_lines_information.reset_visualization = true
                create_points_on_line(line_one_element, 0, two_lines_board, $("#visualization-encrypt").is(':checked'))
                create_points_on_line(line_two_element, 0, two_lines_board, $("#visualization-encrypt").is(':checked'))

            } else {
                $("#body-calculation").html("")
                create_circle(0)
                circle_information.circle_start = true
                circle_information.reset_visualization = true
                circle_information.last_number = 0
                circle_information.last_created_arrow = 0
            }
            input_radio.prop("disabled", false)
            reset_button.prop("disabled", false);
            previous_button.prop("disabled", true)
            next_button.prop("disabled", false);
            start_button.prop("disabled", false);
            start_button.html(start_string)
            start_button.val(0)
            break
    }
}

/**
 * 
 * @param {*} button 
 * @returns 
 */
function pause_the_visualization(button) {
    return new Promise((resolve, reject) => {
        $(button).on("click", () => {
            resolve("continue visualization");
        })
    })
}

/**
 * 
 * @param {String} event_type 
 * @param {Int} value_el 
 * @param {String} line_name 
 * @returns 
 */
function on_mouseover_mouseenter_line(event_type, value_el, encrypt, line_name) {
    let calculation_element

    if (line_name == "up") {

        if (encrypt) {
            calculation_element = $(`#body-line-calculation > .two-lines-arrow[value='${value_el}']`)
        } else {
            calculation_element = $(`#body-line-calculation > .two-lines-arrow[result='${value_el}']`)
        }


    } else {

        if (encrypt) {
            calculation_element = $(`#body-line-calculation > .two-lines-arrow[result='${value_el}']`)
        } else {
            calculation_element = $(`#body-line-calculation > .two-lines-arrow[value='${value_el}']`)
        }

    }
    // manipulate infobox

    let value = calculation_element.attr("value")

    if (two_lines_information.two_lines_arrow_array[value] == undefined) {
        return 0
    }
    let points = two_lines_information.two_lines_arrow_array[value].inherits
    if (event_type == "mouseenter") {
        two_lines_information.two_lines_arrow_array[value].setAttribute({
            previous_color: two_lines_information.two_lines_arrow_array[value].getAttribute("fillColor"),
            color: "blue"
        })
        points[0].setAttribute({
            previous_color: points[0].getAttribute("fillColor"),
            color: "blue"
        })
        points[1].setAttribute({
            previous_color: points[1].getAttribute("fillColor"),
            color: "blue"
        })
        calculation_element.css("color", "blue")
        if (line_name == "up") {
            two_lines_board.highlightInfobox = function (x, y, el) {
                this.infobox.setText(`<span style="color:black;font-weight:bold">m: ${calculation_element.attr("value")}, c: ${calculation_element.attr("result")}</span>`);
                this.infobox.rendNode.style.border = 'groove ' + el.visProp['strokecolor'] + ' 2px';
                this.infobox.rendNode.style.padding = '5px';
                this.infobox.rendNode.style.backgroundColor = 'white';
            }
        } else {
            two_lines_board.highlightInfobox = function (x, y, el) {
                this.infobox.setText(`<span style="color:black;font-weight:bold">c: ${calculation_element.attr("result")}, m: ${calculation_element.attr("value")}</span>`);
                this.infobox.rendNode.style.border = 'groove ' + el.visProp['strokecolor'] + ' 2px';
                this.infobox.rendNode.style.padding = '5px';
                this.infobox.rendNode.style.backgroundColor = 'white';
            }
        }
        if (encrypt !== undefined && line_name !== undefined)
            $("#line-calculation-wrapper").scrollTop($(calculation_element).position().top);

    } else {// mouse out
        calculation_element.css("color", "black")
        two_lines_information.two_lines_arrow_array[value].setAttribute({
            color: two_lines_information.two_lines_arrow_array[value].getAttribute("previous_color")
        })
        points[0].setAttribute({
            color: points[0].getAttribute("previous_color")
        })
        points[1].setAttribute({
            color: points[1].getAttribute("previous_color")
        })
    }
}


/**
 * 
 * @param {object} line_obj 
 * @param {int} amount_of_points 
 * @param {object} board_name // default line_board (board where only one line exists)
 * @param {Boolean} encrypt 
 */
function create_points_on_line(line_obj, amount_of_points, board_name = two_lines_board, encrypt) {
    // board_name.removeObject(line_obj.points)
    board_name.suspendUpdate();
    if (line_obj.points != undefined) {
        while (line_obj.points.length > 0) {
            board_name.removeObject(line_obj.points.pop().id);
            // line_obj.points
        }
    }
    board_name.unsuspendUpdate();
    let y_axis = line_obj.getRise()

    let line_length = line_obj.L()
    let dist_btw_points = line_length / (amount_of_points - 1)
    let start_point = line_obj.point1.X()
    let x_axis_coor_new_point = start_point;
    line_obj.points = [];
    let line_name = line_obj.getAttribute("name")
    for (let i = 0; i < amount_of_points; i++) {
        // set color of points
        let color = "white"

        var p = board_name.create('point', [parseFloat(x_axis_coor_new_point), parseFloat(y_axis)],
            {   // border color

                strokeColor: "black",
                size: 2,
                previous_color: "",
                fillColor: color, val: i, name: "", fixed: true, showInfobox: false,
                label: {
                    offset: [-4, 0],
                    color: "black", highlight: false, fixed: true, size: [50, 50],
                }
            });
        // mouseenter mouseout

        p.on("mouseover", function (e, i) {
            on_mouseover_mouseenter_line("mouseenter", this.getAttribute("val"), encrypt, line_name)
        })
        p.on("mouseout", function (e, i) {
            on_mouseover_mouseenter_line("mouseout", this.getAttribute("val"), encrypt, line_name)
        })
        line_obj.points.push(p)
        x_axis_coor_new_point += dist_btw_points
    }
}

/**
 * 
 * @param {*} from_point 
 * @param {*} to_point 
 * @param {*} arrow_color 
 * @param {*} case_ 
 * @param {*} modus 
 * @returns 
 */
function create_arrow(from_point, to_point, arrow_color = "black", case_ = "circle", modus) {
    let p
    if (case_ == "circle") {
        p = circle_board.create('arrow', [ticks.ticksArrary[from_point], ticks.ticksArrary[to_point]], { previous_color: "", color: arrow_color, highlight: false, fixed: true, });
    }
    else {
        if (modus) p = two_lines_board.create('arrow', [line_one_element.points[from_point], line_two_element.points[to_point]], { color: arrow_color, previous_color: arrow_color, highlight: false, fixed: true, touchLastPoint: true, });
        else p = two_lines_board.create('arrow', [line_two_element.points[from_point], line_one_element.points[to_point]], { color: arrow_color, previous_color: arrow_color, highlight: false, fixed: true, touchLastPoint: true, });
    }
    return p
}

/**
 * 
 * @param {*} ticks_amount 
 */
function create_circle(ticks_amount) {

    // remove invisible points with labels
    circle_board.suspendUpdate();
    circle_board.removeObject(circle_information.circle_arrows_array)
    circle_board.removeObject(ticks.textArray)
    circle_board.unsuspendUpdate();

    var cx = circ.center.X(),
        cy = circ.center.Y(),
        r = circ.Radius(),
        i,
        ticklen = 0.5,           // Length of ticks in user space coordinates
        steps = ticks_amount + 1,              // Number of ticks
        d = ticklen * 0.5,
        alpha = 2 * Math.PI / steps;

    ticks.dataX = [];
    ticks.dataY = [];
    ticks.textArray = [];
    ticks.ticksArrary = [];
    for (i = 0; i < steps; i++) {
        // Automatic run of a tick
        ticks.dataX.push(cx + (r - d) * Math.cos(i * alpha));
        ticks.dataY.push(cy + (r - d) * Math.sin(i * alpha));


        ticks.textArray.push(circle_board.create('text', [cx + (r + d) * Math.cos(i * alpha), cy + (r + d) * Math.sin(i * alpha), i], {
            color: 'black', highlight: false,

        }));
        // add the coordinates in the middle of the ticks to array to use them for arrows
        ticks.ticksArrary.push([(cx + r) * Math.cos(i * alpha),/**/ (cy + r) * Math.sin(i * alpha)]);
        // End of tick
        ticks.dataX.push(cx + (r + d) * Math.cos(i * alpha));
        ticks.dataY.push(cy + (r + d) * Math.sin(i * alpha));
        // Interrupt the curve
        ticks.dataX.push(NaN);
        ticks.dataY.push(NaN);
    }
    circle_board.update();
    ticks.update();
};


/**
 * 
 * @param {Board Object} board_el 
 * @param {Array} array_for_pop 
 * @param {Int} global_var_index 
 * @param {String} calculation_card 
 */
function delete_last_line(board_el, array_for_pop, calculation_card) {
    let line_to_delete = array_for_pop.pop()
    let line_points = line_to_delete.inherits
    board_el.removeObject(line_to_delete)
    line_points[0].setAttribute({ color: "white", strokeColor: "black" })
    line_points[1].setAttribute({ color: "white", strokeColor: "black" })
    let body_calculation_class = calculation_card == "body-calculation" ? "circle-arrow" : "two-lines-arrow"
    $(`#${calculation_card} > .${body_calculation_class}[value='${array_for_pop.length}']`).remove()



}

/**
 * 
 * @param {*} key 
 * @returns true if all are fixpoints
 * 
 */
function test_key_for_fixpoints(key) {
    let all_same = true
    for (let i = 0; i < key["n"]; i++) {
        // let result = bigInt(i).pow(bigInt(key["e"])).mod(bigInt(key["n"]))
        let result = bigInt(i).modPow(key["e"], key["n"])
        if (!result.equals(i)) {
            all_same = false
            break
        }
    }
    return all_same
}

/**
 * 
 * @param {String} id 
 */
function scrollToBottom(id) {
    $(`#${id}`).scrollTop(function () { return this.scrollHeight; });

}

/**
 * 
 */
$("#previous-step-arrow-circle-button").on("click", () => {
    delete_last_line(circle_board, circle_information.circle_arrows_array, "body-calculation")

    if (circle_information.circle_arrows_array.length == 0) {
        circle_information.last_created_arrow = 0
        circle_information.last_number = 0
    } else {

        circle_information.circle_arrows_array[circle_information.circle_arrows_array.length - 1].setAttribute({
            color: "red",
        });

        circle_information.last_created_arrow = circle_information.circle_arrows_array[circle_information.circle_arrows_array.length - 1]
        circle_information.last_number = $(`#body-calculation > .circle-arrow[value='${circle_information.circle_arrows_array.length - 1}']`).attr("result")
    }
    visualization_controller("one_iter", "circle")
    scrollToBottom("circle-calculation-wrapper")
    return

})

/** EVENTS Circle and Two-lines events previous and calculation-body are above */
$("#rsa-input input").on("input", function () {
    clearTimeout(alert_vis_key_gen_id)
    visualization_param_input_handler(this).then(x => {
        alert_vis_key_gen_id = x
    })


})
/**
 * Button-Event to generate a key for visualization
 * 
 */
$("#visualization-primes-button").on("click", async function () {
    clearTimeout(reset_and_overwrite_warning)
    //Check if user write smmth into the inputs
    let progres_input = false
    await $("#rsa-input input").each(async function () {
        if ($(this).val() !== "") {
            progres_input = true
            return false
        }
    })

    new Promise((resolve, reject) => {

        if (progres_input) {
            $("#alert-overwrite-input").prop("hidden", false)
            reset_and_overwrite_warning = setTimeout(() => {

                $("#alert-overwrite-input").prop("hidden", true)
                // clearTimeout(reset_and_overwrite_warning)
                reject("no user input")
            }, 10000)

            $("#visual-overwrite-input-yes").on("click", () => {
                // clearTimeout(reset_and_overwrite_warning)
                $("#alert-overwrite-input").prop("hidden", true)
                resolve("overwrite")
            })
            $("#visual-overwrite-input-no").on("click", () => {
                // clearTimeout(reset_and_overwrite_warning)
                $("#alert-overwrite-input").prop("hidden", true)
                reject("no overwrite")
            })

        } else {

            resolve("no input, so write")
        }
    }).then(async () => {
        clearTimeout(alert_vis_key_gen_id)

        let key = get_rand_key(4, 40, $("#lcm-number-input").prop("hidden"))
        while (key["n"] > 200 || test_key_for_fixpoints(key)) {
            key = get_rand_key(4, 40, $("#lcm-number-input").prop("hidden"))
        }
        $("#p-number-input").val(key["p"])
        $("#q-number-input").val(key["q"])
        $("#n-number-input").val(key["n"])
        $("#phi-number-input").val(key["phi"])
        $("#e-number-input").val(key["e"])
        $("#d-number-input").val(key["d"])
        $("#lcm-number-input").val(key["lcm"])

        // set key
        $(".n-key").html(key["n"])
        $("#d-key").html(key["d"])
        $("#e-key").html(key["e"])
        visualization_param_input_handler({ id: "self-input" }).then(x => {
            alert_vis_key_gen_id = x
        })
        $("#rsa-input input").prop("disabled", false)

    }).catch((error) => {

        return
    })

})


$("#start-arrow-two-line-button, #next-step-arrow-two-line-button").on("click", function () {
    start_visualization_two_lines(this)
})

$("#clear-two-line-button").on("click", function () {
    visualization_controller("reset", "two-lines")
})

$("#start-circle-visualization, #next-step-arrow-circle-button").on("click", function () {
    start_visualization_circle(this)
})

$("#clear-circle-button").on("click", function () {
    visualization_controller("reset", "circle")
})

$(".param-box-switch-input").on("click", function () {
    switch (this.id) {
        case "phi-input":
            $("#phi-number-input").prop('hidden', false);
            $("#lcm-number-input").prop('hidden', true);
            $("label[for='lcm-number-input']").prop('hidden', true);
            $("label[for='phi-number-input']").prop('hidden', false);
            $(".insert-number-automatic[name='lcm']").prop("hidden", true)
            $(".insert-number-automatic[name='phi']").prop("hidden", false)
            $("#e-d-number-input input[id='e-number-input']").attr("placeholder", $("#e-d-number-input input").attr("placeholder").replace("${{rsa.GENERALLY-LCM-SHORT}}$", "φ(n)"))
            $("#phi-is-coprime").html($("#phi-is-coprime").html().replace("${{rsa.GENERALLY-LCM-SHORT}}$", "φ(n)"))
            $("#phi-is-not-coprime").html($("#phi-is-not-coprime").html().replace("${{rsa.GENERALLY-LCM-SHORT}}$", "φ(n)"))
            $("#e-is-coprime").html($("#e-is-coprime").html().replace("${{rsa.GENERALLY-LCM-SHORT}}$", "φ(n)"))
            $("#e-is-not-coprime").html($("#e-is-not-coprime").html().replace("${{rsa.GENERALLY-LCM-SHORT}}$", "φ(n)"))
            $("#popover-d-button").attr("data-content", "(d * e) mod φ(n) = 1")
            $("#e-helper").attr("data-content", $("#e-helper").attr("data-content").replace(/${{rsa.GENERALLY-LCM-SHORT}}$/g, 'φ(n)'))
            $(".visualition-key-gen-phi-or-lcm").html("φ(n)")
            break;
        case "lcm-input":
            $("#phi-number-input").prop('hidden', true);
            $("#lcm-number-input").prop('hidden', false);
            $("label[for='lcm-number-input']").prop('hidden', false);
            $("label[for='phi-number-input']").prop('hidden', true);
            $(".insert-number-automatic[name='lcm']").prop("hidden", false)
            $(".insert-number-automatic[name='phi']").prop("hidden", true)
            $("#e-d-number-input input[id='e-number-input']").attr("placeholder", $("#e-d-number-input input").attr("placeholder").replace("φ(n)", "${{rsa.GENERALLY-LCM-SHORT}}$"))
            $("#phi-is-coprime").html($("#phi-is-coprime").html().replace("φ(n)", "${{rsa.GENERALLY-LCM-SHORT}}$"))
            $("#phi-is-not-coprime").html($("#phi-is-not-coprime").html().replace("φ(n)", "${{rsa.GENERALLY-LCM-SHORT}}$"))
            $("#e-is-coprime").html($("#e-is-coprime").html().replace("φ(n)", "${{rsa.GENERALLY-LCM-SHORT}}$"))
            $("#e-is-not-coprime").html($("#e-is-not-coprime").html().replace("φ(n)", "${{rsa.GENERALLY-LCM-SHORT}}$"))
            $("#popover-d-button").attr("data-content", "(d * e) mod ${{rsa.GENERALLY-LCM-SHORT}}$ = 1")
            // I could not find a regex to replace all φ(n) at once, since there are two φ(n) the replace-function is exec 2 times
            $("#e-helper").attr("data-content", $("#e-helper").attr("data-content").replace("φ(n)", '${{rsa.GENERALLY-LCM-SHORT}}$'))
            $("#e-helper").attr("data-content", $("#e-helper").attr("data-content").replace("φ(n)", '${{rsa.GENERALLY-LCM-SHORT}}$'))
            $(".visualition-key-gen-phi-or-lcm").html("${{rsa.GENERALLY-LCM-SHORT}}$")
            break;
    }

    visualization_param_input_handler({ id: "none-none" }).then(x => {
        alert_vis_key_gen_id = x
    })

})
/**
 * 
 */
$(".insert-number-automatic").on("click", function () {
    $("#rsa-input .alert").attr("hidden", "true");
    $('[data-toggle="tooltip"]').tooltip('hide');
    const key = {
        p: bigInt($("#p-number-input").val()),
        q: bigInt($("#q-number-input").val()),
        d: bigInt($("#d-number-input").val()),
        e: bigInt($("#e-number-input").val()),
        phi: bigInt($("#phi-number-input").val()),
        lcm: bigInt($("#lcm-number-input").val()),
    }
    const output = insert_number_automatic(this, key, $("#lcm-number-input").attr("hidden"))
    if (output == -1) {
        $("#e-can-not-be-found").attr("hidden", false)
        setTimeout(() => {
            $("#e-can-not-be-found").attr("hidden", true)
        }, 7000)
        return false
    }
    else if (output == false) {
        $("#e-is-not-valid").attr("hidden", false)
        return false
    }
    $(`#${this.name}-number-input`).val(output)

    visualization_param_input_handler(this).then(x => {
        alert_vis_key_gen_id = x
    })
})
/**
 *
 */
$("#visualization-card input[type='radio']").on("click", function () {
    if (this.name == "visualization-radio") {
        switch_de_encrypt_modus("two-lines")
    } else if (this.name == "visualization-circle-radio") {
        switch_de_encrypt_modus("circle")
    }
})