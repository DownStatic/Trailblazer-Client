Welcome to TrailBlazer!

This application is meant primarily for those interested in locating hikes and sharing their comments and pictures taken along the way. You can utilize the app without logging in but you will not be able to comment or upload landmark photos, and you will not receive recommendations for hikes near to you.

Signing in will allow you to access those functions. All pictures including the avatar photo are uploaded and stored on the (AWS) backend.

I sincerely hope you will enjoy this app!

## Technical details

This app was built with a React.js frontend using create-react-app and a Rails backend for one of the APIs and the image storage. The ActiveStorage gem is leveraged with AWS to store all the user-uploaded pictures. Trail details are courtesy of the HikingProject API at https://www.hikingproject.com, and maps are pulled using the geolocation data through Google maps API.

Authentication is accomplished with the BCrypt Ruby gem and JWTs together with Redux on the frontend.

For those interested in the source code, contributing, or providing any commentary at all, please feel free to visit my GitHub: https://github.com/DownStatic/Trailblazer-Client

The Rails backend repository is located at: https://github.com/DownStatic/Trailblazer-Server
