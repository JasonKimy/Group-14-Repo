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

    try {
        await database.execAsync(`ALTER TABLE users ADD COLUMN name TEXT DEFAULT '';`);
      } catch (error) {
        if (!error.message.includes("duplicate column name")) {
          console.error("Error adding name column:", error);
        }
      }

    try {
        await database.execAsync(`ALTER TABLE users ADD COLUMN favoriteFood TEXT DEFAULT '';`);
      } catch (error) {
        // Ignore error if column already exists
        if (!error.message.includes("duplicate column name")) {
          console.error("Error adding favoriteFood column:", error);
        }
      }

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS favorite_recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            recipe_title TEXT,
            recipe_url TEXT,
            image_url TEXT,
            saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            category TEXT,
            duration TEXT,
            imageUrl TEXT
        );
    `);
    
    console.log('Database initialized');

};


//to be implemented in about.tsx
export const getUserProfile = async (userId) => {
    try{
      const database = await db;
      const user = await database.getFirstAsync(
        'SELECT * FROM users WHERE id = ?', [userId]
    );

      return user || null;
    } catch (error){
        console.error('Error getting user data:', error);
        throw error
    }
  };

  
  export const insertFavoriteRecipe = async (userid, recipeTitle, recipeUrl, imageUrl) => {
    try{
        const database = await db;
        await database.runAsync(
            'INSERT OR IGNORE INTO favorite_recipes (user_id, recipe_title, recipe_url, image_url) VALUES (?,?,?,?)',
            [userid, recipeTitle, recipeUrl, imageUrl]
        );
        return true;
    }catch(error){
        console.error('Error with favorite:', error);
        Alert.alert('Error', 'Unable to favorite recipe. Try again.');
        return false;
    }
  };

  export const loadFavorites = async (userId) => {
    try{
        const database = await db;
        const favoriteRecipes = await database.getAllAsync(
            'SELECT * FROM favorite_recipes WHERE user_id = ?',
            [userId]
        );
        return favoriteRecipes
    } catch(error){
        console.error('Error loading favorites:', error);
        return [];
    }
  };

//to be implemented in about.tsx
export const updateUserProfile = async (name, userBio, imageUrl, favoriteFood, userId) => {
    try {
        const database = await db;
        await database.runAsync(
            'UPDATE users SET name = ?, bio = ?, imageUrl = ?, favoriteFood = ? WHERE id = ?',
            [name, userBio, imageUrl, favoriteFood, userId]
        );
        return true;
    } catch (error) {
        console.log('Error with update:', error);
        return false;
    }
};


//for recipe form by magda
export const insertRecipe = async (name, ingredients, instructions, category, duration, imageUrl) => {
    try {
      const database = await db;
      await database.runAsync(
        'INSERT INTO recipes (name, ingredients, instructions, category, duration, imageUrl) VALUES (?,?,?,?,?,?)',
        [name, ingredients, instructions, category, duration, imageUrl]
      );
      return true;
    } catch (error) {
      console.error('Error inserting recipe:', error);
      return false;
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
