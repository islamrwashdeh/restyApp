import React, { useState , useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import axios from 'axios';
import History from './components/history/index';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

export const ACTIONS = {
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  DELETE_FROM_HISTORY: 'DELETE_FROM_HISTORY',
}

function reducer(histories, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_HISTORY:
      return [...histories, newHistory(action.payload)]
    case ACTIONS.DELETE_FROM_HISTORY:
      return [...histories, action.payload]
    default:
      return histories
  }
}

function newHistory(action) {
  return { id: Date.now(), history: action }
}


export default function App() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState(null);
  const [requestParams, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const [histories, dispatch] = useReducer(reducer, []);


  const handleApiCall = async (request) => {
    setRequest(request);
    let methodCall = request.method.toLowerCase();
    const response = await axios[methodCall](request.url, (request.body) ? (request.body) : null);
    setCounter(response.data.length)
    const result = {
      Headers: {
        "root": {
          "content-type": "application/json; charset=utf-8",
        }
      },
      results: {
        count: counter,
        data: response.data,
      }
    };
    setData(result);
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 3000);

    dispatch({ type: ACTIONS.ADD_TO_HISTORY, payload: { requestParams: request, data: result } });

  }
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path="/" element = {  <><div className='body'>
      <Form handleApiCall={handleApiCall} />
      <Results data={data} 
        url={requestParams.url} method={requestParams.method} />
        </div>
      
      </>}>
    
      </Route>
      <Route path="/history" element =  {<><History histories={histories} />
        <div>
        <p> i am working</p>
      </div>
      </>}>
   
        </Route>
    
        </Routes>
        <Footer />
      </Router>
  );
}
