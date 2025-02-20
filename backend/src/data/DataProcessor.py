import json

import pandas as pd
import matplotlib.pyplot as plt

kaggle_df = pd.read_csv('raw/kaggle.csv')

# print(type(kaggle_df[["track_id"]]), kaggle_df.columns)

json_data = kaggle_df[["track_id"]].to_dict(orient='records')
print(json_data)

# with open('../../../frontend/public/songs_data.json', 'w') as json_file:
#     json.dump(json_data, json_file, indent=4)

