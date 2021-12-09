/**
 * THIS FILE IS FOR THE HANDLING OF OPENSSL INPUTS AND EVENTS IN THE TAB RSA-REAL-USE
 */
import OpenSSL from "./openssl.js"
import read_file_content from "../utilities/upload.js";
import dowload from "../utilities/download.js";
import { get_curent_date_and_time } from "../utilities/date.js";
import { build_genrsa, build_rsa, build_req, build_x509, build_pkeyutl } from "./commandBuilder.js";
import { add_submit_form } from "../utilities/validation.js";



const files_loaded = {}
const cmd_history = { cmd: [], current_input: "", index: 0 }
let last_generated_key = null
let last_generated_pub_key = null
let last_generated_certifikate = null
let wasm_modul = null

$(function () {
    edit_config_view('add_section', $([]), "req")
})

/**
 * 
 * @param {*} obj_key 
 * @param {String} action 
 */
async function adjust_filesystem(file, action) {
    const filename = file.name.replace(/ /g, '');
    const select = $(".file-select")
    switch (action) {
        case "delete":
            // 
            if (file == last_generated_key) {
                last_generated_key = null
                last_generated_pub_key = null
                $(".key-pair-button").prop("hidden", true)
                $("#key-public-button").prop("disabled", true)
                $("#generate-dropdown-menu").attr("hidden", false)
                $("#after-generate-dropdown-menu").attr("hidden", true)
            } else if (file == last_generated_pub_key) {
                last_generated_pub_key = null
                $("#key-public-button").prop("disabled", true)
                $("#generate-dropdown-menu").attr("hidden", false)
                $("#after-generate-dropdown-menu").attr("hidden", true)
            } else if (file == last_generated_certifikate) {
                last_generated_certifikate = null
                $(".certificate-pair-button").prop("hidden", true)
            }
            select.each(function () {
                $(this).children(`option[value='${filename}']`).remove()
                if ($(this).children().length < 1) {
                    $(this).empty()
                    $(this).append('<option value="" disabled="" hidden="" selected>${{rsa.REAL-USE-SELECT}}$...</option>')
                }
            })
            delete files_loaded[filename]
            $(`#uploaded-files-collapse input[value='${filename}']`).parent().remove()
            break
        case "add":
            $("#file-upload-info").html("")
            $("#file-upload-info").attr("hidden", false)
            if (files_loaded[filename]) {
                await adjust_filesystem(files_loaded[filename], "delete")
                await Sleep(400)
            }
            $("button[data-target='#uploaded-files-collapse']").html('<i class="fa fa-circle-o-notch fa-spin  fa-fw"></i>')

            files_loaded[filename] = file
            $("#file-upload-info").html("${{rsa.REAL-USE-CHECKING-RSA-KEY}}$")
            const is_key = await check_file_is_rsa_key(filename)
            let is_cer = false
            if (!is_key) {
                $("#file-upload-info").html("${{rsa.REAL-USE-CHECKING-CER}}$")
                is_cer = await check_file_is_x509_cer(filename)
            }
            select.each(function () {
                $(this).removeClass("is-invalid")
                // only rsa-key-file are added to the select element(id: laoded-files-real-use-select)
                if ($(this).attr("id") == "laoded-files-real-use-select" || $(this).attr("id") == "private-key-for-cer-select") {
                    if (($(this).attr("id") == "laoded-files-real-use-select" && is_key) || ($(this).attr("id") == "private-key-for-cer-select" && is_key === "private")) {
                        $(this).children(`option[value='']`).remove()
                        if ($(this).children().length == 1) {
                            $(this).append(`<option value='${filename}' selected>${filename}</option>`)
                        }
                        else {
                            $(this).append(`<option value='${filename}'>${filename}</option>`)
                        }
                    }
                } else {
                    $(this).children(`option[value='']`).remove()
                    if ($(this).children().length == 1) {
                        $(this).append(`<option value='${filename}' selected>${filename}</option>`)
                    }
                    else {
                        $(this).append(`<option value='${filename}'>${filename}</option>`)
                    }
                }
            })
            let html_section = `<div class="mt-2 mb-2 input-group"><div class="input-group-prepend" value="${filename}"><button type="button" class="btn btn-outline-secondary delete-file"><i class="fa fa-trash"></i></button><button data-text="Test" type="button" class="btn btn-outline-secondary download-file"><i class="fa fa-download"></i></button></div><input disabled="" class="form-control" value="${filename}"><div class="input-group-append"><span class="input-group-text">${get_curent_date_and_time()}</span></div></div>`
            if (is_key)
                html_section = `<div class="mt-2 mb-2 input-group"><div class="input-group-prepend" value="${filename}"><button type="button" class="btn btn-outline-secondary delete-file"><i class="fa fa-trash"></i></button><button data-text="Test" type="button" class="btn btn-outline-secondary download-file"><i class="fa fa-download"></i></button><button value="${is_key}" type="button" class="btn btn-outline-secondary get-key-info"><i class="fa fa-info" aria-hidden="true"></i></button></div><input disabled="" class="form-control" value="${filename}"><div class="input-group-append"><span class="input-group-text">${get_curent_date_and_time()}</span></div></div`
            else if (is_cer)
                html_section = `<div class="mt-2 mb-2 input-group"><div class="input-group-prepend" value="${filename}"><button type="button" class="btn btn-outline-secondary delete-file"><i class="fa fa-trash"></i></button><button data-text="Test" type="button" class="btn btn-outline-secondary download-file"><i class="fa fa-download"></i></button><button type="button" class="btn btn-outline-secondary get-certificate-info"><i class="fa fa-info" aria-hidden="true"></i></button></div><input disabled="" class="form-control" value="${filename}"><div class="input-group-append"><span class="input-group-text">${get_curent_date_and_time()}</span></div></div`
            $("#uploaded-files-collapse").append(html_section)
            $("#file-upload-info").attr("hidden", true)
            break
    }
    const count = Object.keys(files_loaded).length;

    $("button[data-target='#uploaded-files-collapse']").html('<i class="fa fa-chevron-down"></i>')
    if (count >= 1) {
        $("#input-file-real-use-label").html("${{rsa.REAL-USE-SELECT-FILE}}$" + `...<span class="badge badge-pill badge-secondary">${count}</span>`)
        $('#uploaded-files-collapse').collapse("show")
    } else {
        $("#input-file-real-use-label").html("${{rsa.REAL-USE-SELECT-FILE}}$" + `...`)
        $('#uploaded-files-collapse').collapse("hide")
    }
}

