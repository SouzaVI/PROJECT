from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/clientes/')
def hello(name=None):
    return render_template('dashboard/clientes.html')

if __name__ == '__main__':
    app.run(debug=True)
