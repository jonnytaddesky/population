from flask import Flask, render_template, url_for


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html')


@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/statistics')
def statistics():
    return render_template('statistics.html')


if __name__ == '__main__':
    app.run()
