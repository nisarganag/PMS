import sys
import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()

    tokens = word_tokenize(text)
    filtered_tokens = [token for token in tokens if not token in stop_words]
    stemmed_tokens = [stemmer.stem(token) for token in filtered_tokens]

    return ' '.join(stemmed_tokens)

def main():
    # Read the file paths from the command line arguments
    publications_path = sys.argv[1]
    user_publications_path = sys.argv[2]

    # Read the JSON strings from the files
    with open(publications_path, 'r') as f:
        json_all_publications = f.read()
    with open(user_publications_path, 'r') as f:
        json_user_publications = f.read()

    # Convert the JSON strings to Python lists
    try:
        all_publications = json.loads(json_all_publications)
        user_publications = json.loads(json_user_publications)
    except json.decoder.JSONDecodeError:
        print("Error: Invalid JSON string. Property names must be enclosed in double quotes.")
        return

    # Preprocess the title and description of each publication
    all_texts = []
    for publication in all_publications:
        title = publication.get('title', '')
        description = publication.get('description', '')

        preprocessed_title = preprocess_text(title)
        if description is not None:
            preprocessed_description = preprocess_text(description)
        else:
            preprocessed_description = ''

        all_texts.append(preprocessed_title + ' ' + preprocessed_description)

    user_texts = []
    for publication in user_publications:
        title = publication.get('title', '')
        description = publication.get('description', '')

        preprocessed_title = preprocess_text(title)
        if description is not None:
            preprocessed_description = preprocess_text(description)
        else:
            preprocessed_description = ''

        user_texts.append(preprocessed_title + ' ' + preprocessed_description)

    # Create a TF-IDF matrix for the texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts + user_texts)

    # Compute the cosine similarity between the user's publications and all publications
    cosine_similarities = linear_kernel(tfidf_matrix[-len(user_texts):], tfidf_matrix[:-len(user_texts)])

    # Get the indices of the top 5 most similar publications for each of the user's publications
    top_indices = cosine_similarities.argsort()[:, -5:]

    # Print the IDs of the recommended publications
    printed_ids = set()
    for indices in top_indices:
        for index in indices:
            id = all_publications[index]['id']
            if id not in printed_ids:
                print(id)
                printed_ids.add(id)

if __name__ == "__main__":
    main()