/**
 * 
 * @param {*} args_array 
 * @returns 
 */
function get_file_in_param_array(args_array) {
    return args_array[args_array.indexOf('-in') + 1];
}



/**
 * 
 * @param {*} args_array 
 * @returns 
 */
function get_file_out_param_array(args_array) {
    if (args_array[args_array.indexOf('-out')]) {
        return args_array[args_array.indexOf('-out') + 1];
    } else {
        return null;
    }
}
/**
 * 
 * @returns 
 */
async function fetch_wasm_Binary() {
    var _window$CTO_Globals;
    const baseUrl = ((_window$CTO_Globals = window.CTO_Globals) == null ? void 0 : _window$CTO_Globals.pluginRoot) || window.location.href;
    try {
        return fetch(`${baseUrl}resources/wasm/openssl.wasm`)
            .then((response) => response.arrayBuffer())
            .then((bytes) => {
                return WebAssembly.compile(bytes);
            });
    } catch (e) {
        return null
    }
}
/**
 * 
 * @param {*} args 
 * @returns 
 */
async function convert_args_to_array(args) {
    return args.split(/[\s]{1,}/g).filter(Boolean);
}
/**
 * 
 * @param {*} file 
 */
async function process_new_file(file) {
    // delete all spaces in filename
    const filename = file.name.replace(/ /g, '');
    if (files_loaded[filename]) {
        // RETURNS TRUE IF FILE OVERWRITEN OR NEW FILE ADDED
        return new Promise(function (resolve, reject) {
            $("#duplicate-file-modal").modal('show');
            $("#duplicate-file-modal #filename-for-overwrite").html(filename)
            $("#duplicate-file-modal-button").unbind()
            $("#exit-file-overwrite-modal").unbind()
            // return false || true if overwritten
            $("#duplicate-file-modal-button").on("click", async function (e) {
                $("#duplicate-file-modal").modal('hide');
                await adjust_filesystem(file, "add")
                resolve(true)// OVERWRITTEN
            })
            $("#exit-file-overwrite-modal").on("click", () => {
                $("#duplicate-file-modal").modal('hide');
                resolve(false)// NOT OVERWRITTEN
            })
        })
    } else {
        // NEW FILE WITH NEW NAME
        await adjust_filesystem(file, "add")
        return true // NEW FILE ADDED
    }
}

