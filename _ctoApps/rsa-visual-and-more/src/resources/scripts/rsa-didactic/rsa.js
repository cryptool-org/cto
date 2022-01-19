import dowload from "../utilities/download.js"
import read_file_content from "../utilities/upload.js"
import { get_curent_date_and_time } from "../utilities/date.js"
import { get_rand_key, phi_function, check_coprime, find_random_coprime } from "../utilities/rsaHelperFunctions.js"
import { add_submit_form } from "../utilities/validation.js";

const $table = $('#table')
let id = 1, all_data_in_table = {}, alert_key_gen_id, warning_overwrite_key

$(function () {
    init_table()
    $("#alphabet").hide()
    $table.bootstrapTable("append", add_data(false, { name: "Alice", keytype: "private", keys: { d: "44273", n: "49163" } }, true))
    $table.bootstrapTable("append", add_data(false, { name: "Alice", keytype: "public", keys: { e: "65537", n: "49163" } }, false))
})

/**
 * 
 */
function init_table() {
    $table.bootstrapTable("destroy").bootstrapTable({
        locale: "${{rsa.LANG}}$", height: 500, data: [],
    })
}
/**
 * 
 * @returns 
 */
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    })
}


/**
 * 
 * @param {*} add_data_from_view 
 * @param {*} data_to_add 
 * @param {*} key_type_private 
 */
function add_data(add_data_from_view = true, data_to_add = {}, key_type_private = true) {
    let name
    let keytype
    let keytype_string
    let n
    let keys = {}
    if (add_data_from_view) {
        name = $("#key-generation-name").val()
        n = $("#key-generation-public-key  span[for='n-generation-key").html().trim()
        if (key_type_private) {
            keytype = "private"
            keytype_string = "${{rsa.DIDACTIC-KEY-KEY-TYPE-PRIVATE}}$"
        } else {
            keytype_string = "${{rsa.DIDACTIC-KEY-KEY-TYPE-PUBLIC}}$"
            keytype = "public"
        }

        keys = {}
    } else {
        name = data_to_add["name"]
        keytype = data_to_add["keytype"]
        if (keytype == "private") {
            keytype_string = "${{rsa.DIDACTIC-KEY-KEY-TYPE-PRIVATE}}$"
        } else if (keytype == "public") {
            keytype_string = "${{rsa.DIDACTIC-KEY-KEY-TYPE-PUBLIC}}$"
        }
        n = data_to_add["keys"]["n"]
        keys = {}
    }
    const download_string = `<div style='text-align: center;'><a href='javascript:void(0)'<i value='${keytype}' id=${id} class="fa fa-download download-button icons-size" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'<i id=${id} class="fa fa-trash remove-button icons-size" aria-hidden="true"></i></a></div>`
    let second_var = ""
    if (keytype == "public") {
        if (add_data_from_view) {
            keys["e"] = $("#key-generation-public-key  span[for='e-generation-key']").html().trim()
            keys["n"] = n
        } else {
            keys = data_to_add["keys"]
        }
        second_var = `e = ${keys["e"]}`
    } else {
        if (add_data_from_view) {
            keys["d"] = $("#key-generation-private-key span[for='d-generation-key']").html().trim()
            keys["n"] = n
        } else {
            keys = data_to_add["keys"]
        }
        second_var = `d = ${keys["d"]}`
    }

    const string_key = `<div class='big-numbers'><div class='text-truncate'>${second_var}</div><div class='text-truncate'>n = ${keys["n"]}</div></div>`
    let new_data = {
        'id': id,
        'name': name,
        'keytype': keytype,
        'keytype_string': keytype_string,
        'keys': `${string_key}`,
        'date': get_curent_date_and_time(),
        'action': download_string,
        'keys_json': keys // will not show up im table. Its for download purpose only
    }
    all_data_in_table[id] = new_data
    load_keys_into_keyselect_element()
    id++

    return new_data
}

/**
 * Set keysparamaters like e or d in input
 * @param {*} this_select 
 */
function set_keys_from_contact(this_select) {
    let value = $(this_select).val()
    let data = all_data_in_table[value]
    if (!data) {
        $("#changeable-input-decryption").val("")
        $("#changeable-input-decryption").val("")
        $("#n-input-decryption").val("")
        set_blocklength_in_select_element()
        return false
    }

    let keys = data["keys_json"]
    let key_type = data["keytype"]

    let mode = $("input[name='decryption-modus']:checked").attr("id")

    if (mode == "encrypt-modus") {
        $("#changeable-input-decryption").val(keys["e"])
        $("#n-input-decryption").val(keys["n"])
    }
    else if (key_type == "private" && mode == "decrypt-modus") {

        $("#changeable-input-decryption").val(keys["d"])
        $("#n-input-decryption").val(keys["n"])
    }
    set_blocklength_in_select_element()
}

/**
 * 
 * @param {*} id 
 */
function remove_data_by_id(ids) {

    if (!Array.isArray(ids) || ids.length > 0) {
        if (!Array.isArray(ids) || ids.length == 1) {
            $("#delete-keys-numerus").html("${{rsa.DIDACTIC-KEY-SINGLE-KEY}}$")
        } else {
            $("#delete-keys-numerus").html("${{rsa.DIDACTIC-KEY-PLURAL-KEY}}$")
        }
        $('#delete-key-modal').modal('show');
    }
    else {
        $("#no-data-checked-for-deleting").attr("hidden", false)
        setTimeout(() => {
            $("#no-data-checked-for-deleting").attr("hidden", true)
        }, 5000)
        return
    }
    $("#delete-key-modal-button").unbind()
    $("#delete-key-modal-button").on("click", function () {
        if (!Array.isArray(ids)) {
            $table.bootstrapTable("removeByUniqueId", ids)
            delete all_data_in_table[ids]
        } else {
            if (ids.length == 0) {
                return 0
            }
            $table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            })
            $.each(ids, function (index, value) {
                delete all_data_in_table[value]
            })

        }
        load_keys_into_keyselect_element()
        $('#delete-key-modal').modal('hide')
    })

}
/**
 * 
 */
