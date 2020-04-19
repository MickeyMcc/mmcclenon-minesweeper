import * as React from 'react';

const images = {
  0: (require('./assets/check-box-empty.png')),
  1: (require('./assets/one.png')),
  2: (require('./assets/two.png')),
  3: (require('./assets/three.png')),
  4: (require('./assets/four.png')), 
  5: (require('./assets/five.png')),
  6: (require('./assets/six.png')), 
  7: (require('./assets/seven.png')),
  8: (require('./assets/eight.png')),
  square: (require('./assets/rounded-black-square-shape.png')),
  bomb: (require('./assets/bomb.png')),
  flag: (require('./assets/flag.png')),
}

const Cell = (props) => {
  const { endstate, onClick, onRightClick, cheating } = props;

  const { clicked, nearby, isMine, flagged } = props.metadata;
  // cheating reveal bombs
  if(cheating && isMine) {
    return <img style={{padding: '2px'}} src={images['bomb']} height={25} width={25} />
  }
  // show flag, if flagged and unclicked
  if (!clicked && flagged && !endstate) {
    return <img style={{ padding: '2px' }}  src={images['flag']} height={25} width={25} onClick={() => onClick()} onContextMenu={(e) => onRightClick(e)} />
  }
  // unclicked, unflagged, square
  if (!clicked && !endstate) {
    return <img style={{ padding: '2px' }}  src={images['square']} height={25} width={25} onClick={() => onClick()} onContextMenu={(e) => onRightClick(e)}/>
  };
  // clicked mine || endstate
  if (isMine) {
    return <img style={{ padding: '2px' }} src={images['bomb']} height={25} width={25} />
  }
  // is clicked or game over, show number nearby
  return <img style={{ padding: '2px' }} src={images[nearby]} height={25} width={25} />
}

export default Cell;
