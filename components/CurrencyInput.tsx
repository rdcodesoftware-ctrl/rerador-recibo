import React from 'react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, className, placeholder }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Remove everything that isn't a number
    val = val.replace(/\D/g, "");
    
    if (val === "") {
      onChange("");
      return;
    }

    // Convert to number and divide by 100 for cents
    const numberValue = parseFloat(val) / 100;
    
    // Format to currency BRL
    const formatted = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    onChange(formatted);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
    />
  );
};
