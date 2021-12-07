# CaptureCaptions

## About

Over the last few years, with the rapid development of artificial intelligence, the generation of the
caption of images has progressively caught the considerable interest of several artificial
intelligence research groups and has become a fascinating and tedious mission. A large
component of scene comprehension, which encompasses the knowledge of computer vision and
natural language processing, is image caption, which produces natural language explanations
according to the content observed in an image.

Capture Captions takes any form of images and then gives an appropriate caption cooresponding to it. Primarily, our model is based on general activities captioning using MSCOCO Dataset. But, we have added a speacial feature of anomaly detection. It detects anomaly like car accident, fire accident, fights, injured people, terrorists, women being raped, people dead and bleeding or domestic violence. 2 points that make our project different from others:

- Only one research paper is published on anomaly detection. This is the first practical model to caption anomalies for the categories mentioned above.
- We have prepare are own Anomaly Detection (AD) dataset. We captioned to 2500 images and trained our model on own GPU.
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
MONGO_LOCAL=mongodb://localhost:27017/captionsDB
MONGO_URL=
MONGO_PASSWORD=
DB_NAME=captionsDB
SENDER_USER=<nodemailer_email>
SENDER_PASSWORD=<password>
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_MAIL=
```

### Running app

Run following command to open server in nodemon.

```
npm start
```
