<a id="readme-top"></a> 
# OnlyFoods App
## Overview
 This projest is a recipe search app. Users can create an account on the app to search and save any recipes that interest them. When they search a recipe, 
 there is a filter bar in case they want something specific and they will be redirected to an new list of recipes. The new page lists the different recipes 
 of the search item they want and has the original link of the recipe. They will also be an option for each recipe to save it into their account so instead of
 searching for it again, they can look on their account page for their saved recipes. 

 
 



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [React] https://react.dev/
* [Expo SQLite] https://www.npmjs.com/package/expo-sqlite

  <img width="571" height="278" alt="image" src="https://github.com/user-attachments/assets/f695bc3e-aec9-4cb4-86a6-b5253f3c269e" />
  <img width="329" height="116" alt="image" src="https://github.com/user-attachments/assets/7e0165d2-9a99-44dd-8669-1626174d89a3" />


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key and ID at (https://www.edamam.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `recipeSearched.tsx`
   ```tsx
   const RECIPE_APP_ID = "ENTER API ID";
   const RECIPE_APP_KEY = "ENTER API KEY";
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
6. Install and set Android Studio virtual machine to run app on
7. Run the comman npm start in terminal
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Team Retrospective

### Communication
Communication was managed via Slack and team meetings twice a week.

### Issues 
- **Initially considered:** 26 issues 
- **Completed:** 24 issues

### Team Members

**Darius Cuevas**  
- Pull Requests: [link to PRs](#)  
- Issues: [link to Issues](#)  
- Role: [Fill in role here]
- **Biggest Challenge:**
   - **Why:**
   - **How addressed:** 
- **Favorite Part:**
- **If redo:**
- **Most Valuable Lesson:** 

**Jason Kim**  
- Pull Requests: [PR Link](https://github.com/JasonKimy/Group-14-Repo/issues?q=is%3Aclosed%20is%3Apr%20author%3AJasonKimy)  
- Issues: [Issue link](https://github.com/JasonKimy/Group-14-Repo/issues?q=is%3Aclosed%20is%3Aissue%20author%3AJasonKimy)  
- Role: Came up with the project idea, found and set up the API, and worked on the recipe searched page when the user searches a recipe whiched called the API for the recipes they want. 
- **Biggest Challenge: Imports**
   - **Why: There would be times when someone would add changes that would include imports. After merging the changes and updating my branch to main,
       when trying to run the code I would get errors for the missing imports. Would throw me off a bit and would have to figure out the imports.**
   - **How addressed: Asking teammates if they knew or just checking the error log and finding what to download.** 
- **Favorite Part: Setting up the searched page and adding style to it to look good. Was very satisfying when it was done and how it turned out.**
- **If redo: I'd redo working a little more on the CSS for the main page just so it looks better.**
- **Most Valuable Lesson: Where there's an import, there are at least 5 errors to expect.** 


**Aaron Perez**  
- Pull Requests: [link to PRs](https://github.com/JasonKimy/Group-14-Repo/pulls?q=is%3Apr+is%3Aclosed+author%3ATuffAaron)  
- Issues: [link to Issues](https://github.com/JasonKimy/Group-14-Repo/issues?q=is%3Aissue%20state%3Aclosed%20author%3ATuffAaron)  
- Role: Worked on the database, async storage, and allowing users to save their favorite recipes.
- **Biggest Challenge:**  Having to figure out how to work with React
   - **Why:** I'm already familiar with developing apps and webpages that use databases, APIs, and dynamically display data, but I had zero experience with React before this project. 
   - **How addressed:** I think it was in one of our lectures that I heard “You never know more about something than when you’re working on it”, and this is the way I addressed this challenge, just start working on it. Also, Roberto did point me to Async Storage which was a great help there.
- **Favorite Part:** The flatlist that displays the recipes. I like the look of it, and it's why I used the same design to display the user's favorite recipes.
- **If redo:**  I would have asked Roberto how to implement sessions first rather than initially sending the userId to every file as local Param. This could have saved me some time working on the project.
- **Most Valuable Lesson:** Learning how to work and communicate with a group and trusting in each other to complete our respective parts. Also, making sure that you inform the people your working on a project with about the installations that you added locally that they will have to also add (my bad).


**Magda Vicente**  
- Pull Requests: [PR](https://github.com/JasonKimy/Group-14-Repo/pulls?q=is%3Apr+is%3Aclosed+author%3Amozartella)  
- Issues: [Issues](https://github.com/JasonKimy/Group-14-Repo/issues?q=is%3Aissue%20state%3Aclosed%20author%3Amozartella)  
- Role: Worked mostly on Front End; touched up the database when needed. I made worked on the login page, the about user page, and insert recipe page. 
- **Biggest Challenge:** Working with the database and ensuring everything integrates correctly; also learning GitHub commands 
  - **Why:** I’m less confident with backend work and GitHub commands, and I worried about breaking things and causing any trouble for my team. Even if my files never had conflict with my teammates.
  - **How addressed:** Practiced regularly, asked teammates for help, reviewed slides, and researched GitHub commands online  
- **Favorite Part:** Organizing the layout of the pages  
- **If redo:** Gather all database information before starting development  
- **Most Valuable Lesson:** Learn the importance of understanding both front-end and back-end so you don't struggle and have to reply on your peers for back-end info. Also being more confident, my PRs never had conflict but always afraid to merge. 

## Conclusion
Most of the user stories and issues were completed as planned, and the app functions as intended. Users can search for recipes, save their favorites, and updated their about page successfully. The biggest win was having all features integrate smoothly—front-end functionality, database interactions, and API calls worked together as expected. The app was fully presentable and ready to demonstrate. Overall, the project was highly educational. While some challenges with backend integration and GitHub commands arose, they were overcome through practice, collaboration, and research. The team now has stronger skills in both front-end and back-end development and better understanding of project workflows and version control.


