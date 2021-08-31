import React, { useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'react-loader-spinner';

import { IPieData, ISimilarityItem } from '../helper/interfaces';
import { baseApiPath, colorsList } from '../helper/Constants';
import QuestionViewer from './QuestionViewer';
import ChartComponent from './ChartComponent';


const UploaderComponent: React.FunctionComponent = function () {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const questionCount = React.useRef<HTMLInputElement>(null);
    const previewRef = React.useRef<HTMLImageElement>(null);
    const [isShowLoader, showLoader] = React.useState<boolean>(true);
    const [questionsList, setQList] = useState([]);
    const [keywords, setKeywordsList] = useState<string[]>([]);
    const [pieDataList, updatePieData] = useState<IPieData[] | undefined>(undefined);
    const [similarityObject, setsSimilarityObject] = useState<Record<string, ISimilarityItem> | null>(null);

    const uploadResume = (event: any) => {
        const fileObj = uploadRef.current?.files;
        if (!fileObj?.length) {
            alert('Please upload a resume to parse');
            return;
        }
        showLoader(true);
        if (previewRef.current) {
            const obj = document.getElementById('preview')
            obj && obj.setAttribute('data', URL.createObjectURL(fileObj[0]));
            previewRef.current.src = URL.createObjectURL(fileObj[0]);
        }
        const formData = new FormData();
        formData.append('file', fileObj[0]);
        axios.post(baseApiPath + '/uploadResume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                handleResetAction();
                setsSimilarityObject(response.data.similarityObject);
                setPieData(response.data.categoryList, response.data.similarityList)
                setQList(response.data.questions || []);
                setKeywordsList(response.data.keywords || []);
                showLoader(false);
            }).catch(err => {
                showLoader(false);
                alert('Error Encountered');
            })
    }

    const fetchSimilarity = () => {
        const values = searchRef.current?.value;
        if (values && values.trim()) {
            axios.get(baseApiPath + '/fetchSimilarity?words=' + values)
                .then((response: any) => {
                    setsSimilarityObject(response.data.similarityObject);
                    setPieData(response.data.categoryList, response.data.similarityList);
                });
        }
    }

    const fetchMatchingQues4Words = () => {
        const values = searchRef.current?.value;
        if (values && values.trim()) {
            showLoader(true);
            setKeywordsList(values.split(","));
            fetchSimilarity();
            axios.get(baseApiPath + '/fetchQuestions?words=' + values + '&count=' + questionCount.current?.value)
                .then((response: any) => {
                    setQList(response.data || []);
                    showLoader(false);
                }).catch(err => {
                    showLoader(false);
                })
        }
    }

    const setPieData = (categoryList: string[], similarityList: number[]): void => {
        const pieList: IPieData[] = categoryList.map((category, index) => {
            return {
                title: category,
                value: similarityList[index],
                color: colorsList[index],
            }
        })
        updatePieData(pieList);
    }

    const handleResetAction = (): void => {
        showLoader(true);
        setQList([]);
        setKeywordsList([]);
        updatePieData(undefined);
        if (searchRef.current) searchRef.current.value = '';
    }

    return (<>
        <p style={{fontWeight:700}}>Start by simply uploading a candidate resume or type the keywords directly to move ahead</p>
        <section className='flex-box'>
            <article>
                {/* <img ref={previewRef} id="preview" width="200" alt='' src='file:///Users/vishakha.nagpal/development/my_workspace/QMapper/src/uploads/6.docx' /> */}
                {/* <iframe src="http://127.0.0.1:5000/get-files/6.docx" title="W3Schools Free Online Web Tutorials"></iframe> */}
            </article>
            <article style={{ position: 'relative', borderRight: '1px solid #e1e1e1', margin: '0 50px', padding: '0 50px' }}>
                <p className='uploadButton button'
                    onClick={() => { uploadRef.current?.click() }}
                    title='Upload a resume to get some matching questions'
                >Upload Resume</p>
                <input ref={uploadRef} type='file' placeholder='Upload CV' id='upload' name='upload' style={{ height: '25px', width: '300px' }} onChange={uploadResume} />
            </article>
            <form>
                <input ref={searchRef} placeholder='Type comma separated keywords here' id='search'
                    name='search'
                    style={{ height: '25px', width: '300px' }}
                />
                <input id='quesCount' type='number' ref={questionCount} min='1' max='10' placeholder='Count' defaultValue='5' name='quesCount' style={{ height: '25px', width: '40px', marginLeft: '20px' }} />
                <button type='button' className='button'
                    onClick={fetchMatchingQues4Words}
                // disabled={!searchRef.current?.value?.length}
                >Search</button>
            </form>
            <article style={{
                borderLeft: '1px solid #e1e1e1', margin: '0 50px', padding: '0 50px', position: 'absolute',
                top: '30px', right: '10%'
            }}>
                <p className='resetButton button' onClick={handleResetAction}>Reset</p>
            </article>
        </section>
        {/* {words.length && <p style={{textAlign:'left'}}>words</p>} */}

        {isShowLoader ?
            <section className='loaderWrapper'>
                <Loader
                    type="Circles"
                    color="#e1e1e1"
                    height={300}
                    width={300}
                />
            </section> :
            <Tabs>
                <TabList>
                    <Tab>Keywords & Categories</Tab>
                    <Tab>Questions List</Tab>
                </TabList>
                <TabPanel>
                    <article className='wid-50'>
                        <h2>Keywords</h2>
                        {keywords && <p id='keywords'>{keywords.map(key => <span key={key}>{key}</span>)}</p>}
                    </article>
                    {pieDataList && <ChartComponent pieDataList={pieDataList}
                        similarityObject={similarityObject}
                    />}
                </TabPanel>
                <TabPanel>
                    {questionsList.length ?
                        <section className='questionsWrapper'>
                            <article className='cta-wrapper' style={{ textAlign: 'left', margin: '0 11%' }}>
                                <label style={{ marginRight: '20px', fontWeight: 500 }}>Select the round type</label>
                                <input type='radio' checked name='round_type' className='radio' id='coding' />
                                <label style={{ marginRight: '20px' }} htmlFor='coding'>Coding Round</label>
                                <input type='radio' name='round_type' className='radio' id='Managerial' />
                                <label htmlFor='Managerial'>Managerial Round</label>
                            </article>
                            <article className='flex-box ques-table-wrapper' style={{ backgroundColor: 'transparent' }}>
                                <QuestionViewer questionsData={questionsList} />
                            </article>
                        </section> : null
                    }
                </TabPanel>
            </Tabs>
        }


    </>)
}


export default UploaderComponent;