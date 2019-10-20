"use strict";

function plot() {
    $.ajax({
        url: "/statistics/__plot",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        data: {
            "field": $("#field-select").val()
        },
        dataType: "json",
        success: function(data) {
            Plotly.newPlot("bargraph", data);
        }
    });
}
