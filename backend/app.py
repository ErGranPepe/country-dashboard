from flask import Flask, jsonify
import random

app = Flask(__name__)

# Simulated data (replace with real API calls in a production environment)
def generate_mock_data(country):
    years = list(range(2010, 2024))
    population = [random.randint(50000000, 400000000) for _ in years]
    gdp = [random.randint(500, 25000) for _ in years]
    return {
        "years": years,
        "population": population,
        "gdp": gdp
    }

@app.route('/api/data/<country>')
def get_country_data(country):
    data = generate_mock_data(country)
    return jsonify(data)

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)

