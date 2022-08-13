import React from 'react';
import './results.scss';
export default function Results(props) {
  return (
    <section >
      <div className='divi'>
        <p>Method: {props.method}</p>
        <p> URL: {props.url}</p>
      </div>
      <div className="box">
        < pre > {props.data ? JSON.stringify(props.data, 100, 2) : null}</pre>
      </div>
    </section >
  );
}