import React, {useState} from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from 'firebase/database';

function Write() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const saveData = async() => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, 'nature/fruits'));
    set (newDocRef, {
      fruitName: inputValue1,
      fruitDefinition: inputValue2
    }).then(() => {
      alert('Data saved successfully!');

    }).catch((error) => {
      alert('Failed to save data: ' + error.message);
    });
  }


  return (
    <div>
      <input type='text' value={inputValue1}
      onChange={(e) => setInputValue1(e.target.value)} />
      <input type='text' value={inputValue2}
      onChange={(e) => setInputValue2(e.target.value)} /><br />
      <button onClick={saveData}>Save Data</button>
    </div>
  )
}

export default Write