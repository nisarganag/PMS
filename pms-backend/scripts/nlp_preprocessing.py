import sys
import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.metrics import edit_distance

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()

    tokens = word_tokenize(text)
    filtered_tokens = [token for token in tokens if not token in stop_words]
    stemmed_tokens = [stemmer.stem(token) for token in filtered_tokens]

    return stemmed_tokens

def compute_similarity(text1, text2):
    # Use edit distance as a simple measure of similarity
    return 1 - edit_distance(text1, text2) / max(len(text1), len(text2))

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
            preprocessed_description = []

        all_texts.append(preprocessed_title + preprocessed_description)

    user_texts = []
    for publication in user_publications:
        title = publication.get('title', '')
        description = publication.get('description', '')

        preprocessed_title = preprocess_text(title)
        if description is not None:
            preprocessed_description = preprocess_text(description)
        else:
            preprocessed_description = []

        user_texts.append(preprocessed_title + preprocessed_description)

    # Compute similarity and recommend publications
    printed_ids = set()
    for user_text in user_texts:
        similarities = [(i, compute_similarity(user_text, text)) for i, text in enumerate(all_texts)]
        top_similarities = sorted(similarities, key=lambda x: x[1], reverse=True)[:5]

        # Print the IDs of the recommended publications
        
        user_ids = {pub['id'] for pub in user_publications}  # Create a set of user publication IDs
        #print only items that are not in user_ids or printed_ids
        for similarity in top_similarities:
            index = similarity[0]
            id = all_publications[index]['id']
            title = all_publications[index]['title']
            if id not in printed_ids and id not in user_ids:
                print(f"ID: {id}, Title: {title}")
                printed_ids.add(id)

if __name__ == "__main__":
    main()
