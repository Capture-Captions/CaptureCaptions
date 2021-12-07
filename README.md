# CaptureCaptions
## About
Over the last few years, with the rapid development of artificial intelligence, the generation of the
caption of images has progressively caught the considerable interest of several artificial
intelligence research groups and has become a fascinating and tedious mission. A large
component of scene comprehension, which encompasses the knowledge of computer vision and
natural language processing, is image caption, which produces natural language explanations
according to the content observed in an image.

Capture Captions takes any form of images and then gives an appropriate caption cooresponding to itfor both normal everyday tasks as well as for anomalies such as fire acchidents, car accidents, voilence,etc.
<hr>

## Installation
### Clone to your local repo
```
git clone https://github.com/Capture-Captions/CaptureCaptions.git
```

### Install dependencies
```
cd server npm install
```

### Setting up env
Make `.env` folder in root directory of this project and enter the following values
```
SESSION_NAME=
SESSION_SECRET=
SESSION_LIFETIME=
MONGO_URL=
MONGO_PASSWORD=
DB_NAME=captionsDB
SENDER_USER=<nodemailer_email>
SENDER_PASSWORD=<password>
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Running app
Run following command to open server in nodemon.
```
npm start
```