function load_keys_into_keyselect_element() {
    const all_data = all_data_in_table
    let amount_private_keys = 0
    let amount_public_keys = 0
    const select_array = $(".key-selection")
    select_array.empty()
    for (let i in all_data) {
        const data = all_data[i]
        if (data["keytype"] == "private") {
            $("#decrypt-contacts-dropdown").append(`<option value = "${data["id"]}"> ${data["name"]}</option>`)
            $("#decrypt-contacts-dropdown").val(data["id"])
            amount_private_keys++
        }
        else if (data["keytype"] == "public") {
            amount_public_keys++
            $("#encrypt-contacts-dropdown").append(`<option value = "${data["id"]}"> ${data["name"]}</option>`)
            $("#encrypt-contacts-dropdown").val(data["id"])
        }
    }
    if (amount_private_keys == 0) {
        $("#decrypt-contacts-dropdown").append('<option disabled hidden selected value="1">' + "${{rsa.DIDACTIC-ENC-PRIVATE-SELECT}}$" + '</option>')
    } if (amount_public_keys == 0) {
        $("#encrypt-contacts-dropdown").append('<option disabled hidden selected value="1">' + "${{rsa.DIDACTIC-ENC-PUBLIC-SELECT}}$" + '</option>')
    }
    $("#encryption-card-tab input:checked").click()
}


/**
 * 
 * @param {*} modus 
 */
const change_modus = (modus) => {
    $("#encryption-select li a").parent().remove()
    try {
        if (modus) {
            $("#changeable-input-decryption-label").html("e")
            $("#start-en-decryption-button").html('<i class="fa fa-lock" aria-hidden="true"></i>&nbsp;${{rsa.DIDACTIC-ENC-ENCRPYT}}$')
            $("#decrypt-contacts-dropdown").attr("hidden", true)
            $("#encrypt-contacts-dropdown").attr("hidden", false)
            set_keys_from_contact($("#encrypt-contacts-dropdown"))

        }
        else {
            $("#changeable-input-decryption-label").html("d")
            $("#start-en-decryption-button").html('<i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp;${{rsa.DIDACTIC-ENC-DECRYPT}}$')
            $("#encrypt-contacts-dropdown").attr("hidden", true)
            $("#decrypt-contacts-dropdown").attr("hidden", false)
            set_keys_from_contact($("#decrypt-contacts-dropdown"))
        }
    } catch (e) {
        return -1
    }
}

/**
 * 
 * @param {*} input_element_id 
 * @returns 
 */
async function set_blocklength_in_select_element(input_element_id = null) {
    $("#start-en-decryption-button").attr("disabled", false)

    let n = bigInt($("#n-input-decryption").val())
    let encode_type = $('#encodingmethod-select option:selected').attr("val")
    let alphabet_length;
    let alphabet_input_value = $(`input[name = 'alpahet-radio']:checked`).attr("value")
    let numeral_system_basis = bigInt($(`input[name = 'output-numeral-system']:checked`).attr("value"))
    // eliminate duplicates
    if (alphabet_input_value == "own-defined") {

        let alphabet = $("#alphabet").val();
        let alphabet_unique_array = Array.from(new Set(alphabet.split("")));
        if (alphabet.length <= 1) {
            $("#alphabet-length-danger-alert").attr("hidden", false)
            $("#start-en-decryption-button").attr("disabled", true)
            $("#alphabet-length").html($("#alphabet").val().length)
            setTimeout(() => {
                $("#alphabet-length-danger-alert").attr("hidden", true)
            }, 3000)
            return
        }
        if (alphabet != alphabet_unique_array.join("") && input_element_id == "alphabet") {
            let alphabet_array = alphabet.split("")
            let findDuplicates = alphabet_array.filter((item, index) => alphabet_array.indexOf(item) != index)
            let duplicates = (Array.from(new Set(findDuplicates)))
            $('#alphabet[data-toggle="popover"]').attr("data-content", duplicates);
            $('#alphabet[data-toggle="popover"]').popover("show");
            await Sleep(300);
            $("#alphabet").val(alphabet_unique_array.join(""))

            setTimeout(() => {
                $('#alphabet[data-toggle="popover"]').popover('dispose')
            }, 1000)

        }
        alphabet_length = bigInt($("#alphabet").val().length)

        $("#alphabet-length").html(alphabet_length.value)
    } else if (alphabet_input_value == "256-chars") {
        alphabet_length = bigInt(256)
    }
    // if n is not valid
    if (n.lesserOrEquals(0) || alphabet_length.lesserOrEquals(0)) return 0
    let pairs = calculate_max_blocksize(n, encode_type, alphabet_length, numeral_system_basis)
    // if(pairs ==  $("#blocklength").children().length) return
    $("#blocklength").empty()
    for (let i = 1; i <= pairs; i++) {
        $("#blocklength").append(`<option value = "${i}" > ${i}</option>`)
    }
    $(`#blocklength`).val($(`#blocklength option`).last().val());

}


/**
 * 
 * @param {String} encrypt 
 * @param {Int} pairs 
 * @param {Int} base 
 * @param {Boolean} text_type 
 */
