import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { PickerIOS } from '@react-native-picker/picker';

const SelphiModal = ({modalVisible, setModalVisible, config, sdkConfig, setSdkConfig}) => 
{
  const fullScreenList                = ["YES", "NO"];
  const scanModeList                  = ["PASSIVE", "NONE"];
  const debugList                     = ["YES", "NO"];
  const showTutorialList              = ["YES", "NO"];
  const enableImagesList              = ["YES", "NO"];
  const enableGenerateTemplateRawList = ["YES", "NO"];

  const [localFullScreen, setLocalFullScreen]     = useState(sdkConfig.fullscreen);
  const [localScanMode, setLocalScanMode]         = useState(sdkConfig.livenessMode);
  const [localDebug, setLocalDebug]               = useState(sdkConfig.debug);
  const [localShowTutorial, setLocalShowTutorial] = useState(sdkConfig.tutorial);
  const [localJPGQuality, setLocalJPGQuality]     = useState(sdkConfig.jpgQuality.toString());
  const [localEnableImages, setLocalEnableImages] = useState(sdkConfig.enableImages);
  const [localEnableGenerateTemplateRaw, setLocalEnableGenerateTemplateRaw] = useState(sdkConfig.enableGenerateTemplateRaw);

  useEffect(() => 
  {
      console.log("useEffect...");
  }
  , []);

  const setSelected = (value, option) => 
  {
    if (option == "enableGenerateTemplateRaw") 
    {
      setLocalEnableGenerateTemplateRaw(value == "YES" ? true : false);
      config.enableGenerateTemplateRaw = (value == "YES" ? true : false);

      recoverConfiguration("enableGenerateTemplateRaw");
      setSdkConfig(config)
    }

    if (option == "enableImages") 
    {
      setLocalEnableImages(value == "YES" ? true : false);
      config.enableImages = (value == "YES" ? true : false);

      recoverConfiguration("enableImages");
      setSdkConfig(config)
    }

    if (option == "fullscreen") 
    {
      setLocalFullScreen(value == "YES" ? true : false);
      config.fullscreen = (value == "YES" ? true : false);

      recoverConfiguration("fullscreen");
      setSdkConfig(config)
    }

    if (option == "scanMode")
    {
      setLocalScanMode(value == undefined ? 'PASSIVE' : value);
      config.livenessMode = (value == undefined ? 'PASSIVE' : value);

      recoverConfiguration("scanMode");
      setSdkConfig(config)
    }

    if (option == "debug") 
    {
      setLocalDebug(value == "YES" ? true : false);
      config.debug = (value == "YES") ? true : false;

      recoverConfiguration("debug");
      setSdkConfig(config)
    }

    if (option == "showTutorial") 
    {
      setLocalShowTutorial(value == "YES" ? true : false);
      config.tutorial = (value == "YES" ? true : false);

      recoverConfiguration("showTutorial");
      setSdkConfig(config)
    }
  }

  const handleChangeJPGQuality = (value) => 
  {
    //console.log(value);
    setLocalJPGQuality(value);
    config.jpgQuality = parseFloat(value);

    recoverConfiguration("jpgQuality");
    setSdkConfig(config)
  }

  const recoverConfiguration = (avoid) => 
  {
    if (avoid !== "enableGenerateTemplateRaw")
    {
      config.enableGenerateTemplateRaw = localEnableGenerateTemplateRaw;
    }
    if (avoid !== "enableImages")
    {
      config.enableImages = localEnableImages;
    }
    if (avoid !== "debug")
    {
      config.debug = localDebug;
    }
    if (avoid !== "fullScreen")
    {
      config.fullScreen = localFullScreen;
    }
    if (avoid !== "showTutorial")
    {
      config.tutorial = localShowTutorial;
    }
    if (avoid !== "scanMode")
    {
      config.scanMode = localScanMode;
    }
    if (avoid !== "jpgQuality")
    {
      config.jpgQuality = parseFloat(localJPGQuality);
    }
  }

  return (
    <Modal
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
          }
        }
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black", paddingEnd: "3%" }}>JPG Quality:</Text>
                  <TextInput
                      //autoCapitalize={"characters"}
                      placeholder="JPG Quality"
                      style={{fontSize: 13, height: 41, width: 150, borderBottomWidth: 0.5, borderBottomColor: "grey"}}
                      keyboardType='numeric'
                      onChangeText={text => handleChangeJPGQuality(text)}
                      value={localJPGQuality === undefined ? "0.95" : localJPGQuality}
                      maxLength={4}
                      //onBlur={props.handleBlur('code')}
                  />
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>Mode:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={localScanMode === undefined ? "PASSIVE" : localScanMode}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "scanMode")
                    }>
                    {scanModeList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>FullScreen:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={localFullScreen === undefined ? false : (localFullScreen ?  "YES" : "NO")}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "fullscreen")
                    }>
                    {fullScreenList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>Debug:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={(localDebug ?  "YES" : "NO")}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "debug")
                    }>
                    {debugList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>ShowTutorial:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={localShowTutorial === undefined ? false : (localShowTutorial ?  "YES" : "NO")}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "showTutorial")
                    }>
                    {showTutorialList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>Template Raw:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={localEnableGenerateTemplateRaw === undefined ? false : (localEnableGenerateTemplateRaw ?  "YES" : "NO")}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "enableGenerateTemplateRaw")
                    }>
                    {enableGenerateTemplateRawList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                  <Text style={{ width: 90, color: "black" }}>Enable Images:</Text>
                  <PickerIOS
                    itemStyle={{ height: 125 }}
                    style={{ width: 250, transform: [{ scale: 0.81 }] }}
                    //mode="dialog"
                    selectedValue={localEnableImages === undefined ? false : (localEnableImages ?  "YES" : "NO")}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelected(itemValue, "enableImages")
                    }>
                    {enableImagesList.map((item, index) => {
                        return (<PickerIOS.Item label={item} value={item} key={index}/>) 
                    })}
                  </PickerIOS>
                </View>

                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 0.99,
    //justifyContent: "center",
    //alignItems: "center",
    //marginTop: 22
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    //marginTop: "5%"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SelphiModal;