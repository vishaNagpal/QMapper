import React, { useState } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import QuestionViewer from './QuestionViewer';
const baseApiPath = 'http://127.0.0.1:5000';

interface IPieData {
    title: string;
    value: number;
    color: string;
}

const colorsList = ['#E38627', '#7FFFD4', '#66CDAA', '#838B8B', '#5F9EA0', '#8FBC8F', '#CD2626']

const UploaderComponent: React.FunctionComponent = function () {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [questionsList, setQList] = useState([]);
    const [pieDataList, updatePieData] = useState<IPieData[] | undefined>(undefined);

    const uploadResume = (event: any) => {
        const fileObj = uploadRef.current?.files;
        if (!fileObj?.length) {
            alert('Please upload a resume to parse');
            return;
        }
        axios.get(baseApiPath + '/uploadResume', {
            data: fileObj
        })
            .then(response => {
                console.log(response.data);
                setQList(response.data);
            });
    }

    const fetchSimilarity = () => {
        const values = searchRef.current?.value;
        if (values && values.trim()) {
            axios.get(baseApiPath + '/fetchSimilarity?words=' + values)
                .then((response: any) => {
                    setPieData(response.data.categoryList, response.data.similarityList)
                });
        }
    }

    const fetchMatchingQuestions = () => {
        const values = searchRef.current?.value;
        if (values && values.trim()) {
            fetchSimilarity();
            axios.get(baseApiPath + '/fetchQuestions?words=' + values)
                .then((response: any) => {
                    setQList(response.data || []);
                });
        }
    }

    const setPieData = (categoryList: string[], similarityList: number[]):void => {
        const pieList: IPieData[] = categoryList.map((category, index) => {
            return {
                title: category,
                value: similarityList[index],
                color: colorsList[index],
            }
        })
        updatePieData(pieList);
    }

    const handleResetAction = () : void=>{
        setQList([]);
        updatePieData(undefined);
        if(searchRef.current)searchRef.current.value='';
    }

    return (<>
        <section className='flex-box'>
            <article style={{ position: 'relative', borderRight: '1px solid #e1e1e1', margin: '0 50px', padding: '0 50px' }}>
                <p className='uploadButton button' onClick={() => { uploadRef.current?.click() }}>Upload Resume</p>
                <input ref={uploadRef} type='file' placeholder='Upload CV' id='upload' name='upload' style={{ height: '25px', width: '300px' }} onChange={uploadResume} />
            </article>
            <form>
                <input ref={searchRef} placeholder='Type comma separated keywords here' id='search' name='search' style={{ height: '25px', width: '300px' }} />
                <button type='button' className='button' onClick={fetchMatchingQuestions}>Search</button>
            </form>
            <article style={{ borderLeft: '1px solid #e1e1e1', margin: '0 50px', padding: '0 50px' }}>
                <p className='resetButton button' onClick={handleResetAction}>Reset</p>
            </article>
        </section>
        {/* {words.length && <p style={{textAlign:'left'}}>words</p>} */}
        {pieDataList && <section className='chartWrapper flex-box'>
            <PieChart
                data={pieDataList}
                // label={({ dataEntry }) => `${dataEntry.title}`}
            />
        </section>}
        {questionsList.length && <section className='flex-box questionsWrapper'>
            <QuestionViewer questionsData={questionsList} />
        </section>
        }
    </>)
}


export default UploaderComponent;