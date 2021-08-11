import json
import gensim.downloader as api
model = api.load('word2vec-google-news-300')


DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace';
BASE_PROCESS_FILE = DIR_PATH+'/cc-search/processed/{0}.txt'
KEY_WORDS_STAT = DIR_PATH+'/cc-search/processed/kw.json'

NO_OF_QUESTIONS = 5



def fetchQuestions(skillsList,max_questions_req = NO_OF_QUESTIONS):
    questionsFound = 0
    for n in range(1, 10):
        text_file = open(BASE_PROCESS_FILE.format(n), "r")
        lines = text_file.readlines();
        for line in lines:
            kw = json.loads(line)["k"]
            ques = json.loads(line)["t"]
            dist = model.wmdistance(skillsList,kw)
            if(dist < 1.3): # first put weights on all questions and then return min distance top n question
                questionsFound = questionsFound+1
                print(questionsFound) 
                print(ques)
                if questionsFound == max_questions_req:
                    break;
        text_file.close()
        if questionsFound == max_questions_req:
            break;
        print(n)

# if __name__ == '__main__':
#     skills =  {
#     "frontend":["js","javascript","typescript","angular","react","pywebview","jquery","reactjs","scala","swift","ruby","perl","ruby","rubyonrails","html","css","sass","scss","less","vue","next.js","nextjs","ionic","bootstrap","page performace","html5","coffeescript","flutter","reactnative","preact","codekit","meteor","pwa","amp"]
#   }
#     ques = fetchQuestions(skills["frontend"],5);

