import json

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import unicodedata

kaggle_df = pd.read_csv('raw/kaggle.csv')

# print(type(kaggle_df[["track_id"]]), kaggle_df.columns)

# json_data = kaggle_df[["track_id"]].to_dict(orient='records')
# print(json_data)

# with open('../../../frontend/public/songs_data.json', 'w') as json_file:
#     json.dump(json_data, json_file, indent=4)

# columns do contain na values

# plt.bar(kaggle_df["track_name"], kaggle_df["popularity"])
# plt.title("Popularity of Songs in October 2022")
# plt.xlabel("Song Name")
# plt.ylabel("Popularity")
# plt.show()
#
# print(kaggle_df.columns)



kaggle_df["track_name"] = kaggle_df["track_name"].replace(r"[$]", "", regex=True)
#
#
kaggle_df["track_name"] = kaggle_df["track_name"].fillna("Unknown Track").astype(str)

# Check for additional issues in 'popularity'. Ensure it's numeric
kaggle_df["popularity"] = pd.to_numeric(kaggle_df["popularity"], errors='coerce').fillna(0)



# Normalize track names to remove accents
kaggle_df["track_name"] = kaggle_df["track_name"].apply(
    lambda x: unicodedata.normalize('NFKD', x).encode('ascii', errors='ignore').decode('utf-8')
)

sorted_sliced_df = kaggle_df.sort_values(by='popularity', ascending=False).iloc[0: 50]


# Plot the data
# plt.figure(figsize=(8, 6))
# bars = plt.bar(sorted_sliced_df["track_name"], sorted_sliced_df["popularity"])
# plt.title("Top 50 Popular Songs in October 2022")
# plt.xlabel("Song Name")
# plt.xticks(rotation=90)
# plt.ylabel("Popularity")
# plt.tight_layout()
# for bar in bars:
#     yval = bar.get_height()  # Get the height of each bar (the y value)
#     plt.text(bar.get_x() + bar.get_width() / 2, yval,  # Position the text
#              round(yval, 2),  # Display rounded y-value
#              ha='center', va='bottom')  # Horizontal alignment (center), vertical (above)
# plt.show()
#
# charCheck = kaggle_df["track_name"].apply(lambda x: len(x.encode('ascii', errors='ignore')) < len(x))
# print(charCheck.value_counts())

# Above is demo plots 1-3

