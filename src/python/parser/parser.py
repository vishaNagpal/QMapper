import docx2txt
import PyPDF2
from spacy.matcher import Matcher
import spacy
import pandas as pd
import os
from getSimilarity import *


DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/QMapper/src/python';

def extract(resume):
	temp = docx2txt.process(resume)
	text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
	return ' '.join(text)

def readPdfFile(filePath):  
    pdfFileObj = open('filePath', 'rb') 
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    pageObj = pdfReader.getPage(0)
    pdfFileObj.close()
    return pageObj.extractText()

def extract_skills(resume_text):
    nlp = spacy.load('en_core_web_sm')
    matcher = Matcher(nlp.vocab)
    nlp_text = nlp(resume_text)
    tokens = [token.text for token in nlp_text if not token.is_stop]
    # reading the csv file
    data = pd.read_csv(DIR_PATH+"/parser/keywords/skills.csv") 
    
    # extract values
    skills = list(data.columns.values)
    skillset = [] 
   
    chunks = nlp_text.noun_chunks
    # check for bi-grams and tri-grams (example: machine learning)
    for token in chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)

    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token) 
        
    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def findSimilarity(keywords):
    getSimilarity(keywords)

if __name__ == '__main__':
        # path = "/Users/vishakha.nagpal/Downloads/resume_001.docx"
        path = DIR_PATH+"/resume/6.docx"
        try:
            file_extension = os.path.splitext(path)[1]
            print('reading resume...')
            content = file_extension == '.pdf' and readPdfFile(path) or extract(path)
            print('resume parsed successfully.. fetching skills now')
            keywords = extract_skills(content)
            findSimilarity(keywords)
        except IOError:
            print("Error opening or reading input file: ", path)
        

