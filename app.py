from flask import Flask, render_template, url_for
import datetime
from pymongo import MongoClient

app = Flask(__name__)
app.debug = True


myClient = MongoClient("mongodb://localhost:27017/")
myDb = myClient["population"]
myCol = myDb["users"]


data = list(myCol.find())


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sign_up/', methods=['GET'])
def sign_up():
    sexs = ['Чоловік', 'Жінка']
    birthdayYs = [x for x in range(1900, datetime.date.today().year + 1)]
    birthdayDs = [x for x in range(1, 32)]
    birthdayMs = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
                  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    citizenships = ['Україна', 'Інша держава', 'Без громадянства']
    maritalStatus = ['ніколи не перебува(ла) у шлюбі',
                     'зареєстрований шлюб',
                     'незареєстрований шлюб',
                     'удівець(удова)',
                     'розлучений(на)',
                     'розійшовся(лася)']
    educations = ['вища освіта',
                  'професійна',
                  'профільна середня',
                  'базова середня',
                  'початкова',
                  'не маю освіти']
    languages = ['українська',
                 'російська',
                 'кримськотатарська',
                 'угорська',
                 'молдовська',
                 'румунська',
                 'болгарська',
                 'польська',
                 'білоруська',
                 'інша']
    return render_template('sign_up.html', sexs=sexs, data=data, birthdayYs=birthdayYs, birthdayDs=birthdayDs, birthdayMs=birthdayMs, citizenships=citizenships, maritalStatus=maritalStatus,
                           educations=educations, languages=languages)


@app.route('/search/', methods=['GET'])
def search():
    sexs = ['Чоловік', 'Жінка']
    birthdayYs = [x for x in range(1900, datetime.date.today().year + 1)]
    birthdayDs = [x for x in range(1, 32)]
    birthdayMs = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
                  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    citizenships = ['Україна', 'Інша держава', 'Без громадянства']
    maritalStatus = ['ніколи не перебува(ла) у шлюбі',
                     'зареєстрований шлюб',
                     'незареєстрований шлюб',
                     'удівець(удова)',
                     'розлучений(на)',
                     'розійшовся(лася)']
    educations = ['вища освіта',
                  'професійна',
                  'профільна середня',
                  'базова середня',
                  'початкова',
                  'не маю освіти']
    languages = ['українська',
                 'російська',
                 'кримськотатарська',
                 'угорська',
                 'молдовська',
                 'румунська',
                 'болгарська',
                 'польська',
                 'білоруська',
                 'інша']
    return render_template('search.html', data=data, sexs=sexs, birthdayYs=birthdayYs, birthdayDs=birthdayDs, birthdayMs=birthdayMs, citizenships=citizenships, maritalStatus=maritalStatus,
                           educations=educations, languages=languages)


@app.route('/statistic', methods=['GET'])
def statistic():
    birthdayYs = [x for x in range(1900, datetime.date.today().year + 1)]
    birthdayDs = [x for x in range(1, 32)]
    birthdayMs = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
                  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    citizenships = ['Україна', 'Інша держава', 'Без громадянства']
    maritalStatus = ['ніколи не перебува(ла) у шлюбі',
                     'зареєстрований шлюб',
                     'незареєстрований шлюб',
                     'удівець(удова)',
                     'розлучений(на)',
                     'розійшовся(лася)']
    educations = ['вища освіта',
                  'професійна',
                  'профільна середня',
                  'базова середня',
                  'початкова',
                  'не маю освіти']
    languages = ['українська',
                 'російська',
                 'кримськотатарська',
                 'угорська',
                 'молдовська',
                 'румунська',
                 'болгарська',
                 'польська',
                 'білоруська',
                 'інша']
    return render_template('statistic.html', data=data, birthdayYs=birthdayYs, birthdayDs=birthdayDs, birthdayMs=birthdayMs, citizenships=citizenships, maritalStatus=maritalStatus,
                           educations=educations, languages=languages)


if __name__ == '__main__':
    app.run()