/**
 * 
 * @param {*} res_subject 
 * @param {*} args 
 */
const set_result_into_command_line = async (res_subject, args) => {
    args = args.trim()
    $(".CommandLine .CommandLine-output").html(`<p class="CommandLine-command">$ ${args}</p><p>${res_subject.stderr}${res_subject.stdout}</p>`)
    // Add cmd to history
    if (args != cmd_history.cmd[cmd_history.cmd.length - 1])
        cmd_history.cmd.push(args)
    cmd_history.index = cmd_history.cmd.length
    $(".CommandLine input").val(cmd_history.current_input)
}
/**
 * 
 * @param {*} file 
 * @returns 
 */
async function get_byte_array(file) {
    const fileReader = new FileReader();
    return new Promise(function (resolve, reject) {
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function (event) {
            const array = new Uint8Array(event.target.result);
            const fileByteArray = [];
            for (let i = 0; i < array.length; i++) {
                fileByteArray.push(array[i]);
            }
            resolve(array);
        };
        fileReader.onerror = reject;
    });
}

/**
 * 
 * @param {*} args 
 * @param {*} text 
 * @param {*} pem 
 */
const run_openssl = async (args, text = "", file = null) => {
    let char_index = 0;
    let input_text = false;
    let files_to_write = []
    let error = null;
    const error_stdin = 'Standard stream (stdin) not available!'
    const error_input = 'Commands with user-inputs are currently not available!'
    return new Promise(async function (resolve, reject) {
        if (!wasm_modul) {
            wasm_modul = fetch_wasm_Binary()
            if (wasm_modul == null) {

                return false
            }
        }
        if (text && Object.prototype.toString.call(text) === '[object String]') {
            input_text = true;
            text = !text.endsWith('\\n')
                ? text.split('\\n').join('\n').concat('\n')
                : text.split('\\n').join('\n');
        }
        if (file) {
            for (const [key, value] of Object.entries(file)) {
                const byte_array = await get_byte_array(value)
                files_to_write.push({ name: key, buffer: byte_array })
            }
        }
        const output = { stdout: '', stderr: '', files: null };
        const args_array = await convert_args_to_array(args)
        const moduleObj = {
            thisProgram: 'openssl',
            instantiateWasm: function (imports, successCallback) {
                wasm_modul.then((module) => {
                    WebAssembly.instantiate(module, imports).then(successCallback);
                });
                return {};
            },

            stdin: input_text
                ? function () {
                    if (char_index < text.length) {
                        let code = text.charCodeAt(char_index);
                        ++char_index;
                        return code;
                    }
                    return null;
                }
                : function () {
                    error = new Error(error_stdin);
                    return undefined;
                },

            print: function (line) {
                output.stdout += line + '\n';
            },
            printErr: function (line) {
                output.stderr += line + '\n';
            },

        };
        OpenSSL(moduleObj).then((instance) => {

            let exited_m_time = 0

            if (files_to_write) {
                files_to_write.forEach((file) => {

                    instance['FS'].writeFile(file.name, file.buffer);
                    if (file.name === get_file_out_param_array(args_array)) {
                        /**
                         * Reason for this: to compare the times aftewards, if the file was overwritten in the intern filesystem
                         */
                        instance["FS"].utime(file.name, Date.now(), Date.now() + 36000000)
                        exited_m_time = instance["FS"].stat(file.name).mtime

                    }
                });
            }

            const original_prompt = window.prompt // THIS FUNCTION GETS EXECUTED FOR USER-INPUT, look at openssl.js
            window.prompt = () => {
                if (!error) {
                    error = new Error(error_input);
                }
                return
            }
            instance.callMain(args_array)
            window.prompt = original_prompt
            if (error) throw error;
            if (get_file_out_param_array(args_array)) {
                const m_time = instance["FS"].stat(get_file_out_param_array(args_array)).mtime.valueOf()
                if (exited_m_time > m_time || exited_m_time == 0) {
                    const read_file_buffer = instance['FS'].readFile(get_file_out_param_array(args_array), {
                        encoding: 'binary',
                    });
                    output.files = new File([read_file_buffer], get_file_out_param_array(args_array), {
                        type: 'application/octet-stream'
                    });
                }
            }
        }).catch((error) => {
            output.files = null
            if (error.message == error_input || error.message == error_stdin) {
                output.stdout = '';
                output.stderr = `${error.name}: ${error.message}`;
            }
        }).finally(() => {
            resolve({ output: output })
        })
    })
}
/**
 * 
 * @param {*} start 
 */
