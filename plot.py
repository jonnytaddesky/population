import plotly
import plotly.graph_objs as go

import pandas as pd
import numpy as np
import json

def create_plot(db, field):
    N = 40
    x = np.linspace(0, 1, N)
    y = np.random.randn(N)
    df = pd.DataFrame({'x': x, 'y': y})

    data = [
        go.Bar(
            x=df['x'],
            y=df['y']
        )
    ]

    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON
