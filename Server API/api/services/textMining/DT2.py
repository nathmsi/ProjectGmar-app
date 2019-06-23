# DT2 FOR TM2 IS FOR ALL ITEMS EXCEPT NEXT RETAIL
import sys
import json
import pandas as pd
import pickle

from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import RegexpTokenizer



argument1 = sys.argv[1]

x = {"description": {"0": argument1}}
n = json.dumps(x)
arg = json.loads(n)



with open(r'C:\Users\natha\Desktop\P_G\text mining\model.pickle','rb') as f:
    model = pickle.load(f)
    data2 = pd.DataFrame(arg) 
    token2 = RegexpTokenizer(r'[a-zA-Z0-9]+')


cv = CountVectorizer(lowercase=True,stop_words='english',ngram_range = (1,1),tokenizer = token2.tokenize
                     ,vocabulary=pickle.load(open(r'C:\Users\natha\Desktop\P_G\text mining\feature.pkl','rb')))



text_counts2= cv.transform(data2['description'])

#text_counts3= cv.transform(data2['Description'])

proba =  model.predict_proba(text_counts2)
predicted = model.predict(text_counts2)

print(predicted[0])
print('243456')