async function set_animation(start) {
    if (start)
        $(".CommandLine-output").html(`<div style='height: inherit; color:white' class='d-flex justify-content-center align-items-center'><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div>`)
    else
        $(".CommandLine-output").html(``)
    await Sleep(50)
    return "end"
}


/**
 * 
 * @param {*} command 
 * @returns 
 */
async function run_openssl_wrapper(command, run_in_background = false) {
    if (!run_in_background)
        await set_animation(true)
    return new Promise(function (resolve, reject) {
        const pipe = command_pipe(command)
        if (Object.keys(pipe).length === 1 && Object.keys(pipe).includes('echo')) {
            if (!run_in_background)
                set_result_into_command_line({ stdout: pipe.echo, stderr: '' }, Object.entries(pipe)[0].join(' ').trim())
            return
        }
        if (
            Object.keys(pipe).length === 2 &&
            Object.keys(pipe).includes('echo') &&
            !Object.keys(pipe).includes('openssl')
        ) {
            if (!run_in_background)
                set_result_into_command_line({
                    stdout: '', stderr: 'Unknown command!', file: null
                }, Object.entries(pipe)[0].join(' ').trim())
            return;
        }
        // Here OpenSSL gets executed
        if (Object.keys(pipe).includes('openssl')) {
            if (!pipe.openssl) pipe.openssl = 'help';
            run_openssl(pipe.openssl, pipe.echo, files_loaded).then(
                (openssl_result) => {
                    if (!run_in_background)
                        set_result_into_command_line(openssl_result.output, command)
                    if (openssl_result.output.files) {
                        const files = openssl_result.output.files
                        process_new_file(files).then(x => {
                            resolve({ overwritten: x, last_generated_file: files, output: openssl_result })
                        })
                    } else {
                        resolve(openssl_result)
                    }
                },
            ).catch(e => { reject(null) })
        } else {
            if (!run_in_background)
                set_result_into_command_line({
                    stdout: '', stderr: 'Unknown command!', file: null
                }, Object.entries(pipe)[0].join(' ').trim())
            return;
        }
    })
}
/**
 * 
 * @param {*} filename 
 * @returns 
 */
async function check_file_is_rsa_key(filename) {
    const obj = {
        pubin: false,
        in: filename,
        text: true,
        noout: true
    }
    const private_key_test = "Private-Key: ("
    const public_key_test = "Public-Key: ("
    let command = build_rsa(obj)
    const openssl_result = (await run_openssl_wrapper(command, true)).output.stdout
    if (openssl_result.indexOf(private_key_test) !== -1)
        return "private"

    else {
        obj.pubin = true
        command = build_rsa(obj)
        const openssl_result = (await run_openssl_wrapper(command, true)).output.stdout
        if (openssl_result.indexOf(public_key_test) !== -1) {
            return "public"
        }
        return null
    }
}
/**
 * 
 * @param {*} filename 
 * @returns 
 */
const check_file_is_x509_cer = async (filename) => {
    const obj = {
        in: filename,
        text: true,
        noout: true
    }
    const certificate_1 = "Certificate:"
    const certificate_2 = "Signature Algorithm:"
    const command = await build_x509(obj)
    const openssl_result = (await run_openssl_wrapper(command, true)).output.stdout
    if (openssl_result.indexOf(certificate_1) !== -1 && openssl_result.indexOf(certificate_2) !== -1) {
        return true
    }
    return false

}

/**
 * 
 * @param {*} input 
 * @returns 
 */
const command_pipe = (input) => {
    const commands = input.split('|').map((command) => command.trim());

    const pipe = {};
    for (const command of commands) {
        const tokens = command.split(' ');
        const programm = tokens.shift();
        const args = tokens.join(' ');

        pipe[programm] = args;
    }

    return pipe;
};

/**
 * 
 * @param {*} action 
 * @param {*} button 
 * @param {*} section_name 
 * @returns 
 */
