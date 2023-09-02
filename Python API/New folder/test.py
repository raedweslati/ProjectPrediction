import pandas as pd
import numpy as np
import pickle


loaded_model = pickle.load(open(r"C:\Users\zdig\Desktop\python\pima.pickle.dat", "rb"))


input_data = []
features = ['Portfolio Folder L1', 'nature', 'Framework', 'Program Holder', 'Program ID', 'Horizon', 'Business Case Id', 'Project Size',
            'Project Duration', 'Expenses_amount_mean', 'Expenses_amount_max', 'Expenses_amount_min', 'Expenses_amount_std', 'Expenses_slope_mean',
            'Expenses_slope_max', 'Expenses_slope_min', 'Expenses_slope_std', 'External Labor_amount_mean', 'External Labor_amount_max',
            'External Labor_amount_min', 'External Labor_amount_std', 'External Labor_slope_mean', 'External Labor_slope_max',
            'External Labor_slope_min', 'External Labor_slope_std', 'Internal Labor_amount_mean', 'Internal Labor_amount_max',
            'Internal Labor_amount_min', 'Internal Labor_amount_std', 'Internal Labor_slope_mean', 'Internal Labor_slope_max',
            'Internal Labor_slope_min', 'Internal Labor_slope_std', 'ADAP', 'ADVA', 'Epic', 'INCU', 'Multi Value', 'NEW', 'OBSC', 'ORGA', 'Offer', 'PRED',
            'PROD', 'QUAL', 'SUPP', 'WITH', 'XPLO']



values = [1,0,0.0,0,1,0.5,1,1.482457e+06,2515.0,100000.00,100000.00,100000.00,50538.851961,-16131.635676,10856.932258,
          -153246.696774,48682.293447,0.000,0.00,0.00,0.000000,0.000000,0.000000,0.00,0.000000,1.193352e+04,9.845054e+04,
          -2.822362e+04,30722.556016,-8856.768529,28343.910000,-84748.335484,30856.464036,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0] 

for feature, value in zip(features, values):
    input_data.append(value)



data_pred=pd.DataFrame([input_data], columns = features)
prediction=loaded_model.predict(data_pred)
print(prediction)

if(prediction[0]==0):
  print("The cancellation of this project is predicted")
else:
  print("This project is predicted to be a success ")