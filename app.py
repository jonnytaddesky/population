from flask import Flask, render_template, url_for, jsonify, request
import datetime
from database import Database
from plot import create_plot


app = Flask(__name__)


db = Database('population')
db.useCollection('users')


OPERATIONS = {
    'surname': ['eq', 'ne'],
    'name': ['eq', 'ne'],
    'lastName': ['eq', 'ne'],
    'sex': ['eq', 'ne'],
    'birthdayD': ['lt', 'lte', 'eq', 'ne', 'gte', 'gt'],
    'birthdayM': ['eq', 'ne'],
    'birthdayY': ['lt', 'lte', 'eq', 'ne', 'gte', 'gt'],
    'citizenship': ['eq', 'ne'],
    'maritalStatus': ['eq', 'ne'],
    'education': ['eq', 'ne'],
    'language': ['eq', 'ne'],
}


VALUES = {
    'sex': ['Чоловіча', 'Жіноча'],
    'birthdayD': [x for x in range(1, 32)],
    'birthdayM': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
                  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    'birthdayY': [x for x in range(1900, datetime.date.today().year + 1)],
    'citizenship': ['Україна', 'Інша держава', 'Без громадянства'],
    'maritalStatus': ['Ніколи не перебував(ла) у шлюбі',
                     'Зареєстрований шлюб',
                     'Незареєстрований шлюб',
                     'Удівець(Удова)',
                     'Розлучений(на)',
                     'Розійшовся(лася)'],
    'education': ['Вища освіта',
                  'Професійна',
                  'Профільна середня',
                  'Базова середня',
                  'Початкова',
                  'Не маю освіти'],
    'language': ['Українська',
                 'Російська',
                 'Кримськотатарська',
                 'Угорська',
                 'Молдовська',
                 'Румунська',
                 'Болгарська',
                 'Польська',
                 'Білоруська',
                 'Інша'],
}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sign_up', methods=['GET'])
def sign_up():
    return render_template('sign_up.html',
            sex=VALUES['sex'],
            birthdayD=VALUES['birthdayD'],
            birthdayM=VALUES['birthdayM'],
            birthdayY=VALUES['birthdayY'],
            citizenship=VALUES['citizenship'],
            maritalStatus=VALUES['maritalStatus'],
            education=VALUES['education'],
            language=VALUES['language'])


@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/statistics')
def statistics():
    return render_template('statistics.html')


@app.route('/statistics/__plot', methods=['GET'])
def plot():
    return create_plot(db, request.args["field"])


@app.route('/search/__operation_for', methods=['GET'])
def operation_for():
    field = request.args.get('field', "", type=str)
    operations = [] if field == "" else OPERATIONS[field]
    return jsonify(operations=operations)


@app.route('/search/__value_for', methods=['GET'])
def value_for():
    field = request.args.get('field', "", type=str)
    values = [] if field == "" else VALUES[field]
    return jsonify(values=values)


@app.route('/sign_up/__register', methods=['POST'])
def register():
    return str(db.insert(dict(request.form)))


@app.route('/search/__find', methods=['POST'])
def find():
    return render_template('search_results.html', results=db.find(request.json))


if __name__ == '__main__':
    app.run()