const set_labels_for_textarea = (encrypt, pairs, base, text_type) => {
    const first_output = $(".form-group > label[for='input-seperation-en-decryption']")
    const second_output = $(".form-group > label[for='output-number-en-decryption']")
    const third_output = $(".form-group > label[for='output-en-decryption']")

    if (text_type && encrypt == "encrypt-modus") {
        first_output.html("${{rsa.DIDACTIC-ENC-INPUT-SEPARATED-IN-BLOCKS}}$ " + pairs)
        second_output.html("${{rsa.DIDACTIC-ENC-NUMERIC-REPRESENTATION}}$ " + base)
        third_output.html("${{rsa.DIDACTIC-ENC-NUMBER-ENCRYPTION-INTO-CIPHER}}$ c = m<sup>e</sup> mod n")
    } else if (text_type && encrypt == "decrypt-modus") {
        first_output.html("${{rsa.DIDACTIC-ENC-INPUT-SEPARATED-IN-BLOCKS}}$ " + pairs)
        second_output.html("${{rsa.DIDACTIC-ENC-NUMERIC-REPRESENTATION}}$ " + base)
        third_output.html("${{rsa.DIDACTIC-ENC-ENCRYPTED-TO-CIPHERTEXT}}$ m = c<sup>d</sup> mod n")
    } else if (!text_type && encrypt == "encrypt-modus") {
        first_output.html("${{rsa.DIDACTIC-ENC-NUMBER-ENCRYPTION-INTO-CIPHER}}$ c = m<sup>e</sup> mod n")
        second_output.html("${{rsa.DIDACTIC-ENC-NUMBER-ENCRYPTION-IN-BLOCKS}}$ " + pairs)
        third_output.html("${{rsa.VISUAL-CIPHERTEXT}}$ ")
    } else if (!text_type && encrypt == "decrypt-modus") {
        first_output.html("${{rsa.DIDACTIC-ENC-ENCRYPTED-TO-CIPHERTEXT}}$ m = c<sup>d</sup> mod n")
        second_output.html("${{rsa.DIDACTIC-ENC-NUMBER-DECRYPTION-IN-BLOCKS}}$ " + pairs)
        third_output.html("${{rsa.VISUAL-PLAINTEXT}}$ ")
    } else {
        first_output.html(``)
        second_output.html(``)
        third_output.html(``)
    }
}

/**
 * 
 */
