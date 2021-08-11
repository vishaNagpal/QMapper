import os
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT, ID
import sys

DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/QMapper/src/python';
BASE_PROCESS_FILE = DIR_PATH+'/processed/{0}.txt'
KEY_WORDS_STAT = DIR_PATH+'/processed/kw.json'

 
def createSearchableData(root):   
    schema = Schema(title=TEXT(stored=True),path=ID(stored=True),\
              content=TEXT,textdata=TEXT(stored=True))
    if not os.path.exists("indexdir"):
        os.mkdir("indexdir")
 
    # Creating a index writer to add document as per schema
    ix = create_in("indexdir",schema)
    writer = ix.writer()
 
    filepaths = [os.path.join(root,i) for i in os.listdir(root)]
    for path in filepaths:
        fp = open(path,'r')
        print(path)
        text = fp.read()
        writer.add_document(title=path.split("\\")[1], path=path,\
          content=text,textdata=text)
        fp.close()
    writer.commit()

if __name__ == '__main__':
    skills =  ['Vmware', 'Analysis', 'Python', 'Watchdog', 'Architecture', 'Aws', 'Cloud', 'Api', 'Design', 'Agile', 'Saas', 'Security', 'Cisco', 'Mysql', 'Service', 'Product owner', 'Inventory', 'Java', 'Scala', 'Technical', 'Health', 'Rest', 'Algorithms', 'System', 'Oracle', 'Coding']
    root = "processed"
    createSearchableData(root)

