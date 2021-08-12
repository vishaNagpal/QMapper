import json

DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/QMapper';
BASE_PROCESS_FILE = DIR_PATH+'/src/python/processed/{0}.txt'
KEY_WORDS_STAT = DIR_PATH+'/src/python/processed/kw.json'

NO_OF_QUESTIONS = 5

def fetchQuestions(skillsList,max_questions_req = NO_OF_QUESTIONS):
    questionsFound = 0
    questList = []
    for n in range(1, 500):
        text_file = open(BASE_PROCESS_FILE.format(n), "r")
        lines = text_file.readlines();
        for line in lines:
            kw = json.loads(line)["k"]
            ques = json.loads(line)["t"]
            # dist = model.wmdistance(skillsList,kw)
            # print(kw)
            match = any(item in skillsList for item in kw)
            if(match):
                questionsFound = questionsFound+1
                questList.append({
                    'qId':json.loads(line)["i"],
                    'ques' : ques
                })
                if questionsFound == max_questions_req:
                    break;
        text_file.close()
        if questionsFound == max_questions_req:
            break;
    return questList;

if __name__ == '__main__':
    words =  ['loops','pool','posting','graph']
    ques = fetchQuestions(words,5)
    print(ques)

