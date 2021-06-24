import React,{ useEffect,useState } from 'react';
import { getValueFromDb } from '../db/dbConnection';
import { IDBModel } from '../db/dbInterface';

const MainComponent : React.FunctionComponent = function(){
const [ value, setValue ] = useState<IDBModel[]|[]>([]);

    useEffect(function(){
        const dataReq = getValueFromDb();  // make your request
        dataReq.then(val=>setValue(val));
    },[]);

    return(<table>
        <thead>
            <tr>
            <th>Qid</th><th>QNAme</th><th>Description</th><th>Difficulty Level</th><th>Labels</th>
            <th>Link</th>
            </tr>
        </thead>
        <tbody>
           {
               value.map((ques: IDBModel)=>{
                   return <tr>
                       <td>{ques.qId}</td>
                       <td>{ques.qName}</td>
                       <td>{ques.description}</td>
                       <td>{ques.level_of_difficulty}</td>
                       <td>{ques.labels.toString()}</td>
                       <td>{ques.gist_link}</td>
                   </tr>
               })
           }
        </tbody>
    </table>)
}


export default MainComponent;