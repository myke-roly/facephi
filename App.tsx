/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet, NativeEventEmitter, useColorScheme, View, Platform } from 'react-native';
import RNSelphiFacePluginModule from 'react-native-selphi-face-plugin';
import * as WidgetSelphiEnums from 'react-native-selphi-face-plugin/js/WidgetSelphiEnums';
import { WidgetSelphiConfiguration } from 'react-native-selphi-face-plugin/js/WidgetSelphiConfigurations';
import SelphiImage from './components/selphi/SelphiImage';
import SelphiTitleText from './components/selphi/SelphiTitleText';
import SelphiTopBar from './components/selphi/SelphiTopBar';
import SelphiButton from './components/selphi/SelphiButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelphiModal from './components/selphi/SelphiModal';
import SelphiModalIOS from './components/selphi/SelphiModalIOS';

const App = () =>
{
  const config: WidgetSelphiConfiguration = {
    debug: false,
    fullscreen: true,
    enableImages: false,
    livenessMode: WidgetSelphiEnums.WidgetLivenessMode.PassiveMode,
    frontalCameraPreferred: true,
    enableGenerateTemplateRaw: false,
    tutorial: false,
    jpgQuality: 0.95,
  };

  const [sdkConfig, setSdkConfig]               = useState(config);
  const [message, setMessage]                   = useState('Preview selfie');
  const [bestImage, setBestImage]               = useState(null);
  const [textColorMessage, setTextColorMessage] = useState('#777777');
  const [modalVisible, setModalVisible]         = useState(false);
  //const [showError, setShowError]             = useState(false);

  // These params are used for logging purposes. It must be used if the configuration property "enableWidgetEventListener" is true.
  // const widgetEmitter = new NativeEventEmitter(); // Optional: For iOS events
  // const SELPHI_LOG_EVENT = 'onSelphiLogEvent';

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const makeSelphi = async () => 
  {
    try 
    {
      console.log("Starting makeSelphi...");
      return await RNSelphiFacePluginModule.startExtraction('fphi-selphi-widget-resources-selphi-live-1.2', sdkConfig)
      .then((result: any) => 
      {
        console.log(result)
        processResult(result);
      })
      .catch((error: any) => 
      {
        console.log(JSON.stringify(error))
        setMessage(JSON.stringify(error));
        setBestImage(null);
        //setShowError(true);
        setTextColorMessage('#DE2222');
      });
    } 
    catch (error) {
      //alert(JSON.stringify(error));
    }
  };
  
  const processResult = (result: any) => 
  {
    switch (parseInt(result.finishStatus, 10)) 
    {
      case WidgetSelphiEnums.WidgetFinishStatus.Ok: // OK
        setMessage('Preview selfie');
        setBestImage(result.bestImage);
        //setShowError(false);
        setTextColorMessage('#777777');
        break;

      // Shows the result operation.
      case WidgetSelphiEnums.WidgetFinishStatus.Error: // Error
        if (result.errorType) {
          setMessage('Internal widget error');
          setBestImage(null);
          //setShowError(true);
          setTextColorMessage('#DE2222');
        }
        break;

      case WidgetSelphiEnums.WidgetFinishStatus.CancelByUser: // CancelByUser
        setMessage('The user cancelled the operation');
        setBestImage(null);
        //setShowError(true);
        setTextColorMessage('#DE2222');
        break;

      case WidgetSelphiEnums.WidgetFinishStatus.Timeout: // Timeout
        setMessage('Exit by timeout');
        setBestImage(null);
        //setShowError(true);
        setTextColorMessage('#DE2222');
        break;

      default:
        setMessage('Unknown error');
        setBestImage(null);
        //setShowError(true);
        setTextColorMessage('#DE2222');
        break;
    }
  };
    
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={[styles.viewScrolled, backgroundStyle]}>
        <View style={[ { backgroundColor: isDarkMode ? Colors.black : Colors.white }, styles.container ]}>
          <SelphiTopBar onPress={() => setModalVisible(true)}/>
          <SelphiTitleText text={ message } textColor={ textColorMessage } />
          <SelphiImage image={ bestImage } />
          <SelphiButton onPress={ makeSelphi } text="Start" />
        </View>
        {Platform.OS === 'android' 
            ? <SelphiModal modalVisible={modalVisible} setModalVisible={setModalVisible} config={config} sdkConfig={sdkConfig} setSdkConfig={setSdkConfig}/>
            : <SelphiModalIOS modalVisible={modalVisible} setModalVisible={setModalVisible} config={config} sdkConfig={sdkConfig} setSdkConfig={setSdkConfig}/>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScrolled: {
    height: '100%',
  },
});

export default App;