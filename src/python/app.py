from __future__ import absolute_import

from flask import Flask, jsonify
from flask import request
from flask import Response
from flask_cors import CORS, cross_origin

from getSimilarity import getSimilarityFromWords,get_similarity
from getQuestions import fetchQuestions
from parseResume import getWordsFromResume

app = Flask(__name__)
CORS(app, support_credentials=True)


##########################################
# Routes Config begin
@app.route('/uploadResume', methods=['POST'])
def upload_resume():
    try:
        uploaded_file = request.files['file'];
        filename = uploaded_file.filename
        if uploaded_file.filename != '':
            keywords = getWordsFromResume(uploaded_file)
            if keywords:
                response_data = get_similarity(keywords)
                questions = fetchQuestions(",".join(keywords),5);
                response_data['questions'] = questions
                return jsonify(response_data)
            return jsonify(
                    message="Some error occurred. Now debug to fix it up",
                    category="error",
                    status=404
                )
    except IOError:
        print("Error opening or reading input file: ", path)


@app.route('/fetchSimilarity')
@cross_origin(supports_credentials=True)
def fetch_similarity():
    words = request.args.get('words');
    response_data = getSimilarityFromWords(words);
    return jsonify(response_data)


@app.route('/fetchQuestions')
@cross_origin(supports_credentials=True)
def fetch_questions():
    words = request.args.get('words');
    count = request.args.get('count') or 5;
    print('printing count')
    print(count);
    response_data = fetchQuestions(words,count);
    print('response_data')
    return jsonify(response_data)


@app.route('/')
def home():
    return '<p>It is working</p>'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
