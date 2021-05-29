# importing modules
import os
import math
import json
from flask import Flask, request
from flask import Flask, redirect, url_for, request, render_template, jsonify
#from flask_restplus import Api, Resource
#from flasgger import Swagger
#from flasgger.utils import swag_from

#from werkzeug.utils import secure_filename
#from flasgger import LazyString, LazyJSONEncoder

import numpy as np
import pandas as pd

import numpy as np
import pandas as pd

eq = pd.read_csv('eq_result.csv')
sla = pd.read_csv('sla_result.csv')

def predict(con):
    if(con.lower() == 'indonesia'):
      result = {'eq1_month': int(eq.Month[10]), 'eq1_quarter': int(eq.Quarter[10]),'eq2_month': int(eq.Month[9]), 'eq2_quarter': int(eq.Quarter[9]),'eq3_month': int(eq.Month[8]), 'eq3_quarter': int(eq.Quarter[8]), 'sla1': round(sla.sla[0],3), 'sla2': round(sla.sla[1],3), 'sla3': round(sla.sla[2],3), 'sla4': round(sla.sla[3],3), 'sla5': round(sla.sla[4],3), 'sla6': round(sla.sla[5],3), 'sla7': round(sla.sla[6],3), 'sla8': round(sla.sla[7],3), 'sla9': round(sla.sla[8],3), 'sla10': round(sla.sla[9],3), 'sla11': round(sla.sla[10],3), 'sla12': round(sla.sla[11],3)}
      
    return json.dumps(result)

# Create a Flask instance
app = Flask(__name__)
@app.route('/predict', methods=['POST'])
def upload():
    """
    Serve the inference request
    Pass the image in multipart/form-data to the inference function
    """
    if request.method == 'POST':

      # Get the file from post request
        con = request.form['country']
        return predict(con)
    return 'not success'

# Start the web server
@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')
if __name__ == '__main__':
    app.run()