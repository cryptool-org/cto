
function add_submit_form(form_id, event) {
    var forms = document.getElementById(form_id);
    let valid = true
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.classList.remove('is-invalid');
        form.classList.remove('is-valid');
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('is-invalid');
            valid = false
        }
        form.classList.add('was-validated');


    });
    return valid
}

export { add_submit_form }