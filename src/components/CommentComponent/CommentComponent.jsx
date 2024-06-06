import React from 'react'

const CommentComponent = (props) => {
  const {dataHref, width} = props
  return (
    <div style={{padding: '20px 20px', backgroundColor: 'white',marginTop: '20px'}}>
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>

    </div>
  )
}

export default CommentComponent