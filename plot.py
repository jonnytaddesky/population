import plotly
import plotly.graph_objs as go

import numpy as np
import json

def create_plot(db, field):
    result = db.aggregate([{ "$group": { "_id": "$" + field, "count": { "$sum": 1 }}}])

    json = { "labels": [], "values": [] }

    for rec in sorted(list(result), key=lambda rec: rec["_id"]):
        json["labels"].append(rec["_id"])
        json["values"].append(rec["count"])

    return json
