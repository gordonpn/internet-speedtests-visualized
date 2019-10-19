from flask import Flask

app = Flask(__name__)


@app.route('/')
def sup():
    return "<h1>Hello World!</h1>"


@app.route('/<name>')
def name(name):
    return "<h1>{}<h1>".format(name.upper())


if __name__ == '__main__':
    app.run(port=5002)