const edit_config_view = (action, button, section_name = null, key_value = { key: "", value: "" }) => {
    const element = button.siblings(".element-to-add-rows-for-config-files")
    switch (action) {
        case 'add_row':
            const add_el = `<div class="form-row mt-2">
             <div class="col">
                 <input type="text" class="form-control key-config-input"
                     placeholder=` + "${{rsa.DIDACTIC-KEY-KEYS}}$" + ` form="create-config-file-form" required value='${key_value.key}'>
                 <div class="invalid-feedback">`+ "${{rsa.REAL-USE-NO-KEY-SPEC}}$" + `</div>
 
             </div>
             <div class="col">
                 <input type="text" class="form-control value-config-input"
                     placeholder=` + "${{rsa.REAL-USE-VALUE}}$" + ` form="create-config-file-form" required value='${key_value.value}'>
                 <div class="invalid-feedback">` + "${{rsa.REAL-USE-NO-VALUE-SPEC}}$" + `</div>
             </div>
         </div>`
            element.append(add_el)
            break
        case 'delete_row':
            if (element.children().length <= 1) return
            element.children().last().remove()
            break
        case 'add_section':

            const delete_section_btn = `<a
                 class="delete-section-for-config-files-button" href="#"><i
                 style="color: red; font-size: 20px !important;"
                 class="fa fa-minus-circle" aria-hidden="true"></i></a>`
            const clone = $("#hidden-card-for-cloning").clone()
            const section_title = `[ ${section_name.trim()} ]    ${delete_section_btn}`
            clone.children().children(".card-title").html(section_title)
            clone.attr("id", "")
            clone.attr("hidden", false)
            const key_value_ = Object.prototype.toString.call(key_value) === '[object Array]' ? key_value : [key_value]
            for (let i = 0; i < key_value_.length; i++) {
                edit_config_view("add_row", clone.find(".add-rows-for-config-files-button"), null, key_value_[i])
            }
            $(".config-section-card-wrapper").append(clone)
            break
        case 'delete_section':
            if (button.parent().parent().parent().parent().children().length <= 1) return
            button.parent().parent().parent().remove()
            break
    }
    edit_preview()
}

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
 * @param {*} filename 
 */
const edit_preview = (filename = $("#config-filename-input").val() + $("#config-file-append-cnf").html()) => {
    const config_file_data = read_data_for_config(false)
    $("#preview-config-file-modal .modal-body").html(`<p>${config_file_data}</p>`)
    $("#preview-config-file-modal .modal-title").html(filename)
}

/**
 * 
 * @returns 
 */
const read_data_for_config = (download = false) => {
    const break_line = download ? "\n" : "<br>"
    const sections = $(".card-section-wrapper").not("#hidden-card-for-cloning")
    const result = {}
    // create key value obj
    sections.each(function () {
        const section_name = $(this).find(".card-title").text().trim()
        result[section_name] = []
        const input_rows = $(this).find(".element-to-add-rows-for-config-files").children()
        input_rows.each(function () {
            const key = $(this).find(".key-config-input").val().toString()
            const value = $(this).find(".value-config-input").val().toString()
            const key_value = {}
            key_value[key] = value
            result[section_name].push(key_value)
        })
    })
    // prepare data for download or preview
    let preview_data = ""
    for (const section in result) {
        preview_data += `${section} ${break_line}`
        const data = result[section]
        for (let index in data) {
            const values = data[index];
            for (let key in values) {
                let value = values[key];
                if (key === "" || value === "") continue
                preview_data += `${key} =  '${value}' ${break_line}`
            }

        } preview_data += break_line
    }
    return preview_data
}
/**
 * 
 * @param {*} data 
 */
const create_config_file = (data, filename) => {
    // PROCES DATA
    const file = new File([data], filename, { type: "text/plain" })
    $("#create-config-file-button").attr("disabled", true)
    process_new_file(file).then(x => {
        if (x) {
            $("#config-file-succesfully-created-alert").attr("hidden", false)
            setTimeout(() => {
                $("#config-file-succesfully-created-alert").attr("hidden", true)
                $("#create-config-file-button").attr("disabled", false)
            }, 3000)
        } else {
            $("#create-config-file-button").attr("disabled", false)
        }
    })
}
/** EVENTS */

/**
 * ENCRYPTION / DECRYPTION // RUN OPENSSL
 */
