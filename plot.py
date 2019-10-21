import plotly
import plotly.graph_objs as go

import numpy as np
import json

def create_plot(db, field):
    result = db.aggregate([{ "$group": { "_id": "$" + field, "count": { "$sum": 1 }}}])

    json = { "x": [], "y": [] }

    for rec in sorted(list(result), key=lambda rec: rec["_id"]):
        json["x"].append(rec["_id"])
        json["y"].append(rec["count"])

    return json
