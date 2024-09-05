import React, { useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { selectImage } from './src/SelectImage';
// @ts-ignore
import TesseractOcr, { LANG_ENGLISH } from '@onlytabs/react-native-tesseract-ocr';

const tessOptions = {
  whitelist: null,
  blacklist: null,
  psm: 7,
  oem: 1,
  dpi: 300,
  LANG_ENGLISH,
  // For iOS only
  // For iOS, you can specify the language in the options like this:
  // lang: 'LANG_ENGLISH',
  // For Android, you can specify the language in the options like this:
  // lang: 'eng',
};

function App() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleImageUpload = async () => {
    setError(null);
    setLoading(true);
    try {

      const imageUri = await selectImage();
      console.log("Selected image:", imageUri);

      // Use Tesseract OCR to extract text from the image
      const extractedText = await TesseractOcr.recognize(imageUri, LANG_ENGLISH, tessOptions);
      console.log('Extracted Text:', extractedText);
      setResponse(extractedText);
      setLoading(false);

    } catch (error) {
      console.log('Error during image processing:', error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          loading ? (
            // Show a loading spinner from react native
            <ActivityIndicator />
          ) : (
            <Button title="Select Image" onPress={handleImageUpload} />
          )
        }
        {response && <Text style={styles.responseText}>{response}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default App;
