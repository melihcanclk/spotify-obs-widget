# spotify-obs-widget
Spotify obs widget that user logged in and show its currently playing song. In the site that is seen in `About` part is my own [deployment](https://spotify-obs-widget.onrender.com/song.html). Spotify API says that to be able to get the access token, you have to go to dashboard and get client id and client secret. So because of I can't share my own client id and client secret, you have to create your own spotify app from dashboard and get your own client id and client secret. You can follow the steps in [How to use](#how-to-use) part.

## Screenshot from the widget
![Screenshot from widget](./screenshot/Screenshot%20from%202023-07-30%2005-27-27.png)

## How to use
1. Clone this repo
2. Install dependencies
```bash
npm install
```

3. Run the app
```bash
npm run dev
```
4. You have to create a spotify app in [spotify developer dashboard](https://developer.spotify.com/dashboard/applications) and get the client id and client secret

5. You have to add `http://localhost:3000/callback` to the redirect uris in your spotify app settings

6. Copy `.env.local` file as `.env` file in the root directory and fill the necessary fields

7. Open your browser and go to `http://localhost:3000/login` to login to your spotify account

8. After login, you will be redirected to `http://localhost:3000/song.html` and you will see the widget

9. You can add the widget to your obs by adding a browser source and set the url to `http://localhost:3000/song.html`

10. You can change the widget size by changing the width and height of the browser source (500x200 and 60fps is recommended)

## TODO
- [ ] login part will be configured and its style will be changed
- [ ] register part will be added so that users can register and login with their accounts, and their widgets and its settings will be saved in the database
- [ ] users will be able to customize the widget
- [ ] users will be able to add their own widgets
- [ ] users will be able to share their widgets with others

## License
[MIT](./LICENSE)

## Author
[Melihcan Çilek](
    https://www.linkedin.com/in/melihcanclk/
)

## Contributors
[Melihcan Çilek](
    https://www.linkedin.com/in/melihcanclk/
)

## Contact
You can contact me via email: [Melihcan Çilek](mailto:melihcanclk@hotmail.com) 

## Acknowledgements
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Render](https://dashboard.render.com/)