async function RSA_en_decryption() {
    $("#warning-rsa-input").attr("hidden", true)
    $("#input-seperation-en-decryption").val("")
    $("#output-number-en-decryption").val("")
    $("#output-en-decryption").val("")
    const base_for_calculation = 10
    let input = ""
    let alphabet_length;
    const input_type = $("input[name='type-input-encryption-radio']:checked").attr("value")
    if (input_type == "manual") {
        input = $("#input-en-decryption").val()
    } else {
        const file = document.getElementById('get-file-for-encryption').files[0]
        await read_file_content(file).then(x => input = x)
    } input = input.replace(/(\r\n|\n|\r)/gm, "") // remove all line breaks
    const encode_type = $('#encodingmethod-select option:selected').attr("val")
    const seperation = $("#separation-select option:selected").attr("val")
    const encrypt = $("input[name='decryption-modus']:checked").attr("id")
    const alphabet_input_value = $(`input[name = 'alpahet-radio']:checked`).attr("value")
    const numeral_system_basis = bigInt($(`input[name = 'output-numeral-system']:checked`).attr("value"))
    const pairs = bigInt($("#blocklength").val(), base_for_calculation)
    const text_input_bool = $('#encryption-text-input-type').is(':checked')
    const sec_input = bigInt($("#changeable-input-decryption").val(), base_for_calculation)
    const n = bigInt($("#n-input-decryption").val(), base_for_calculation)

    if (alphabet_input_value == "own-defined") {
        var defined_alphabet = $("#alphabet").val().split("")
        alphabet_length = bigInt($("#alphabet").val().length, base_for_calculation)
        if (text_input_bool) {
            let input_array = Array.from(new Set(input.split("")));
            input = input.replace(new RegExp(`[^ ${defined_alphabet}]`, 'g'), '');
            let chars_not_in_alphabet = []
            input_array.map(x => {
                if (defined_alphabet.indexOf(x) == -1) {
                    const char_code = x.charCodeAt(0)
                    if (char_code === 32) chars_not_in_alphabet.push("' '")
                    else
                        chars_not_in_alphabet.push(x)
                }
            })
            if (chars_not_in_alphabet.length > 0) {
                let verb_1 = ""
                let verb_2 = ""
                if (chars_not_in_alphabet.length == 1) {
                    verb_1 = "${{rsa.DIDACTIC-ENC-SINGULAR-IS}}$"
                    verb_2 = "${{rsa.DIDACTIC-ENC-SINGULAR-CHAR}}$"
                }
                else {
                    verb_1 = "${{rsa.DIDACTIC-ENC-PLURAL-IS}}$"
                    verb_2 = "${{rsa.DIDACTIC-ENC-PLURAL-CHARS}}$"
                }
                $("#warning-rsa-input").html(`${chars_not_in_alphabet.join(', ')} ${verb_1}` + " ${{rsa.DIDACTIC-ENC-NOT-IN-ALPHABET}}$, " + `${verb_2} ` + "${{rsa.DIDACTIC-ENC-REMOVED}}$")
                $("#warning-rsa-input").attr("hidden", false)
                setTimeout(() => {
                    $("#warning-rsa-input").attr("hidden", true)
                }, 7000)
            }
        }
    } else if (alphabet_input_value == "256-chars") {
        alphabet_length = bigInt(256)
    }

    set_labels_for_textarea(encrypt, pairs, numeral_system_basis, text_input_bool)
    let basis_res
    if (encode_type == 2) {// basic
        let multiplier = bigInt(1);
        const basis = bigInt(10)
        let temp = bigInt(0)
        while (alphabet_length.greater(temp)) {
            temp = basis.pow(multiplier)
            multiplier++
        }
        basis_res = temp
    }
    // START THE EN-/ DECRYPTION
    if (text_input_bool) {
        // seperation -> char-pairs
        let seperation_array = [];
        // separation -> pairs to number
        let seperation_number_array = [];
        // output de/ encrypt
        let output = [];

        for (let i = 0; i < input.length; i += pairs) {
            let char_pair = input.substring(i, i + pairs).split("");
            seperation_array.push(char_pair.join(""));
            let iterator = 0;
            let temp_result = bigInt(0);
            for (let a = pairs - 1; a >= 0; a--) {
                let char_temp;
                if (!char_pair[iterator] && alphabet_input_value == 'own-defined') {
                    if (!defined_alphabet.includes(' ')) char_temp = alphabet_length; else char_temp = ' ';
                } else if (alphabet_input_value == "own-defined") {
                    char_temp = defined_alphabet.indexOf(char_pair[iterator]) == -1 ? "00" : defined_alphabet.indexOf(char_pair[iterator]);
                } else if (alphabet_input_value == "256-chars") {
                    char_temp = char_pair[iterator] ? char_pair[iterator].charCodeAt() : ' '.charCodeAt();
                }
                iterator++;
                if (encode_type == 1) {
                    // badisch
                    temp_result = bigInt(temp_result, base_for_calculation);
                    temp_result = temp_result.add(bigInt(char_temp).multiply(alphabet_length.pow(bigInt(a))));
                } else if (encode_type == 2) {
                    // basis 10
                    temp_result = bigInt(temp_result, base_for_calculation);
                    temp_result = temp_result.add(bigInt(char_temp).multiply(basis_res.pow(bigInt(a))));
                }
            }

            let numeric_rep = bigInt(temp_result, base_for_calculation).toString(numeral_system_basis);
            // for further calculation purpose
            temp_result = bigInt(bigInt(temp_result), base_for_calculation);
            let res = bigInt(temp_result.modPow(sec_input, n), base_for_calculation).toString(numeral_system_basis);
            const alphabet_digit_amount = alphabet_length.toString(numeral_system_basis).length;
            if ((encode_type == 1 || encode_type == 2) && numeric_rep.length < pairs * alphabet_digit_amount) {
                numeric_rep = '0'.repeat(pairs * alphabet_digit_amount - numeric_rep.length) + numeric_rep.toString(numeral_system_basis);
            }
            seperation_number_array.push(numeric_rep);

            output.push(res);
        }
        // SEPERATION
        $("#input-seperation-en-decryption").val(seperation_array.join(`${seperation} `));
        // ZAHLENDARSTELLUNG NACH B-ADISCH ODER BASIS ODER 3
        $("#output-number-en-decryption").val(seperation_number_array.join(`${seperation} `));
        // NUMBER OUTPUT AFTER EN/DECRYPTION
        $("#output-en-decryption").val(output.join(`${seperation} `));
    } else { // number-input
        input = input.replace(/ /g, '').split(`${seperation}`)
        // decrypted input
        let seperation_array = []
        // sep_array to text -> seperated
        let seperation_text_array = []
        const max_number = alphabet_length.pow(bigInt(pairs))
        for (let i = 0; i < input.length; i++) {
            try {
                // const iterator = encode_type == 1 || encode_type == 2 ? pairs : pairs < bigInt(input[i].length).divide(bigInt(alphabet_length - 1).toString(numeral_system_basis).length).plus(1) ? pairs : bigInt(input[i].length).divide(bigInt(alphabet_length - 1).toString(numeral_system_basis).length).plus(1)
                const iterator = pairs
                // TRY TO CONVERT INPUT NUMBER, IF NOT POSSIBLE Than CATCH AN ERROR
                let temp = bigInt(input[i], numeral_system_basis).toString(base_for_calculation)
                if (bigInt(temp).greaterOrEquals(n)) {
                    $("#input-seperation-en-decryption").val("Input has to be greater then n.")
                    return
                }
                let seperated_en_decrypted_number = bigInt(temp).modPow(sec_input, n)
                let numeric_represantation = bigInt(seperated_en_decrypted_number).toString(numeral_system_basis)
                const alphabet_digit_amount = alphabet_length.toString(numeral_system_basis).length


                seperation_array.push(numeric_represantation)
                // B-ADIC
                if (encode_type == 1 && seperated_en_decrypted_number.greater(max_number)) {
                    seperation_text_array = ["${{rsa.DIDACTIC-ENC-INVALID-INPUT}$"]
                    $("#download-message-button").prop("disabled", true)
                    break
                }
                else if (encode_type == 2 && seperated_en_decrypted_number.greater(basis_res.pow(iterator))) {
                    seperation_text_array = ["${{rsa.DIDACTIC-ENC-INVALID-INPUT}$"]
                    $("#download-message-button").prop("disabled", true)
                    break
                }


                let start_for_en_type_3 = 0
                let temp_array_for_pairs = []
                for (let a = 1; a <= iterator; a++) {
                    let sub_number
                    if (encode_type == 1) {
                        sub_number = bigInt(bigInt(sub_number, numeral_system_basis).toString(base_for_calculation))
                        sub_number = bigInt(seperated_en_decrypted_number).mod(alphabet_length.pow(bigInt(a))).toString(numeral_system_basis)
                    } else if (encode_type == 2) {
                        let expo = pairs - a
                        sub_number = bigInt(bigInt(sub_number, numeral_system_basis).toString(base_for_calculation))
                        sub_number = bigInt(seperated_en_decrypted_number).divide(basis_res.pow(bigInt(expo))).toString(numeral_system_basis)
                    }

                    let number_to_char
                    sub_number = bigInt(bigInt(sub_number, numeral_system_basis).toString(base_for_calculation))

                    if (encode_type == 1 && sub_number > alphabet_length) {
                        number_to_char = bigInt(sub_number).divide(alphabet_length.pow(a - bigInt(1)))
                    } else if (encode_type == 2 && sub_number.greaterOrEquals(alphabet_length)) {
                        number_to_char = bigInt(sub_number).mod(alphabet_length)
                    }
                    if (alphabet_input_value == "own-defined") {
                        temp_array_for_pairs.push(defined_alphabet[number_to_char])
                    } else if (alphabet_input_value == "256-chars") {
                        temp_array_for_pairs.push(String.fromCharCode(number_to_char))
                    }


                    if (encode_type == 1) {
                        seperated_en_decrypted_number = bigInt(seperated_en_decrypted_number).minus(sub_number)
                    }
                    else if (encode_type == 2) {
                        seperated_en_decrypted_number = bigInt(seperated_en_decrypted_number).minus(sub_number.multiply(basis_res.pow(pairs - a))).lesserOrEquals(0) ? bigInt(0) : bigInt(seperated_en_decrypted_number).minus(sub_number.multiply(basis_res.pow(pairs - a)))

                    }
                }
                if (encode_type == 1)
                    seperation_text_array.push(temp_array_for_pairs.reverse().join(""))
                else if (encode_type == 2)
                    seperation_text_array.push(temp_array_for_pairs.join(""))


            } catch (e) {
                const string = $(`label[for='${$(`input[name = 'output-numeral-system']:checked`).attr("id")}']`).html().toLowerCase() + " " + "numeral system"
                $("#warning-rsa-input").html(`Invalid input for ${string}`)
                $("#warning-rsa-input").attr("hidden", false)
                setTimeout(() => {
                    $("#warning-rsa-input").attr("hidden", true)
                }, 5000)

                $("#download-message-button").prop("disabled", true)
                return
            }
        }
        $("#input-seperation-en-decryption").val(seperation_array.join(`${seperation} `))
        $("#output-number-en-decryption").val(seperation_text_array.join(`${seperation} `))
        $("#output-en-decryption").val(seperation_text_array.join(""))
    }
    $("#download-message-button").prop("disabled", false)
}

