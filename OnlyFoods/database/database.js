import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('recipeApp.db');

export const initDatabase = async () => {
    const database = await db;

    //will get rid of all existing data in database, but it's fine we
    //only have test users in so far
    //await database.execAsync(`DROP TABLE IF EXISTS favorite_recipes;`);
    //await database.execAsync(`DROP TABLE IF EXISTS users;`);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            bio TEXT NOT NULL DEFAULT '',
            imageUrl TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS favorite_recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            api_recipe_id TEXT NOT NULL,
            recipe_title TEXT,
            saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);

};


//to be implemented in about.tsx
export const getUserProfile = async (userId) => {
    try{
      const database = await db;
      const user = await database.getFirstAsync('SELECT * FROM users WHERE id = ?', [userId]);

      if(!user){
        return null;
      }
      return user;
    } catch (error){
        console.error('Error getting user data:', error);
        throw error
    }
  };

  
  export const insertFavoriteRecipe = async (userid, apiRecipeId, recipeTitle) => {
    try{
        const database = await db;
        await database.runAsync(
            'INSERT OR IGNORE INTO favorite_recipes (user_id, api_recipe_id, recipe_title) VALUES (?,?,?)',
            [userid, apiRecipeId, recipeTitle]
        );
        return true;
    }catch(error){
        console.error('Error with favorite:', error);
        Alert.alert('Error', 'Unable to favorite recipe. Try again.');
        return false;
    }
  };

//to be implemented in about.tsx
export const updateUserProfile = async (username, userBio, imageUrl, userId) => {
    try{
        const database = await db;
        const result = await database.runAsync('UPDATE users SET username= ?, bio = ?, imageUrl = ? WHERE id = ?',
             [username, userBio, imageUrl, userId]);
    } catch(error){
        console.log('Error with update:', error);
        throw error;
    }
};


export default db;

/*
install you may have to run
npm install expo@~54.0.0
npx expo install --fix -- --legacy-peer-deps
npx expo install react-native-worklets

if having issues:
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
*/
