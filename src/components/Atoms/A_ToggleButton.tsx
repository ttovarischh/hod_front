import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Animated, TouchableOpacity } from "react-native";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch = styled.View<{ checked?: boolean }>`
  width: 76px;
  height: 36px;
  border-radius: 30px;
  background-color: ${({ checked }) => (checked ? "#F0FF00" : "#262626")};
  align-items: center;
  justify-content: center;
`;

const Slider = styled(Animated.View)<{ checked?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: ${({ checked }) => (checked ? "#0E0E0E" : "#EDF2DC")};
`;

const A_ToggleButton = ({ checked = false, onChange }: ToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const translateX = React.useRef(
    new Animated.Value(checked ? 20 : -20)
  ).current;

  const handleChange = () => {
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(!isChecked);
    }
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isChecked ? 20 : -20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isChecked]);

  return (
    <TouchableOpacity onPress={handleChange}>
      <Switch checked={isChecked}>
        <Slider style={{ transform: [{ translateX }] }} checked={isChecked} />
      </Switch>
    </TouchableOpacity>
  );
};

export default A_ToggleButton;