/**
 * 
 * @param {bigInt} n 
 * @param {String} encode_type 
 * @param {Int} alphabet_length 
 */
const calculate_max_blocksize = (n, encode_type, alphabet_length) => {
    let expo = 1;
    if (encode_type == 1) {// b-adisch
        let temp = bigInt(alphabet_length).pow(bigInt(expo))
        while (temp.lesserOrEquals(bigInt(n))) {
            temp = (bigInt(alphabet_length).pow(bigInt(expo)))
            if (temp.greater(n)) {
                return expo - 1
            }
            expo++
        }
        return expo
    } else if (encode_type == 2) {
        // base
        let i = bigInt(0);
        let w = bigInt(0);
        alphabet_length = alphabet_length.minus(1);
        do {
            w = w.add((alphabet_length.minus(1)).add(bigInt(100).pow(i)));
            i = bigInt(i).add(1);
        } while (w.lesserOrEquals(n));
        return i.minus(1);
    }
}


/**
 * 
 * @param {*} value 
 */
function change_alphabet_input_element(value) {
    if (value == "own-defined") {
        $("#alphabet-length").html($("#alphabet").val().length)
        $("#alphabet").show()
    } else if (value == "256-chars") {
        $("#alphabet-length").html(256)
        $("#alphabet").hide()
    }
    set_blocklength_in_select_element()
}

/**
 * 
 * @returns 
 */
