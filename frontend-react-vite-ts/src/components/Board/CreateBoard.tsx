import React from 'react'

export default function CreateBoard() {
  return (
    <div>
      <h2>CreateBoard</h2>
      <div style={{display: 'block', backgroundColor:'gainsboro'}}>
        <input placeholder='제목'></input>
        <textarea placeholder='내용'></textarea>
        <button>글쓰기</button>
      </div>
    </div>
  )
}
