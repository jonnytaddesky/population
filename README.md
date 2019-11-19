# population

Installation:
```
python3 -m venv flask
. flask/bin/activate
pip install --upgrade pip
pip install Flask pymongo plotly numpy
yay -S mongodb-bin
cd static && npm install
```

Running:
```
sudo systemctl start mongodb
mongo < craete_database.py
. setenv.sh
flask run
```
