import { useState } from 'react'
import globalRecipeFunctions from '../../store/RecipeAPICalls';

const ClearAPIComponent = () => {

  const [dangerButton, setDangerButton] = useState(true);
  const { clearAPI } = globalRecipeFunctions();

  const handleClick = () => {
    if (window.confirm('Are you sure?????')) {
      clearAPI();
    } else {
      console.log('user clicked cancel')
    }
  }

  return (
    <div>
      <h1>DANGER ZONE</h1>
      <button className='main-button' onClick={() => setDangerButton(!dangerButton)}>SHOW/HIDE DANGER BUTTON</button>
      <div>
        <button className='main-button' hidden={dangerButton} onClick={handleClick}>DELETE ALL RECIPES</button>
      </div>

    </div>
  )
}

export default ClearAPIComponent