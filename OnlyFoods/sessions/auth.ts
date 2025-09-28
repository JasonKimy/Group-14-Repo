import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'userId';

export const saveUserId = async (userId: number): Promise<void> =>{
    try{
        await AsyncStorage.setItem(USER_ID_KEY, userId.toString());
    } catch(error){
        console.error('Error saving user ID:', error);
    }
};

export const getUserId = async (): Promise<number | null> =>{
    try{
        const userId = await AsyncStorage.getItem(USER_ID_KEY);
        return userId ? parseInt(userId, 10) :null;
    } catch(error){
        console.error('Error getting user ID:', error);
        return null;
    }
};

export const removeUserId = async (): Promise<void> => {
    try{
        await AsyncStorage.removeItem(USER_ID_KEY);
    } catch (error) {
        console.error('Error removing user ID: ', error);
    }
}

export const isLoggedIn = async (): Promise<boolean> => {
    const userId = await getUserId();
    return userId !== null;
}