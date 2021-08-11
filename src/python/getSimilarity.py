import gensim.downloader as api
model = api.load('word2vec-google-news-300')

import json
import pandas as pd
import matplotlib.pyplot as plt
import math
print('line S1')
# from getQuestions import *
print('line S9')


categorList = ['database','backendServices','automation','frontend','management'];

def getSimilarity(skills):
    print('reading categories json file')
    file = open('/Users/vishakha.nagpal/development/my_workspace/QMapper/src/python/parser/keywords/skillCategories.json',)
    skillCategories = json.load(file)
    similarityList=[]
    categoryList=[]
    print(skills)
    # max_matching_cat = ''
    # maxSimilarity = -1
    for cat in skillCategories:
        distance = model.wmdistance(skills,cat)
        distance = round(distance,2) 
        if math.isinf(distance): #todo: train this model for all technologies as well
            distance=0 #todo: fix it up
        print(distance)
        # if maxSimilarity >= distance:
        #     maxSimilarity = distance
            # max_matching_cat = cat
        similarityList.append(300-(distance*100))
        categoryList.append(cat.keys())
    # print(similarityList)
    # plotChart(similarityList,categoryList)
    # fetchQuestions(skillCategories[0]['backendServices'],6);
    file.close();
    return {'similarityList':similarityList,'categoryList':categorList}

def plotChart(similarityList,categoryList):
    data = {'Similarities': similarityList}
    df = pd.DataFrame(data,columns=['Similarities'],index = categorList)
    df.plot.pie(y='Similarities',figsize=(5, 5),autopct='%1.1f%%', startangle=90)
    plt.show()

def getSimilarityFromWords(words):
    wordsList = words.split(",");
    responseObject = getSimilarity(wordsList);
    return responseObject;


if __name__ == '__main__':
    #    ss= getSimilarity(['Oracle', 'Migration', 'Android', 'Adobe', 'Illustrator', 'Automation', 'Service', 'Os', 'Sql', 'Database', 'System', 'Hbase']) 
       ss=getSimilarity(['Vmware', 'Analysis', 'Python', 'Watchdog', 'Architecture', 'Aws', 'Cloud', 'Api', 'Design', 'Agile', 'Saas', 'Security', 'Cisco', 'Mysql', 'Service', 'Product owner', 'Inventory', 'Java', 'Scala', 'Technical', 'Health', 'Rest', 'Algorithms', 'System', 'Oracle', 'Coding']);
       print(ss)