"use strict";

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
    "lte": "\u2264",
    "eq": "=",
    "ne": "\u2260",
    "gte": "\u2265",
    "gt": ">",
};

function message(title, message) {
    $("#modal-title").text(title);
    $("#modal-message").text(message);
    $("#modal").modal();
}

var query = {};
var filter_count = 0;

function removeFilter(id, field, oper) {
    $("#filter-list").find(id).remove();

    delete query[field]["$" + oper];
    if (jQuery.isEmptyObject(query[field])) {
        delete query[field];
    }

    filter_count--;
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
    } else {
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

function addFilter() {
    var field_input = $("#field-select option:selected");
    var oper_input = $("#operation-select");
    var value_input = null;

    if ($("#select-group").is(":visible")) {
        value_input = $("#value-select");
    } else {
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

    if (field in query && ("$" + oper) in query[field]) {
        message("Помилка", "Фільтр вже інсує");
        return;
    }

    var li = $("<li></li>");
    li.addClass("alert alert-primary d-flex");
    li.attr("id", `filter_${filter_count}`);
    li.append(`<div id="filter-message" style="display: innline-block; margin-right: 10px;">${$FIELDS[field]} ${$OP_NAMES[oper]} ${value}</div>`);
    li.append($("<button/>")
        .attr({
            type: "button",
            onclick: `removeFilter('#filter_${filter_count}', '${field}', '${oper}')`,
            class: "close"})
        .html("<span>&times;</span>")
    );

    ul.append(li);

    if (!(field in query)) {
        query[field] = {};
    }

    query[field]["$" + oper] = (
        ["birthdayD", "birthdayY"].includes(field) ?
        parseInt(value, 10) :
        value
    );

    filter_count++;
}

function search() {
    $.ajax({
        url:$SCRIPT_ROOT + "/search/__find",
        dataType: "json",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(query),
        converters: {
            "text json": true
        },
        success: function(data, textStatus, jqXHR) {
            $("#results").html(data);
        },
        error: function(error) {
            message("Помилка", "Пошук не виконаний");
        }
    });
}
