# Cozy Corner

Cozy Corner is a web application created with React and Python that allows users to organize their video game collection digitally, discover new video games, and connect with fellow players through reviews. Please note that you cannot play the video games on the website; it serves as a platform for managing and reviewing your gaming experience.

## Features

### My Corner Page

- **Personalized Game Lists:** Create game lists with custom names such as "Owned," "Backlog," and "Wishlist."
- **Color Customization:** Change the color of the game list card for a personalized touch.
- **Detailed List View:** Switch to a details view of a list, displaying a table with game titles and checkboxes for 'Currently Playing,' 'Played,' 'Finished,' and 'Endless.'
- **Game Deletion:** Easily delete games from a list.
- **List Management:** Delete entire lists or navigate to a game search page ('Find a Game') from inside a list.

### Games Page

- **Game Cards:** View game cards with titles and images from an API.
- **Search Functionality:** Search for games by name.
- **Detailed Game View:** Click into a game to see detailed information including title, release date, ESRB rating, description, developer(s), platform(s), publisher(s), genre(s), tag(s), and available stores.
- **Howlongtobeat Integration:** View average gameplay times from the Howlongtobeat API.
- **Add to Lists:** Add games to your personalized game lists or write a review directly from the game details page.

### Reviews Page

- **Review Overview:** See game reviews from other users.
- **Search Functionality:** Search for reviews by game name.
- **Filtering Options:** Filter reviews by rating and platform.
- **Detailed Review View:** Click into a review to see the entire review along with options to edit or delete.

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Tailwind CSS
  - daisyUI
  - date-fns

- **Backend:**
  - Python
  - Flask
  - SQLAlchemy

- **APIs:**
  - Giant Bomb API (for game details)
  - Howlongtobeat API (for average gameplay times)

Feel free to explore, organize your game collection, and share your gaming experiences with the Cozy Corner community!