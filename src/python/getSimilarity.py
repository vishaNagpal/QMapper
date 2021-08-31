import json
import pandas as pd
import matplotlib.pyplot as plt
import math

category_list = ['database', 'backendServices', 'automation', 'frontend', 'management'];


def get_similarity_with_model(skills):
    import gensim.downloader as api
    model = api.load('word2vec-google-news-300')
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


def get_similarity(skills):
    print('reading categories json file')
    file = open(
        '/Users/vishakha.nagpal/development/my_workspace/QMapper/src/python/parser/keywords/skillCategories.json', )
    skill_categories = json.load(file)
    similarity_list = []
    similarity_object = {}
    count=0
    for cat in skill_categories:
        if(count == 5):
            break
        count = count+1
        category_key = next(iter(cat))
        same_items_list = [value.lower() for value in skills if value.lower() in cat[category_key]]
        distance = len(same_items_list) * 100
        if distance == 0:
            distance = 20
        print(distance)
        similarity_list.append(distance)
        similarity_object[category_key] = {
            'similarity' : distance,
            'similarityList':same_items_list
        }
    file.close()
    return {'similarityObject':similarity_object,'similarityList': similarity_list, 'categoryList': category_list}


def plot_chart(similarity_list,cat_list):
    data = {'Similarities': similarity_list}
    df = pd.DataFrame(data, columns=['Similarities'], index=cat_list)
    df.plot.pie(y='Similarities', figsize=(5, 5), autopct='%1.1f%%', startangle=90)
    plt.show()


def get_similarity_from_words(words):
    words_list = words.split(",")
    response_object = get_similarity(words_list)
    return response_object


if __name__ == '__main__':
    obj = get_similarity(
        ['Oracle', 'Migration', 'Android', 'Adobe', 'Illustrator', 'Automation', 'Service', 'Os', 'Sql', 'Database',
         'System', 'Hbase'])
    print(obj);
    plot_chart([400,100,100,20,20],obj['categoryList'])

# #    ss=getSimilarity(['Vmware', 'Analysis',
# 'Python', 'Watchdog', 'Architecture', 'Aws', 'Cloud', 'Api', 'Design', 'Agile', 'Saas', 'Security', 'Cisco',
# 'Mysql', 'Service', 'Product owner', 'Inventory', 'Java', 'Scala', 'Technical', 'Health', 'Rest', 'Algorithms',
# 'System', 'Oracle', 'Coding']);
