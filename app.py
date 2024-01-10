from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/clientes/')
def get_customer():
    return render_template('dashboard/clientes.html')

@app.route('/fazendas/')
def get_fazendas():
    return render_template('dashboard/fazendas.html')

@app.route('/talhao/')
def get_talhao():
    return render_template('dashboard/talhao.html')

@app.route('/sobre/')
def get_sobre():
    return render_template('sobre.html')

if __name__ == '__main__':
    app.run(debug=True)