$("#real-encryption-card-tab").on("click input", "#execute-rsa-encryption , textarea", async function (e) {
    e.preventDefault()

    if (e.type == "click" && $(this).attr("type") == "button") {
        const valid = add_submit_form("real-encryption-form", e)
        if (valid) {
            const input_type = $("input[name='real-use-input-type']:checked").val()
            const mode = $("input[name='real-use-mode']:checked").val()
            const obj = {
                text: input_type == "text" ? $("#text-input-real-use-textarea").val() : false,
                encrypt: mode == "enc" ? true : false,
                decrypt: mode == "dec" ? true : false,
                in_key: $("#laoded-files-real-use-select option:selected").text(),
                in_file: input_type != "text" ? $("#file-select-input option:selected").text() : false,
                out_file: $("#enc-file-out").prop('checked') ? $("#enc-file-out-name").val() : false
            }
            const command = await build_pkeyutl(obj)
            run_openssl_wrapper(command)
        }
    } else if (e.type == "input") {
        $(this).removeClass("is-invalid")
    }

})
/**
 * TOGGLE ON INPUT TYPE
 */
$("input[name='real-use-input-type']").on("click", function () {
    if (this.value == "text") {
        $("#file-input-wrapper").attr("hidden", true)
        $("#text-input-wrapper").attr("hidden", false)

        $("#file-select-input").prop("disabled", true)
        $("#text-input-real-use-textarea").prop("disabled", false)
    } else {
        $("#file-input-wrapper").attr("hidden", false)
        $("#text-input-wrapper").attr("hidden", true)

        $("#file-select-input").prop("disabled", false)
        $("#text-input-real-use-textarea").prop("disabled", true)
    }
})
/**
 * TOGGLE ON FILE OUT
 */
$("#enc-file-out").on("click", function () {
    $("#enc-file-out-name, #base-64-output-checkbox").prop('disabled', (i, v) => !v);
    $("#enc-file-out-name").removeClass("is-invalid")
})


/**
 *  // RUN OPENSSL
 */
$(".CommandLine input").on('input keydown', async function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        await run_openssl_wrapper($(this).val())
        $(this).val("")
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (cmd_history.cmd[cmd_history.index - 1]) {
            cmd_history.index--
            $(this).val(cmd_history.cmd[cmd_history.index])
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        const temp_array = [...cmd_history.cmd]
        temp_array.push(cmd_history.current_input)
        if (temp_array[cmd_history.index + 1] || temp_array[cmd_history.index + 1] === '') {
            cmd_history.index++
            $(this).val(temp_array[cmd_history.index])
        }
    } else {
        cmd_history.current_input = $(this).val()
    }
});
/**
 * GENRSA // RUN OPENSSL real-key-gen-form
 */
$("#execute-generate-real-key-button").on("click", function () {
    $("#real-key-gen-form , #real-key-gen-form input[required]").on("submit input", function (e) {
        e.preventDefault()
        const valid = add_submit_form("real-key-gen-form", e)
        const create_cer = $("#toggle-create-x509-cer-checkbox").is(':checked')
        if (valid && e.type == "submit") {
            if (create_cer) {
                // EXECUTE-BTN
                $(".execute-openssl-button").prop("disabled", true)
                // DROPDOWN-BTN
                $(".certificate-pair-button").prop("hidden", true)
                setTimeout(async () => {
                    const obj = {
                        new: true,
                        x509: true,
                        key: $("#private-key-for-cer-select").val(),
                        out: $("#rsa-key-gen-output-name-input").val(),
                        config: $("#config-file-for-cer-select").val()
                    }
                    const command = await build_req(obj)
                    run_openssl_wrapper(command).then(x => {
                        $(".execute-openssl-button").prop("disabled", false)
                        if (x.overwritten || last_generated_certifikate) {
                            $(".certificate-pair-button").prop("hidden", false)
                            if (x.overwritten)
                                last_generated_certifikate = x.last_generated_file
                        }
                    })
                }, 10)

            } else {
                $(".execute-openssl-button").prop("disabled", true)
                $(".key-pair-button").prop("hidden", true)
                setTimeout(async () => {
                    const obj = {
                        out_file: $("#rsa-key-gen-output-name-input").val(),
                        numbits: $("#rsa-key-gen-bit-select").val()
                    }
                    const command = await build_genrsa(obj)
                    run_openssl_wrapper(command).then(x => {
                        $(".execute-openssl-button").prop("disabled", false)
                        if (x.overwritten || last_generated_key) {
                            $(".key-pair-button").prop("hidden", false)
                            $("#key-public-button").prop("disabled", true)
                            $("#generate-dropdown-menu").attr("hidden", false)
                            $("#after-generate-dropdown-menu").attr("hidden", true)
                            if (x.overwritten) {
                                last_generated_key = x.last_generated_file
                                last_generated_pub_key = null
                            }

                        }
                    })
                }, 10)
            }
            $("#real-key-gen-form input[required]").unbind()
        } else if (e.type == "input") {
            $("#real-key-gen-form input[required]").unbind()
            $("#real-key-gen-form textarea[required]").unbind()
        }
        $("#real-key-gen-form").unbind()
    })
})
/**
 * GENERATE A PUBLIC KEY AND WRITE INTO FILE
 */
