import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, AdaBoostClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
import matplotlib.pyplot as plt
import re

# Încarcă datele
data = pd.read_csv('C:\\Users\\Ione\\Desktop\\test1\\dataset\\Symptom2Diseasemodificat_updated.csv')

print("Class distribution:\n", data['label'].value_counts())

# Vizualizare distribuție clase
data['label'].value_counts().plot(kind='bar')
plt.title('Class Distribution')
plt.xlabel('Disease')
plt.ylabel('Frequency')
plt.show()

# Preprocesare text
def preprocess_text(text):
    text = text.lower()  # convert to lowercase
    text = re.sub(r'\d+', '', text)  # remove numbers
    text = re.sub(r'\s+', ' ', text)  # remove extra spaces
    text = re.sub(r'[^\w\s]', '', text)  # remove punctuation
    return text

data['description'] = data['description'].apply(preprocess_text)

# Împarte datele în seturi de antrenament și testare
X_train, X_test, y_train, y_test = train_test_split(data['description'], data['label'], test_size=0.2, random_state=42)

# Transformare text în caracteristici TF-IDF
tfidf_vectorizer = TfidfVectorizer(norm=None)
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train).toarray()
X_test_tfidf = tfidf_vectorizer.transform(X_test).toarray()

# Funcție pentru antrenare și evaluare a diferiților algoritmi
def train_and_evaluate(clf, clf_name):
    clf.fit(X_train_tfidf, y_train)
    y_pred = clf.predict(X_test_tfidf)
    print(f"Results for {clf_name}:")
    print(classification_report(y_test, y_pred))
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("\n")

# Gaussian Naive Bayes
gnb = GaussianNB()
train_and_evaluate(gnb, "Gaussian Naive Bayes")

# Multinomial Naive Bayes
mnb = MultinomialNB()
train_and_evaluate(mnb, "Multinomial Naive Bayes")

# K-Nearest Neighbors
knn = KNeighborsClassifier(n_neighbors=5)
train_and_evaluate(knn, "K-Nearest Neighbors")

# Decision Tree
dtc = DecisionTreeClassifier(random_state=42)
train_and_evaluate(dtc, "Decision Tree")

# Support Vector Machine
svm = SVC(kernel='linear')
train_and_evaluate(svm, "Support Vector Machine")

# Logistic Regression
lr = LogisticRegression(max_iter=1000)
train_and_evaluate(lr, "Logistic Regression")

# Random Forest
rf = RandomForestClassifier(random_state=42)
train_and_evaluate(rf, "Random Forest")

# Gradient Boosting
gbc = GradientBoostingClassifier(random_state=42)
train_and_evaluate(gbc, "Gradient Boosting")

# AdaBoost
abc = AdaBoostClassifier(random_state=42)
train_and_evaluate(abc, "AdaBoost")

# Linear Discriminant Analysis
lda = LinearDiscriminantAnalysis()
train_and_evaluate(lda, "Linear Discriminant Analysis")
