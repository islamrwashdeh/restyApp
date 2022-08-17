import React from 'react';
import './results.scss';
import { PushSpinner } from "react-spinners-kit";
export default function Results(props) {
  return (
    <section >
      <div className='divi'>
        <p>Method: {props.method}</p>
        <p> URL: {props.url}</p>
      </div>
    
      <div className="box">
      {props.loading ? (
          <div id='loader'>
            < PushSpinner size={200} color={'cyan'} />
          </div>
        ) : (
          < pre className="json"> {props.data ? JSON.stringify(props.data, 100, 2) : null}</pre>
        )
        }
      </div>
    </section >
  );
}