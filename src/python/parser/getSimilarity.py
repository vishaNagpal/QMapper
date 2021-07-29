import gensim.downloader as api
model = api.load('word2vec-google-news-300')
import json
import pandas as pd
import matplotlib.pyplot as plt
import math
w2vec_model = models.KeyedVectors.load_word2vec_format('model', binary=True)

def getSimilarity(skills):
    print('reading categories json file')
    file = open('/Users/vishakha.nagpal/development/my_workspace/cc-search/parser/keywords/skillCategories.json',)
    skillCategories = json.load(file)
    similarityList=[]
    categoryList=[]
    print(skills)
    for cat in skillCategories:
        distance = model.wmdistance(skills, cat)
        print(distance)
        distance = round(distance,2)
        if math.isinf(distance)==True:
            distance=2
        print(distance)
        similarityList.append(distance*100)
        categoryList.append(cat.keys())
    print(categoryList)
    plotChart(similarityList,categoryList)
    file.close();
    return 1

def plotChart(similarityList,categoryList):
    data = {'Similarities': similarityList}
    df = pd.DataFrame(data,columns=['Similarities'],index = ['database','backendServices','automation','frontend','management'])
    df.plot.pie(y='Similarities',figsize=(5, 5),autopct='%1.1f%%', startangle=90)
    plt.show()


if __name__ == '__main__':
       ss= getSimilarity(["postgress", "sql","mysql","mysql-python","kafka","consumer","publisher"]) 
       print(ss)