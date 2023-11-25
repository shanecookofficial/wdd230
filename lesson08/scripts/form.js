function validateForm() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        document.getElementById("password").value = '';
        document.getElementById("confirm_password").value = '';
        document.getElementById("password").focus();
        return false;
    }
    return true;
}

function updateRangeValue(value) {
    document.getElementById("range_value").textContent = value;
}
