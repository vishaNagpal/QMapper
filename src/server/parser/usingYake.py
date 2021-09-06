# importing required modules
import yake
DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace';
BASE_DATA_FILE = DIR_PATH+'/cc-search/resume/Vishakha_Test_Resume.rtf'
 
def readFile(filePath):
    fileObj = open(filePath, 'r')
    lines = fileObj.readlines();
    lines = [line.replace('\\', '') for line in lines]
    lines = [line.replace('\n', '') for line in lines]
    fileObj.close()
    print(lines)
    return lines


if __name__ == '__main__':
    fileContent = readFile(BASE_DATA_FILE)
    kw_extractor = yake.KeywordExtractor()
    numOfKeywords = 10
    custom_kw_extractor = yake.KeywordExtractor(lan='en', n=1, dedupLim=0.1, top=numOfKeywords, features=None)
    for item in fileContent:
        keywords = custom_kw_extractor.extract_keywords(item)
        for kw in keywords:
            print(kw)
    # print(fileContent)