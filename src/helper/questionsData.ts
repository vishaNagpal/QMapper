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
    },
    {
        qId:"5",
        qName:'Sliding Window problem',
        description:'',
        labels:['sliding window' ,'sequence'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Shops in a row - shop [i] selling only single type of vegetable 
        You have 2 baskets and each basket can hold any no of vegetables but the type has to be same
        Start from any shop but have to keep picking vegetables till you can from once you start
        
        
        What is the total amount of vegetables you can collect with this procedure?\n
        Input: [0,1,2,2]
Output: 3
Input: [1,2,3,2,2]
Output: 4
Explanation: We can collect [2,3,2,2].
Input: [3,3,3,1,2,1,1,2,3,3,4]
Output: 5`
    },
    {
        qId:"6",
        qName:'Closest Matching word',
        description:'',
        labels:['string' ,'matching', 'pattern','dictionary','replace'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Write a function that takes a string and a dictionary as input and looks up any bracketed string ("{}",
        "[]", "()") and replaces it with its value in the dictionary.
        
        "Two mathematicians walk into a {foo} holding a {drink}.", {"foo": “bar”,”drink"} -> "Two mathematicians walk into a bar.”
        "Two mathematicians walk into [a {foo}].", {"foo": "bar”, “ abar”:”space bar"} -> "Two mathematicians walk into space bar.”`
    },
    {
        qId:"7",
        qName:'Validate brackets',
        description:'',
        labels:['string' ,'stack', 'pattern','brackets','validate','pipe bracket'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Validate brackets ->
            a) (a+[a+b])*(c)  -> true
            b) (a+b)]  -> false
            c) (a+|b|) -> true
        
        `
    },
    {
        qId:"8",
        qName:'Find clusters in graph',
        description:'',
        labels:['grapgh' ,'clusters', 'isolate','DFS'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`You are given a grid represnting city divided in regions. Each region is marked as 1 if it has a Covid-19 case in it.
        Find no. of clusters in the city. A cluster can be of size 1 or more.
       
       1 0 0 0 1 1
       1 0 0 0 1 1
       0 0 0 1 0 0`
    },
    {
        qId:"9",
        qName:'Find clusters in graph',
        description:'',
        labels:['grapgh' ,'clusters', 'isolate','DFS'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`You are given a grid represnting city divided in regions. Each region is marked as 1 if it has a Covid-19 case in it.
        Find no. of clusters in the city. A cluster can be of size 1 or more.
       
       1 0 0 0 1 1
       1 0 0 0 1 1
       0 0 0 1 0 0`
    },
    {
        qId:"10",
        qName:'Make two strings equal by adding a word or group of words together',
        description:'',
        labels:['string' ,'matching', 'pattern','replace','equal strings','parsing'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Return true of one of the two strings can be made equal to another string by adding a word or a group of word.


        str1 = "hello alpha", str2 = "hello my name is alpha" => true, "my name is"
        str1 = "is alpha", str2 = "hello my name is alpha" => true, "hello my name"
        String str1 = "name alpha", str2 = "hello my name is alpha" => false`
    },
]

export {questionsData};