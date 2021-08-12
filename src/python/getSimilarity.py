import gensim.downloader as api

model = api.load('word2vec-google-news-300')

import json
import pandas as pd
import matplotlib.pyplot as plt
import math

categoryList = ['database', 'backendServices', 'automation', 'frontend', 'management'];


def get_similarity(skills):
    print('reading categories json file')
    file = open(
        '/Users/vishakha.nagpal/development/my_workspace/QMapper/src/python/parser/keywords/skillCategories.json', )
    skillCategories = json.load(file)
    similarityList = []
    print(skills)
    # max_matching_cat = ''
    # maxSimilarity = -1
    for cat in skillCategories:
        distance = model.wmdistance(skills, cat)
        distance = round(distance, 2)
        if math.isinf(distance):  # todo: train this model for all technologies as well
            distance = 0  # todo: fix it up
        print(distance)
        # if maxSimilarity >= distance:
        #     maxSimilarity = distance
        # max_matching_cat = cat
        similarityList.append(300 - (distance * 100))
    # print(similarityList)
    # plotChart(similarityList,categoryList)
    # fetchQuestions(skillCategories[0]['backendServices'],6);
    file.close();
    return {'similarityList': similarityList, 'categoryList': categoryList}


def plotChart(similarityList, categoryList):
    data = {'Similarities': similarityList}
    df = pd.DataFrame(data, columns=['Similarities'], index=categoryList)
    df.plot.pie(y='Similarities', figsize=(5, 5), autopct='%1.1f%%', startangle=90)
    plt.show()


def getSimilarityFromWords(words):
    wordsList = words.split(",")
    responseObject = get_similarity(wordsList)
    return responseObject

# if __name__ == '__main__': obj= getSimilarity(['Oracle', 'Migration', 'Android', 'Adobe', 'Illustrator',
# 'Automation', 'Service', 'Os', 'Sql', 'Database', 'System', 'Hbase']) #    ss=getSimilarity(['Vmware', 'Analysis',
# 'Python', 'Watchdog', 'Architecture', 'Aws', 'Cloud', 'Api', 'Design', 'Agile', 'Saas', 'Security', 'Cisco',
# 'Mysql', 'Service', 'Product owner', 'Inventory', 'Java', 'Scala', 'Technical', 'Health', 'Rest', 'Algorithms',
# 'System', 'Oracle', 'Coding']); plotChart(obj['similarityList'],obj['categoryList'])
