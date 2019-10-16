var $OP_NAMES = {
    "lt": "<",
    "le": "\u2264",
    "eq": "=",
    "ne": "\u2260",
    "ge": "\u2265",
    "gt": ">",
};

function fieldChanged() {
    var field = $("#field-select").val();

    $.getJSON($SCRIPT_ROOT + "/search/__operation_for", {
        field: field
    }, function(data) {
        var select = $("#operation-select");
        select.empty();
        select.append("<option value=\"none\">---</option>");
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
            select.append("<option value=\"none\">---</option>");
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

    var field = field_input.html();
    var oper = oper_input.val();
    var value = value_input.val();

    if (field == "---") {
        alert("Будь ласка оберіть поле");
        return;
    }

    if (oper == "---") {
        alert("Будь ласка оберіть операцію");
        return;
    }

    if (value == "---") {
        alert("Будь ласка оберіть значення фільтру");
        return;
    }

    var ul = $("#filter-list");

    var li = $("<li></li>");
    li.addClass("alert alert-primary");
    li.attr("id", "filter_" + filter_count++);
    li.text(`${field} ${$OP_NAMES[oper]} ${value}`);

    ul.append(li);
}
