from __future__ import absolute_import

from flask import Flask,jsonify
from flask import request
from flask import Response
from flask_cors import CORS, cross_origin

from getSimilarity import getSimilarityFromWords

app = Flask(__name__)
CORS(app, support_credentials=True)


################################################################################################
# Route definition begin
@app.route('/uploadResume', methods=['GET'])
def upload_resume():
    try:
        file_extension = os.path.splitext(path)[1]
        print('reading resume...')
        content = file_extension == '.pdf' and readPdfFile(path) or extract(path)
        print('resume parsed successfully.. fetching skills now')
        keywords = extract_skills(content)
        findSimilarity(keywords)
        return jsonify({'success': 'ok'})
    except IOError:
        print("Error opening or reading input file: ", path)


@app.route('/fetchQuestions')
@cross_origin(supports_credentials=True)
def fetch_questions():
    words = request.args.get('words');
    responseData = getSimilarityFromWords(words);
    return jsonify(responseData)


@app.route('/')
def home():
    return '<p>It is working</p>'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
