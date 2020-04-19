import * as React from 'react';
import zero from './assets/check-box-empty.png';
import one from './assets/one.png';
import two from './assets/two.png';
import three from './assets/three.png';
import four from './assets/four.png'; 
import five from './assets/five.png';
import six from './assets/six.png'; 
import seven from './assets/seven.png';
import eight from './assets/eight.png';
import square from './assets/rounded-black-square-shape.png';
import bomb from './assets/bomb.png';
import flag from './assets/flag.png';

const images = {
  0: zero,
  1: one,
  2: two,
  3: three,
  4: four, 
  5: five,
  6: six, 
  7: seven,
  8: eight,
  square: square,
  bomb,
  flag,
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
