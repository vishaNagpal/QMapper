import { IDBModel } from "../db/dbInterface";

const questionsData : IDBModel []= [
    {
        qId:"1",
        qName:'String Evaluation',
        description:'',
        labels:['order','parsing','stack'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:'Evaluate : (a) 1+2*3    -> 7 \n (b) (1+2)*3  -> 9'
    },
    {
        qId:"2",
        qName:'Closest matching Word',
        description:'',
        labels:['pattern', 'matching', 'closest', 'suggestions'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`find nearest word from the given non-english dictionary which is one off character. (could be non ascii characters)
        for eg. dictionary contains { apple, pineapple, banana, orange }
        
        if given word ""applx"" then return true, as applx matches with apple and only one character is off.
        aplpe returns false`
    },
    {
        qId:"3",
        qName:'String Comparison 1',
        description:'',
        labels:['string' ,'matching', 'pattern', 'duplicates'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`"Compare strings based on n grams.
        e.g str1 – Today is Sunday.
        str2 – Today is Saturday
        if n = 2 then number of duplicates is 1 (Today is)
        if n = 1 then number of duplicates is (Today, is)
        if n = 3 duplicates is 0"`
    },
    {
        qId:"4",
        qName:'Closest Matching word',
        description:'',
        labels:['string' ,'matching', 'pattern','closest', 'suggestions','search'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`"find nearest word from the given non-english dictionary which is one off character. (could be non ascii characters)
        for eg. dictionary contains { apple, pineapple, banana, orange }
        
        if given word ""applx"" then return true, as applx matches with apple and only one character is off.
        aplpe returns false
        
        "`
    }
]

export {questionsData};