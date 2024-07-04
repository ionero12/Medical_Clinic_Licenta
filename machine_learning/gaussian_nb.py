import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.pipeline import Pipeline
from sklearn2pmml import make_pmml_pipeline, sklearn2pmml
from sklearn_pandas import DataFrameMapper
import matplotlib.pyplot as plt
import re


data = pd.read_csv('C:\\Users\\Ione\\Desktop\\test1\\dataset\\Symptom2Diseasemodificat_updated.csv')

print("Class distribution:\n", data['label'].value_counts())

data['label'].value_counts().plot(kind='bar')
plt.title('Class Distribution')
plt.xlabel('Disease')
plt.ylabel('Frequency')
plt.show()

# Preprocess text data
def preprocess_text(text):
    text = text.lower()  # convert to lowercase
    text = re.sub(r'\d+', '', text)  # remove numbers
    text = re.sub(r'\s+', ' ', text)  # remove extra spaces
    text = re.sub(r'[^\w\s]', '', text)  # remove punctuation
    return text

data['description'] = data['description'].apply(preprocess_text)

X_train, X_test, y_train, y_test = train_test_split(data['description'], data['label'], test_size=0.2, random_state=42)

tfidf_vectorizer = TfidfVectorizer(norm=None)
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train).toarray()
X_test_tfidf = tfidf_vectorizer.transform(X_test).toarray()

clf = GaussianNB()
clf.fit(X_train_tfidf, y_train)

y_pred = clf.predict(X_test_tfidf)

print(classification_report(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))

X_train = X_train.to_frame()

mapper = DataFrameMapper([('description', tfidf_vectorizer)])

pipeline = Pipeline([('mapper', mapper), ('classifier', GaussianNB())])

pipeline.fit(X_train, y_train)

pmml_pipeline = make_pmml_pipeline(pipeline, active_fields=['description'], target_fields=['label'])

sklearn2pmml(pmml_pipeline, "gaussian_nb_model_new2.pmml")
