import { useState } from 'react';

export function FunInput({ label = 'My Label', className = '' }: { className: string, label: string }) {
  const [val, setVal] = useState('');

  return (
    <div className={`relative w-full ${className}`}>
      <input
        defaultValue={val}
        onChange={(e) => setVal(e.target.value)}
        className="fun-input peer"
        type="text"
        placeholder="Enter your name"
      />
      {/* eslint-disable-next-line */}
      <label className="fun-label">{label}</label>
    </div>
  );
}

export default FunInput;
