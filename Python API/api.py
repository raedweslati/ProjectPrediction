import os
import pickle
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS class from flask_cors
import pyodbc

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your app


# Load the pre-trained model
model_path = r"C:\Users\zdig\Desktop\project\Python API\pima.pickle.dat"
loaded_model = pickle.load(open(model_path, "rb"))

# List of features
features = ['Portfolio Folder L1', 'nature', 'Framework', 'Program Holder', 'Program ID', 'Horizon', 'Business Case Id', 'Project Size',
            'Project Duration', 'Expenses_amount_mean', 'Expenses_amount_max', 'Expenses_amount_min', 'Expenses_amount_std', 'Expenses_slope_mean',
            'Expenses_slope_max', 'Expenses_slope_min', 'Expenses_slope_std', 'External Labor_amount_mean', 'External Labor_amount_max',
            'External Labor_amount_min', 'External Labor_amount_std', 'External Labor_slope_mean', 'External Labor_slope_max',
            'External Labor_slope_min', 'External Labor_slope_std', 'Internal Labor_amount_mean', 'Internal Labor_amount_max',
            'Internal Labor_amount_min', 'Internal Labor_amount_std', 'Internal Labor_slope_mean', 'Internal Labor_slope_max',
            'Internal Labor_slope_min', 'Internal Labor_slope_std', 'ADAP', 'ADVA', 'Epic', 'INCU', 'Multi Value', 'NEW', 'OBSC', 'ORGA', 'Offer', 'PRED',
            'PROD', 'QUAL', 'SUPP', 'WITH', 'XPLO']


@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        input_values = [input_data.get(feature, 0) for feature in features]
        server = 'ZDIG'
        database = 'Prediction'
        username = 'zdig'
        password = 'raedwes21'

        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' +
                              server+';DATABASE='+database+';UID='+username+';PWD=' + password)
        cursor = cnxn.cursor()

        query_columns = ', '.join([f'[{feature}]' for feature in features])
        query_values = ', '.join(['?' for _ in features])
        insert_query = f"INSERT INTO Predictions ({query_columns}) VALUES ({query_values})"

        cursor.execute(insert_query, input_values)
        cnxn.commit()

        data_pred = pd.DataFrame([input_values], columns=features)
        prediction = loaded_model.predict(data_pred)[0]

        if prediction == 0:
            result = "The cancellation of this project is predicted."
            updateQuery = f"UPDATE Predictions set IsSuccess= 0 where  RowId = (SELECT max(RowId) FROM Predictions) "
            cursor.execute(updateQuery)
            cnxn.commit()
        else:
            result = "This project is predicted to be a success."
            updateQuery1 = f"UPDATE Predictions set IsSuccess= 1 where  RowId = (SELECT max(RowId) FROM Predictions) "
            cursor.execute(updateQuery1)
            cnxn.commit()

        cnxn.commit()
        cnxn.close()

        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
