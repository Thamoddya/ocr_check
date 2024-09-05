import { launchImageLibrary } from 'react-native-image-picker';

export const selectImage = async () => {
    const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    });

    if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Selected image:', imageUri);
        return imageUri;
    } else {
        throw new Error('Image selection canceled');
    }
};
