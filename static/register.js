function register() {
    var user_data = {};

    user_data["surname"] = $('#field-surname').val();
    user_data["name"] = $('#field-name').val();
    user_data["lastname"] = $('#field-lastname').val();
    user_data["sex"] = $('#field-sex option:selected').val();
    user_data["birthdayD"] = $('#field-birthdayD option:selected').val();
    user_data["birthdayM"] = $('#field-birthdayM option:selected').val();
    user_data["birthdayY"] = $('#field-birthdayY option:selected').val();
    user_data["citizenship"] = $('#field-citizenship option:selected').val();
    user_data["maritalStatus"] = $('#field-maritalStatus option:selected').val();
    user_data["education"] = $('#field-education option:selected').val();
    user_data["language"] = $('#field-language option:selected').val();

    $.post($SCRIPT_ROOT + "/sign_up/__register", user_data, function(data) {
        if (data == "True") {
            alert("Insertion successful!");
        }
        else {
            alert("Insertion failed!");
        }
    });
}
