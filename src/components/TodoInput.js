import { useState } from 'react';

function TodoInput({ addList }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      addList(inputText);
      setInputText('');
    }
  };

  return (
    <div className='input-container'>
      <textarea
        className='input-box-todo'
        placeholder='Enter your Todo'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button className='btn' onClick={handleSubmit}>
        +
      </button>
    </div>
  );
}

export default TodoInput;