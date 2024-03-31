'use client';
import React, { useEffect, useState } from 'react';

function ColorSettings() {
  const [colors, setColors] = useState({
    '--primary': getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
    '--primary-foreground': getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground').trim(),
  });
  console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary'));
  const handleColorChange = (name: any) => (event: any) => {
    setColors((prevColors) => ({
      ...prevColors,
      [name]: event.target.value,
    }));
  };

  useEffect(() => {
    for (const [name, color] of Object.entries(colors)) {
      document.documentElement.style.setProperty(name, color);
    }
  }, [colors]);

  return (
    <div>
      {Object.entries(colors).map(([name, color]) => (
        <div key={name}>
          <label>{name}</label>
          <input type="color" value={color} onChange={handleColorChange(name)} />
        </div>
      ))}
    </div>
  );
}

export default ColorSettings;
