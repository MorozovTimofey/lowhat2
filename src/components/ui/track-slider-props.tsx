import * as React from "react";

interface TrackSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (newValue: number) => void;
  step?: number; // Добавляем свойство step
  className?: string;
}

const TrackSlider: React.FC<TrackSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1, // Устанавливаем значение по умолчанию для шага
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      step={step} // Устанавливаем шаг
      className="w-full cursor-pointer"
    />
  );
};

export default TrackSlider;
