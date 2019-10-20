var $FIELDS = {
    "surname": "Прізвище",
    "name": "Ім'я",
    "lastName": "По-батькові",
    "sex": "Стать",
    "birthdayD": "День",
    "birthdayM": "Місяць",
    "birthdayY": "Рік",
    "citizenship": "Громадянство",
    "maritalStatus": "Сімейний стан",
    "education": "Освіта",
    "language": "Рідна мова",
};

function message(title, message) {
    $("#modal-title").text(title);
    $("#modal-message").text(message);
    $("#modal").modal();
}

function register() {
    var user_data = {};

    user_data["surname"] = $("#field-surname").val() || null;
    user_data["name"] = $("#field-name").val() || null;
    user_data["lastName"] = $("#field-lastName").val() || null;
    user_data["sex"] = $("#field-sex option:selected").val() || null;
    user_data["birthdayD"] = $('#field-birthdayD option:selected').val() || null;
    user_data["birthdayM"] = $("#field-birthdayM option:selected").val() || null;
    user_data["birthdayY"] = $("#field-birthdayY option:selected").val() || null;
    user_data["citizenship"] = $("#field-citizenship option:selected").val() || null;
    user_data["maritalStatus"] = $("#field-maritalStatus option:selected").val() || null;
    user_data["education"] = $("#field-education option:selected").val() || null;
    user_data["language"] = $("#field-language option:selected").val() || null;

    for (const name of Object.keys(user_data)) {
        if (user_data[name] == null) {
            message("Помилка", "Будь ласка оберіть " + $FIELDS[name]);
            return;
        }
    }

    $.post($SCRIPT_ROOT + "/sign_up/__register", user_data, function(data) {
        if (data == "True") {
            message("Інфо", "Регістрація успішна!")
        }
        else {
            message("Помилка", "Регістрація не виконана!")
        }
    });
}
