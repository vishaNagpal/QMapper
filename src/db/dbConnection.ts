import { DBConfig } from "ngx-indexed-db";
import {questionsData} from '../helper/questionsData';

const dbConfig: DBConfig  = {
    name: 'QMapperDB',
    version: 1,
    objectStoresMeta: [{
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } }
      ]
    }]
  };

const connectTODB = () : Promise<any> => {  
    const DBOpenRequest : IDBOpenDBRequest = window.indexedDB.open(dbConfig.name,dbConfig.version);
    let db : IDBDatabase;
    let objectStore : IDBObjectStore;
    const dataPromise = new Promise((resolve)=>{
      DBOpenRequest.onsuccess = async function(event) {
        db = DBOpenRequest.result;
        const transaction = db.transaction("questions", 'readwrite');
        objectStore = transaction.objectStore("questions");
        const response =  await getData(objectStore);
        resolve(response);
      };


    DBOpenRequest.onupgradeneeded = function(event) {
      db = (event?.target as any).result;
      db.onerror = function() {
          window.alert('Error loading database');
      };

      // Create an objectStore for this database
      objectStore = db.createObjectStore("questions", { keyPath: "labels" });

      // define what data items the objectStore will contain
      objectStore.createIndex("qId", "qId", { unique: false });
      objectStore.createIndex("qName", "qName", { unique: false });
      objectStore.createIndex("description", "description", { unique: false });
      objectStore.createIndex("labels", "labels", { unique: false });
      objectStore.createIndex("level_of_difficulty", "level_of_difficulty", { unique: false });
      objectStore.createIndex("gist_link", "gist_link", { unique: false });
      addData(objectStore);
      
  };
    });

    return dataPromise;
}

const getValueFromDb = () : Promise<any> =>{
  return connectTODB();
}

const getData=async (objectStore:IDBObjectStore)=>{
  try{
    const promise = new Promise( (resolve)=>{
      const request = objectStore.getAll();
      request.onsuccess = ()=>resolve(request.result)
    });
    
    return promise;
  }catch(e){
    console.warn(e.message);
    return null;
  }
}

const addData =(objectStore: IDBObjectStore)=>{
        // const objectStoreRequest = objectStore.add(questionsData);

        questionsData.forEach(ques => {
          objectStore.add(ques);
      })
    
        // objectStoreRequest.onsuccess = function(event) {
        //   console.log('Request successful.');
        // };
    };

export {getValueFromDb,connectTODB};