$("#generate-public-key-action").on("click", async function (e) {
    e.preventDefault()
    if (!last_generated_key) return
    const obj = {
        in: last_generated_key.name,
        pubout: true,
        out: last_generated_key.name.split(/\.(?=[^\.]+$)/)[0]
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command).then(x => {
        $("#generate-dropdown-menu").attr("hidden", true)
        $("#after-generate-dropdown-menu").attr("hidden", false)
        if (x.overwritten || last_generated_pub_key) {// OVERWRITTEN OR NEW FILE
            $("#key-public-button").prop("disabled", false)
            $("#generate-dropdown-menu").attr("hidden", true)
            $("#after-generate-dropdown-menu").attr("hidden", false)
            if (x.overwritten)
                last_generated_pub_key = x.last_generated_file
        }
    })
})
/**
 * SHOW PRIVATE KEY // RUN OPENSSL
 */
$("#key-private-button").on("click", async function (e) {
    e.preventDefault()
    const obj = {
        in: last_generated_key.name
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command)
})
/**
 * SHOW PUBLIC KEY
 */
$("#key-public-button").on("click", async (e) => {
    e.preventDefault()
    const obj = {
        pubin: true,
        in: last_generated_pub_key.name,
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command)
})
/***
 * SHOW PRIVATE INFORMATION
 */
$("#private-key-show-information-button").on("click", async (e) => {
    e.preventDefault()
    const obj = {
        in: last_generated_key.name,
        text: true,
        noout: true
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command)

})
/**
 * SHOW PUBLIC KEY INFORMATION
 */
$("#show-public-key-information-action").on("click", async (e) => {
    e.preventDefault()
    const obj = {
        pubin: true,
        in: last_generated_pub_key.name,
        text: true,
        noout: true
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command)
})

/**
 * SHOW CERTIFICATE INFO
 */
$("#certificate-show-information-button").on("click", async (e) => {
    e.preventDefault()
    const obj = {
        in: last_generated_certifikate.name,
        text: true,
        noout: true
    }
    const command = await build_x509(obj)
    run_openssl_wrapper(command)
})

/**
 * DOWNLOAD KEY
 * 
 */
$("#download-private-key-information-action").on("click", (e) => {
    e.preventDefault()
    read_file_content(last_generated_key).then(x => {
        dowload(x, last_generated_key.name, last_generated_key.type)
    })
})

$("#download-public-key-information-action").on("click", (e) => {
    e.preventDefault()
    read_file_content(last_generated_pub_key).then(x => {
        dowload(x, last_generated_pub_key.name, last_generated_pub_key.type)
    })
})
/**
 * DOWNLOAD CER
 */
$("#download-certificate-information-action").on("click", (e) => {
    e.preventDefault()
    read_file_content(last_generated_certifikate).then(x => {
        dowload(x, last_generated_certifikate.name, last_generated_certifikate.type)
    })
})

/**
 * DELETE FILE EVENT
 */
$("#real-files-card-tab").on("click", ".delete-file", function () {
    $('#delete-file-modal-button').unbind()
    $('#delete-file-modal').modal('show');
    $('#delete-file-modal-button').on("click", () => {
        const filename = $(this).parent().attr("value")
        adjust_filesystem(files_loaded[filename], "delete")
        $('#delete-file-modal').modal('hide')

    })


})
/**
 * DOWNLOAD FILE EVENT
 */
$("#real-files-card-tab").on("click", ".download-file", function () {
    const val = $(this).parent().attr("value")
    read_file_content(files_loaded[val]).then(x => {
        dowload(x, files_loaded[val].name, files_loaded[val].type)
    })
})
/**
 * TOGGLE BETWEEN X509 CER AND NORMAL KEY 
 */
$("#toggle-create-x509-cer-checkbox").on("click", () => {
    $("#openssl-key-length, .x509-cer-param").prop('hidden', (i, v) => !v);
    $(".x509-cer-param select").prop('disabled', (i, v) => !v);
    if (last_generated_key) {
        $(".key-pair-button").prop('hidden', (i, v) => !v);
    }
    if (last_generated_certifikate) {
        $(".certificate-pair-button").prop('hidden', (i, v) => !v);
    }
})

