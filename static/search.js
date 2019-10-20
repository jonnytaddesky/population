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

var $OP_NAMES = {
    "lt": "<",
    "le": "\u2264",
    "eq": "=",
    "ne": "\u2260",
    "ge": "\u2265",
    "gt": ">",
};

function message(title, message) {
    $("#modal-title").text(title);
    $("#modal-message").text(message);
    $("#modal").modal();
}

function fieldChanged() {
    var field = $("#field-select").val();

    $.getJSON($SCRIPT_ROOT + "/search/__operation_for", {
        field: field
    }, function(data) {
        var select = $("#operation-select");
        select.empty();
        select.append("<option value=\"\">---</option>");
        data.operations.forEach(function(op) {
            var option = $("<option></option>");
            option.attr("value", op);
            option.text($OP_NAMES[op]);
            select.append(option);
        });
    });

    if (["surname", "name", "lastName"].includes(field)) {
        $("#select-group").hide();
        $("#input-group").show();
    }
    else {
        $("#input-group").hide();
        $("#select-group").show();

        $.getJSON($SCRIPT_ROOT + "/search/__value_for", {
            field: field
        }, function(data) {
            var select = $("#value-select");
            select.empty();
            select.append("<option value=\"\">---</option>");
            data.values.forEach(function(value) {
                var option = $("<option></option>");
                option.attr("value", value);
                option.text(value);
                select.append(option);
            });
        });
    }
}

var filter_count = 0;

function addFilter() {
    var field_input = $("#field-select option:selected");
    var oper_input = $("#operation-select");
    var value_input = null;

    if ($("#select-group").is(":visible")) {
        value_input = $("#value-select");
    }
    else {
        value_input = $("#value-input");
    }

    var field = field_input.val() || null;
    var oper = oper_input.val() || null;
    var value = value_input.val() || null;

    if (field == null) {
        message("Помилка", "Будь ласка оберіть категорію");
        return;
    }

    if (oper == null) {
        message("Помилка", "Будь ласка оберіть операцію");
        return;
    }

    if (value == null) {
        message("Помилка", "Будь ласка оберіть значення фільтру");
        return;
    }

    var ul = $("#filter-list");

    var li = $("<li></li>");
    li.addClass("alert alert-primary");
    li.attr("id", "filter_" + filter_count++);
    li.text(`${$FIELDS[field]} ${$OP_NAMES[oper]} ${value}`);

    ul.append(li);
}
