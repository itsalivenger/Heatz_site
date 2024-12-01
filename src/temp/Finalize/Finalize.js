const check_input = document.querySelector('.check-input');

let checked = false

check_input.onclick = function() {
    if (checked) {
        check_input.style.background = 'none';
        checked = false;
    } 
    else {
        check_input.style.backgroundColor = 'rgb(0, 228, 137)';
        checked = true
    }
}