const valide_key_gen_inputs = async (input = "none") => {
    const coprime_to_phi = $("#e-has-to-be-coprime-to-phi-radio").is(":checked");
    input = input.split("-")[2];
    $("#keys-inputs-generation-wrapper .alert").attr("hidden", true);
    const p = bigInt($("#key-generation-p").val());
    const q = bigInt($("#key-generation-q").val());
    const e = bigInt($("#key-generation-e").val());
    let feedback_element;
    if (p.equals(0) && q.equals(0)) {

        $("#key-generation-public-key  span[for='e-generation-key']").html("");
        $("#key-generation-public-key  span[for='n-generation-key']").html("");
        $("#key-generation-private-key  span[for='d-generation-key']").html("");
        $("#key-generation-private-key  span[for='n-generation-key']").html("");
        $("#lcm-phi-generation #lcm").html(``);
        $("#lcm-phi-generation #phi").html(``);
        $(".key-generation-key-result").attr("hidden", true);
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-p").removeClass("is-valid");
        $("#key-generation-q").removeClass("is-valid");
        $("#key-generation-e").removeClass("is-invalid");
        $("#key-generation-p").removeClass("is-invalid");
        $("#key-generation-q").removeClass("is-invalid");
        $(".export-key-button-wrapper").prop("disabled", true);

        return 0;
    }
    let phi = 0;
    let lcm = 0;
    try {
        phi = phi_function(p, q);
        lcm = bigInt.lcm(p.minus(1), q.minus(1));
    } catch (error) {
        // do nothing, it will regulated beneath
    }
    let valid_input = true;
    let valid_p = false;
    let valid_q = false;
    if (!p.lesserOrEquals(0) && p.isPrime() && !p.equals(q)) {
        valid_p = true;
        $("#key-generation-p").addClass("is-valid");
        $("#key-generation-p").removeClass("is-invalid");
        if (input == "p") feedback_element = $("#didactic-p-is-prime");
    } else if ((!p.lesserOrEquals(0) && !p.isPrime() && !p.equals(q)) || p.equals(q)) {

        if (input == "p") {
            if (!p.isPrime() || p.lesserOrEquals(0)) {
                feedback_element = $("#didactic-p-is-not-prime");
            } else if (p.equals(q)) {
                feedback_element = $("#p-and-q-same-input-alert");
            }
        }
        valid_input = false;
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-p").addClass("is-invalid");
        valid_input = false;
    } else {

        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-p").removeClass("is-valid");
        $("#key-generation-e").removeClass("is-invalid");
        $("#key-generation-p").removeClass("is-invalid");

    }
    if (!q.lesserOrEquals(0) && q.isPrime() && !q.equals(p)) {
        valid_q = true;
        $("#key-generation-q").addClass("is-valid");
        $("#key-generation-q").removeClass("is-invalid");
        if (input == "q") feedback_element = $("#didactic-q-is-prime");
    } else if ((!q.lesserOrEquals(0) && !q.isPrime() && !q.equals(p)) || q.equals(p)) {
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-q").removeClass("is-valid");
        $("#key-generation-e").addClass("is-invalid");
        $("#key-generation-q").addClass("is-invalid");
        if (input == "q") {
            if (!q.isPrime() || q.lesserOrEquals(0)) {
                feedback_element = $("#didactic-q-is-not-prime");
            } else if (q.equals(p)) {
                feedback_element = $("#p-and-q-same-input-alert");
            }
        }
        valid_input = false;
    } else {
        $("#key-generation-q").removeClass("is-valid");
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-q").removeClass("is-invalid");
        $("#key-generation-e").removeClass("is-invalid");
        valid_input = false;
    }
    let number_to_for_e_to_be_coprime = 0;
    if (valid_p && valid_q) {
        $("#lcm-phi-generation #lcm").html(lcm.value);
        $("#lcm-phi-generation #phi").html(phi.value);
        number_to_for_e_to_be_coprime = coprime_to_phi ? phi : lcm;
        const coprime_number = find_random_coprime(1, number_to_for_e_to_be_coprime, number_to_for_e_to_be_coprime);
        $("#insert-e-auto-btn").attr("e-value", coprime_number.value);
        $("#insert-e-auto-btn, #key-generation-e").prop("disabled", false);
    } else {
        $("#lcm-phi-generation #lcm").html("");
        $("#lcm-phi-generation #phi").html("");
        $("#insert-e-auto-btn, #key-generation-e").prop("disabled", true);
    }
    if (valid_p && valid_q && e.greater(number_to_for_e_to_be_coprime)) {

        //BIGGER PHI OR LCM
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-e").addClass("is-invalid");
        if (input == "e") feedback_element = $("#didactic-e-is-greater-phi-or-lcm");
        valid_input = false;
    } else if (valid_p && valid_q && !e.lesserOrEquals(0) && check_coprime(e, number_to_for_e_to_be_coprime)) {
        $("#key-generation-e").addClass("is-valid");
        $("#key-generation-e").removeClass("is-invalid");
        if (input == "e") feedback_element = $("#didactic-e-is-coprime");
    } else if (valid_p && valid_q && !check_coprime(e, number_to_for_e_to_be_coprime) && !e.lesserOrEquals(0)) {
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-e").addClass("is-invalid");
        if (input == "e") feedback_element = $("#didactic-e-is-not-coprime");
        valid_input = false;
    } else {
        $("#key-generation-e").removeClass("is-valid");
        $("#key-generation-e").removeClass("is-invalid");
        valid_input = false;
    }
    if (p.isPrime() && q.isPrime() && valid_input & !e.equals(0)) {
        const n = p.multiply(q);
        let d;
        try {
            d = bigInt(e).modInv(bigInt(number_to_for_e_to_be_coprime));
            if (d.lesser(0)) {
                d = number_to_for_e_to_be_coprime.add(d);
            }
        } catch (ex) {
            d = bigInt(e).modInv(bigInt(number_to_for_e_to_be_coprime));
        }
        $("#key-generation-public-key  span[for='e-generation-key']").html(e.value);
        $("#key-generation-public-key  span[for='n-generation-key']").html(n.value);
        $("#key-generation-private-key  span[for='d-generation-key']").html(d.value);
        $("#key-generation-private-key  span[for='n-generation-key']").html(n.value);

        $(".key-generation-key-result").attr("hidden", false);
        $(".export-key-button-wrapper").prop("disabled", false);
    } else {
        $("#key-generation-public-key  span[for='e-generation-key']").html("");
        $("#key-generation-public-key  span[for='n-generation-key']").html("");
        $("#key-generation-private-key  span[for='d-generation-key']").html("");
        $("#key-generation-private-key  span[for='n-generation-key']").html("");

        $(".key-generation-key-result").attr("hidden", true);
        $(".export-key-button-wrapper").prop("disabled", true);
    }
    if (feedback_element != undefined) {
        feedback_element.attr("hidden", false);
        return setTimeout(() => {
            feedback_element.attr("hidden", true);
        }, 5000);
    }
};
/**
 * 
 * @param {*} milliseconds 
 * @returns 
 */
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
/**
 * 
 */
