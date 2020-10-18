import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { ButtonGroup } from "react-native-elements";

const LanguageButton = (props) => {
  const buttons = ["GB", "US"];
  //get selected country index from parent screen
  let index = buttons.indexOf(props.country);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(index);

  const buttonGroupHandler = (selectedIndex) => {
    setSelectedLanguageIndex(selectedIndex);
    props.setLanguage(buttons[selectedIndex]);
  };

  return (
    <ButtonGroup
      buttons={buttons}
      selectedIndex={selectedLanguageIndex}
      buttonContainerStyle={styles.buttonGroup}
      textStyle={styles.text}
      selectedButtonStyle={styles.colorSelected}
      selectedTextStyle={styles.textSelected}
      onPress={buttonGroupHandler}
      disabled={props.isDisabled}
      disabledSelectedStyle={styles.disabled}
    />
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    padding: 5,
  },
  colorSelected: {
    backgroundColor: "transparent",
  },
  text: {
    color: Platform.OS === "android" ? Colors.primary : "",
  },
  textSelected: {
    color: Platform.OS === "android" ? Colors.primary : "",
    fontSize: 20,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "transparent",
  },
});

export default LanguageButton;
