import docx2txt
import spacy
from spacy.matcher import Matcher
import pandas as pd
import os
from readPdfFile import *
from getSimilarity import *

DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace';

def extract(resume):
	temp = docx2txt.process(resume)
	text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
	return ' '.join(text)

nlp = spacy.load('en_core_web_sm')
matcher = Matcher(nlp.vocab)

def extract_skills(resume_text):
    nlp_text = nlp(resume_text)
    tokens = [token.text for token in nlp_text if not token.is_stop]
    # reading the csv file
    data = pd.read_csv(DIR_PATH+"/cc-search/parser/keywords/skills.csv") 
    
    # extract values
    skills = list(data.columns.values)
    skillset = []
    
    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)  
   
    chunks = nlp_text.noun_chunks
    # check for bi-grams and tri-grams (example: machine learning)
    for token in chunks:
        # print(token)
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)
    
    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def findSimilarity(keywords):
    getSimilarity(keywords)

if __name__ == '__main__':
        # path = "/Users/vishakha.nagpal/Downloads/resume_001.docx"
        path = DIR_PATH+"/cc-search/resume/3.pdf"
        try:
            file_extension = os.path.splitext(path)[1]
            content = file_extension == '.pdf' and readPdfFile(path) or extract(path)
            keywords = extract_skills(content)
            findSimilarity(keywords)
        except IOError:
            print("Error opening or reading input file: ", path)
        