/**
 * GET KEY INFO
 */
$("#real-files-card-tab").on("click", ".get-key-info", async function () {
    const filename = $(this).parent().attr("value")
    const key_type = $(this).attr("value")
    let obj = {
        pubin: key_type === "private" ? false : true,
        in: filename,
        text: true,
        noout: true
    }
    const command = await build_rsa(obj)
    run_openssl_wrapper(command)
})

/**
 * GET CER-INFO
 */
$("#real-files-card-tab").on("click", ".get-certificate-info", function () {
    const filename = $(this).parent().attr("value");
    const obj = {
        in: filename,
        text: true,
        noout: true
    };
    const command = build_x509(obj)
    run_openssl_wrapper(command);
})

/**
 * 
 */
$("#input-file-real-use").on("change", function () {
    const all_files = this.files
    for (let i = 0; i < all_files.length; i++) {
        process_new_file(all_files[i])
    };
})

/** CONFIG TAB */
$("#create-config-card-tab").on("click input", "#create-config-file-button, input", function (e) {
    e.preventDefault()
    const filename = $("#config-filename-input").val() + $("#config-file-append-cnf").html()
    if (e.type == "click" && $(this).attr("type") == "button") {
        const valid = add_submit_form("create-config-file-form", e)
        if (valid) {
            const result = read_data_for_config(true)
            create_config_file(result, filename)
        }
    } else if (e.type == "input") {
        $(this).removeClass("is-invalid")
    }
    // EDIT PREVIEW
    edit_preview()
})

/**
 * ADD/ DELETE INPUT ROWS
 * ADD/ DELETE SECTIONS
 */
$(".card").on("click", ".add-rows-for-config-files-button, .delete-rows-for-config-files-button, .add-section-for-config-file-button, .delete-section-for-config-files-button",
    function (e) {
        e.preventDefault()
        let this_class = $(this).attr("class").split(" ")
        this_class = this_class[this_class.length - 1]
        switch (this_class) {
            case "add-rows-for-config-files-button":
                edit_config_view('add_row', $(this))
                break
            case "delete-rows-for-config-files-button":
                edit_config_view('delete_row', $(this))
                break
            case "add-section-for-config-file-button":


                const valid = add_submit_form("add-section-to-config-file-form", e)
                if (valid) {
                    edit_config_view('add_section', $(this), $("#add-section-name-input").val())
                    $("#add-section-name-input").val("")

                }
                break
            case "delete-section-for-config-files-button":
                edit_config_view("delete_section", $(this))
        }
    })



$("#generate-x509-init-config-button").on("click", async () => {
    let warning
    await new Promise((resolve, reject) => {
        $("#certifikate-overwrite-input-alert").prop("hidden", false)
        $("#certifikate-overwrite-input-yes").on("click", () => {
            clearTimeout(warning)
            $("#certifikate-overwrite-input-alert").prop("hidden", true)
            resolve("overwrite")
        })
        $("#certifikate-overwrite-input-no").on("click", () => {
            clearTimeout(warning)
            $("#certifikate-overwrite-input-alert").prop("hidden", true)
            reject("no overwrite")
        })
        warning = setTimeout(() => {
            $("#certifikate-overwrite-input-alert").prop("hidden", true)
        }, 8000)

    }).then(() => {
        if ($("#config-filename-input").val() == "")
            $("#config-filename-input").val("openssl")
        $(".config-section-card-wrapper").empty()
        edit_config_view('add_section', $([]), "req", [{ key: "default_bits", value: "2048" }, { key: "default_md", value: "sha256" }, { key: "prompt", value: "no" }, { key: "encrypt_key", value: "yes" }, { key: "distinguished_name", value: "example_server" }])
        edit_config_view('add_section', $([]), "example_server", [{ key: "countryName", value: "DE" }, { key: "stateOrProvinceName", value: "Some State" }, { key: "localityName", value: "Some City" }, { key: "organizationName", value: "Some Company" }, { key: "organizationalUnitName", value: "Some IT department" }, { key: "commonName", value: "example_server" }, { key: "emailAddress", value: "some@some.domain.com" }])

    }).catch(error => {
        //
    })
    $("#key-generation-overwrite-input-yes").unbind()
    $("#key-generation-overwrite-input-no").unbind()
})