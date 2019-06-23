# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""



import pandas as pd

import pickle

 

data = pd.read_csv(r'C:\Users\elibo\Desktop\SQL\datasettext2.csv',encoding = 'unicode_escape')


from sklearn.feature_extraction.text import CountVectorizer

from nltk.tokenize import RegexpTokenizer

#tokenizer to remove unwanted elements from out data like symbols and numbers

token = RegexpTokenizer(r'[a-zA-Z0-9]+')

cv = CountVectorizer(lowercase=True,stop_words='english',ngram_range = (1,1),tokenizer = token.tokenize)

text_counts= cv.fit_transform(data['Description']) 






from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(

        
        
        
        
        
    text_counts, data['customitem'], test_size=0.3, random_state=1)



 

from sklearn.naive_bayes import MultinomialNB

#Import scikit-learn metrics module for accuracy calculation

from sklearn import metrics

# Model Generation Using Multinomial Naive Bayes

clf = MultinomialNB().fit(X_train, y_train)

 
with open(r'C:\Users\elibo\Desktop\SQL\model.pickle','wb') as f:
    model = pickle.dump(clf,f,protocol=pickle.HIGHEST_PROTOCOL)
    
    
pickle.dump(cv.vocabulary_,open(r'C:\Users\elibo\Desktop\SQL\feature.pkl','wb'))




predicted= clf.predict(X_test)

 

print("MultinomialNB Accuracy:",metrics.accuracy_score(y_test, predicted))





























 

 