function download_message() {
    $('#download-message-modal').modal('show');
    $("#download-message-modal-button").unbind()
    $("#filename").unbind()
    $("#download-message-modal-button").on("click", function (e) {
        $("#download-message-form , #download-message-form input[required], #download-message-form textarea[required]").on("submit input", function (e) {
            e.preventDefault()
            const valid = add_submit_form("download-message-form", e)
            if (valid && e.type == "submit") {
                const message_to_download = $("#output-en-decryption").val()
                dowload(message_to_download, $("#filename").val())
            } else if (e.type == "input") {
                $("#download-message-form input[required]").unbind()
                $("#download-message-form textarea[required]").unbind()
            }
            $("#download-message-form").unbind()
        })
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} keytype 
 * @returns 
 */
const prepare_key = (id, keytype = "public") => {

    let data = all_data_in_table[id]

    let keys = {}
    let download_data = { 'name': data['name'], 'keytype': keytype, }
    if (keytype == "public") {
        keys["e"] = data["keys_json"]["e"]
        keys["n"] = data["keys_json"]["n"]

    } else if (keytype == "private") {
        keys["d"] = data["keys_json"]["d"]
        keys["n"] = data["keys_json"]["n"]
        keys["e"] = data["keys_json"]["e"]

    }
    download_data["keys"] = keys
    let download_string = []
    download_string[0] = download_data

    return download_string[0]
}

/**
 * 
 * @returns 
 */
const dowload_selected_data_to_file = () => {
    let download_string = []
    let ids = getIdSelections()
    if (ids.length < 1) {
        $("#no-data-checked-for-export").attr("hidden", false)
        setTimeout(() => {
            $("#no-data-checked-for-export").attr("hidden", true)
        }, 3000)
        return 0
    }
    for (let i in ids) {
        let id = ids[i]
        download_string[i] = prepare_key(id, all_data_in_table[id]["keytype"])
    }
    if (download_string.length == 1) {
        const data = download_string[0]
        let file_name
        if (data["keytype"] == "public") {
            file_name = `${data['name']}.pkr`
        } else {
            file_name = `${data['name']}.scr`
        }
        dowload(JSON.stringify(download_string), file_name, "application/json")
    } else {
        dowload(JSON.stringify(download_string), "keyring_selected.asc", "application/json")
    }

}
/**
 * 
 * @param {*} id 
 * @param {*} keytype 
 */
const download_key = (id, keytype) => {
    const data = prepare_key(id, keytype)
    let file_name = ""
    if (data["keytype"] == "public") {
        file_name = `${data['name']}.pkr`
    } else {
        file_name = `${data['name']}.scr`
    }
    dowload(JSON.stringify([data]), file_name, "application/json")
}



/**
 * 
 * @param {*} file 
 * @param {*} case_ 
 */
const upload_file = async (file) => {
    const all_files = await file.files
    for (let i = 0; i < all_files.length; i++) {
        read_file_content(all_files[i], false).then(x => {
            try {
                x = JSON.parse(x)

                for (let i in x) {
                    $table.bootstrapTable("append", add_data(false, x[i]))
                    $table.bootstrapTable('scrollTo', 'bottom')
                }
                $(file).val("")
            }
            catch (error) {
                $("#invalid-json-alert #invalid-filename").html(`${all_files[i].name}`)
                $("#invalid-json-alert").attr("hidden", false)
                setTimeout(() => {
                    $("#invalid-json-alert").attr("hidden", true)
                }, 3000)
                $(file).val("")
            }

        })
    };
}

/**
 * 
 * @param {*} element_clicked 
 */
const submit_key = (element_clicked, e) => {
    if (e.type == "click" && element_clicked.attr("type") == "button") {
        const valid = add_submit_form("key-generation-form", e)
        if (valid) {
            if (element_clicked.attr('id') == "import-keypair") {
                $table.bootstrapTable("append", add_data(true))
                $table.bootstrapTable("append", add_data(true, null, false))
                $table.bootstrapTable('scrollTo', 'bottom')
            }// PRIVATE KEY
            else if (element_clicked.attr('id') == "add-key-to-table-button") {
                $table.bootstrapTable("append", add_data(true))
                $table.bootstrapTable('scrollTo', 'bottom')
            }
            else {
                $table.bootstrapTable("append", add_data(true, null, false))
                $table.bootstrapTable('scrollTo', 'bottom')
            }
            $("#key-added-success-alert").attr("hidden", false)

            $(".export-key-button-wrapper").prop("disabled", true)
            setTimeout(() => {
                $("#key-added-success-alert").attr("hidden", true)
                valide_key_gen_inputs()
            }, 1000)
        }
    } else if (e.type == "input") {
        element_clicked.removeClass("is-invalid")
    }
}

/** EVENTS */

/**Encryption Tab */
$("#encryption-card-tab input[name='decryption-modus']").on("click", function () {
    const id = this.id
    if (id == "encrypt-modus") {
        change_modus(true)
    } else {
        change_modus(false)
    }
})

$("#download-message-button").on("click", () => {
    download_message()
})

$("#start-en-decryption-button , #didactic-encryption-form input[required] , #didactic-encryption-form textarea[required]").not("#get-file-for-encryption").on("click input", function (e) {
    e.preventDefault()
    const key_exist = $("#n-input-decryption").val().length > 0 && $("#changeable-input-decryption").val().length > 0
    if (!key_exist) {
        $("#keypair-is-not-valid-alert").attr("hidden", false)
        $("body").scrollTop($("#keypair-is-not-valid-alert").position().top);
        setTimeout(() => {
            $("#keypair-is-not-valid-alert").attr("hidden", true)
        }, 3000)
        return
    }
    if (e.type == "click" && $(this).attr("type") == "click" && key_exist) {
        const valid = add_submit_form("didactic-encryption-form", e)
        if (valid)
            RSA_en_decryption()
    } else if (e.type == "input") {
        $(this).removeClass("is-invalid")
    }
})

$("#input-en-decryption").on("input", () => {
    set_labels_for_textarea()
    $(".en-decrypt-textarea").each(function () {
        $(this).val("")
    });
    $("#download-message-button").prop("disabled", true)
})

$("#encryption-card-tab #n-input-decryption, #encryption-card-tab #alphabet").on("input", function () {
    set_blocklength_in_select_element($(this).attr("id"))
})

$("#alphabet-all-256-chars, #alphabet-own-defined").on("input", function () {
    change_alphabet_input_element(this.value)
})

$("#encryption-card-tab #encodingmethod-select").on("change", function () {
    set_blocklength_in_select_element()
})

$("#encryption-card-tab input[name='output-numeral-system']").on("click", function () {
    set_blocklength_in_select_element()
})

$(".key-selection").on("change", function () {
    set_keys_from_contact(this)
})

$("input[name='type-input-encryption-radio']").on("click", function () {
    if (this.id == "manual-input-encryption-radio") {
        $("#file-input-en-decryption").attr("hidden", true)
        $("#text-input-en-decryption").attr("hidden", false)

        $("#input-en-decryption").prop("disabled", false)
        $("#get-file-for-encryption").prop("disabled", true)
    } else {
        $("#file-input-en-decryption").attr("hidden", false)
        $("#text-input-en-decryption").attr("hidden", true)
        $("#input-en-decryption").prop("disabled", true)
        $("#get-file-for-encryption").prop("disabled", false)
    }
})

document.getElementById('get-file-for-encryption').addEventListener('change', function (e) {
    const fileName = this.files[0].name;
    this.classList.remove("is-invalid");
    const nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileName
})

/**Key generation Tab */

$("input[name='e-has-to-be-coprime-to']").change(function () {
    $(".e-has-to-be-coprime-to-filler").html($(this).attr("value"))
    valide_key_gen_inputs("key-generation-e")
})

$("#keygeneration-tab #key-generation-primes-button").on("click", async function (event) {
    $("#keys-inputs-generation-wrapper .alert").attr("hidden", true)
    let progres_input = false
    await $("#keys-inputs-generation-wrapper .key-generation-input").each(async function () {
        if ($(this).val() !== "") {
            progres_input = true
            return false
        }
    })
    const min = bigInt($("#minimum-prime-key-generation").val())
    const max = bigInt($("#maximum-prime-key-generation").val())
    if (max.lesser(min) || max.lesserOrEquals(1) || min.lesserOrEquals(0)) {
        event.stopPropagation()
        $("#min-max-not-valid").attr("hidden", false)
        setTimeout(() => {
            $("#min-max-not-valid").attr("hidden", true)
        }, 1000)
        return 0
    }
    let keys = get_rand_key(min, max, $("#e-has-to-be-coprime-to-phi-radio").is(":checked"))
    if (keys == -1 || keys["p"].multiply(keys["q"]).lesserOrEquals(6)) {
        event.stopPropagation()
        $("#min-max-not-valid").attr("hidden", false)
        setTimeout(() => {
            $("#min-max-not-valid").attr("hidden", true)
        }, 1000)
        return 0
    }
    while (keys["p"].multiply(keys["q"]).lesserOrEquals(6)) {
        keys = get_rand_key(min, max, $("#e-has-to-be-coprime-to-phi-radio").is(":checked"))
    }
    new Promise((resolve, reject) => {

        if (progres_input) {
            event.stopPropagation()
            $("#key-generation-overwrite-input-alert").prop("hidden", false)
            $("#key-generation-overwrite-input-yes").on("click", () => {
                clearTimeout(warning_overwrite_key)
                $("#key-generation-overwrite-input-alert").prop("hidden", true)
                resolve("overwrite")
            })
            $("#key-generation-overwrite-input-no").on("click", () => {
                clearTimeout(warning_overwrite_key)
                $("#key-generation-overwrite-input-alert").prop("hidden", true)
                reject("no overwrite")
            })
            warning_overwrite_key = setTimeout(() => {
                $("#key-generation-overwrite-input-alert").prop("hidden", true)
            }, 8000)
        } else {
            resolve("no input, so write")
        }
    }).then(() => {
        $("#key-generation-p").val(keys["p"])
        $("#key-generation-q").val(keys["q"])
        $("#key-generation-e").val(keys["e"])
        valide_key_gen_inputs()

    }).catch(error => {
        //
    })

})
$("#insert-e-auto-btn").on("click", function () {
    $("#keys-inputs-generation-wrapper .alert").attr("hidden", true)
    // find coprime to phi
    if ($(this).attr("e-value") == "-1") {
        $("#didactic-no-e-coprime-to").prop("hidden", false)
        setTimeout(() => {
            $("#didactic-no-e-coprime-to").prop("hidden", true)
        }, 4000)
        return
    }
    $("#key-generation-e").val($(this).attr("e-value"))
    valide_key_gen_inputs()

})

$(".export-key-button, #key-generation-name").on("click input", function (e) {
    e.preventDefault()
    submit_key($(this), e)
})

$("#clear-key-inputs-button").on("click", () => {
    $("#keys-inputs-generation-wrapper input").not("#generate-key-button-wrapper input").val("")
    valide_key_gen_inputs()
})


$("#keys-inputs-generation-wrapper input[type='number']").on("input", function () {
    clearTimeout(alert_key_gen_id)
    valide_key_gen_inputs(this.id).then(x => {
        alert_key_gen_id = x
    })
})
/**Keys tab */

$("#keys-tab #upload-file-input").on("input", function () {
    upload_file(this)

})

$("#keys-tab #export-selected-keys-button").on("click", function () {
    dowload_selected_data_to_file()
})

$("#keys-tab #delete-selected-keys-button").on("click", function () {
    remove_data_by_id(getIdSelections())
})

$("#keys-tab #table").on("click", ".remove-button", function () {
    remove_data_by_id(this.id)
})

$("#keys-tab #table").on("click", ".download-button", function () {
    download_key($(this).attr("id"), $(this).attr("value"))
})

/**
 * ENABLA THE TOGGLE BETWEEN THE CARD-TABS
 */
$('#encryption-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')

    // avoid height bug for table view
    if ($(this).attr("aria-controls") == "keys-tab")
        $table.bootstrapTable('resetView')
})
