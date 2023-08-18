const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const fs = require('fs');
const path = require('path');

const User = require('./models/user.js');
const Place = require('./models/place.js');
const Booking = require('./models/booking.js');
const salt = bcrypt.genSaltSync(10);

const jwtSecret = 'wfhiolkmpeqpgdğqdprqwpyotrvn248258mmi';

const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const mime = require('mime-types');
const { env } = require('process');

const app = express();
const port = 5000;
require('dotenv').config()
const bucket = "app-booking";

const corsOptions = {
  origin: ['https://mern-app-booking.vercel.app',],
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.json());
app.use(cookieParser());

  // MongoDB connection
const uri = process.env.URL;


async function uploadToS3(path, originalFilename, mimetype){
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.Access_key,
      secretAccessKey: process.env.Secret_access_key
    }
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length-1];
  const newFilename = Date.now() + '.'+ ext;
  const data = await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body:fs.readFileSync(path), 
    Key: newFilename,
    ContentType:mimetype,
    ACL: 'public-read',
  }))

return  `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

// Register route
app.post('/api/register', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    const userDoc = await newUser.save();
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(500).json({ error: 'Error during registration' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token, { httpOnly: true });
          res.json({ token, userDoc });
        })
      } else {
        res.json({ message: 'Password not okay' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

///token 

app.get('/api/profile', (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const token = req.cookies.token; 

  if (token) {
    // Verify the token
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: 'Invalid token' });
      } else {
        const {name,email,id}= await User.findById(decoded.id);
        res.json({ name ,email ,id });
      }
    });
  } else {
    res.status(401).json({ message: 'Token not found in the cookie' });
  }
});

//logout
app.post('/api/logout', (req, res)=>{
  res.cookie('token', '').json('token deleted')
})

///photo upload with link
app.post("/api/photosWithLink", async (req, res)=>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   const {link} = req.body;
   const photoName ='photo'+ Date.now() + '.jpg';
   await download.image({
    url: link,
    dest :  '/tmp/' + photoName
  });
  const url = await uploadToS3('/tmp/' + photoName ,photoName , mime.lookup( '/tmp/' + photoName))
  res.json(url);
})

//upload photo locally

const photoMiddleware = multer({ dest: '/tmp' }); 
app.post("/api/upload", photoMiddleware.array('photos', 100), async (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype  } = req.files[i];
    const url = await uploadToS3(path, originalname,mimetype)
    uploadFiles.push(url);
  }
  res.json(uploadFiles);
});






///place creating sending
app.post('/api/addPlace', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const { title, address, email, desc, photo, checkIn, checkOut, guest, selected, price } = req.body;
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    const placeDoc = await Place.create({
      owner: decoded.id,
      title, address, email, desc, photo,
      checkIn, checkOut, guest, selected, price 

    });

    res.json({ placeDoc }); 
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});
///place update
app.put('/api/addPlace', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    const { actions, title, address, email, desc, photo, checkIn, checkOut, guest, selected, price } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const placeDoc = await Place.findById(actions);
    
    if (!placeDoc) {
      return res.status(404).json({ error: 'Place not found' });
    }

    if (placeDoc.owner.toString() !== decoded.id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    placeDoc.title = title;
    placeDoc.address = address;
    placeDoc.email = email;
    placeDoc.desc = desc;
    placeDoc.photo = photo;
    placeDoc.checkIn = checkIn;
    placeDoc.checkOut = checkOut;
    placeDoc.guest = guest;
    placeDoc.selected = selected;
    placeDoc.price = price;

    await placeDoc.save();
    res.json({ message: 'Place updated successfully', placeDoc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// listing of places page for spesific user
app.get('/api/listUserPlaces', async (req, res) =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const token = req.cookies.token;
  const decoded = jwt.verify(token, jwtSecret);
  const {id} = decoded
  const places = await Place.find({owner:id});
  res.send(places)
})
// listing of places page for all user
app.get('/api/listPlaces', async (req, res) =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const places = await Place.find();
  res.send(places)
})
//  listing single place to put data 
app.post('/FormPage', async (req, res) =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const requestData = req.body.actions;
  const place = await Place.findById(requestData)
  res.send(place)
})

//selected place
app.post('/api/singlePlace', async (req, res) =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const params = req.body
  const places = await Place.findById(params.id);
  res.send(places)
})
//  listing single place to put data 
app.post('/api/FormPage', async (req, res) =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const requestData = req.body.actions;
  const place = await Place.findById(requestData)
  res.send(place)
})

//booking place post
app.post('/api/bookPlace', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const {place,title,price,photo, checkIn, checkOut,user, guestCheck, name, phone} = req.body;
  const bookingDoc = await Booking.create({
   place,price,title,photo, checkIn,user, checkOut, guestCheck, name, phone
  })
  res.send(bookingDoc);
});


/// booking place get
app.get('/api/bookPlace', async (req, res) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   const token = req.cookies.token;
   const decoded = jwt.verify(token, jwtSecret);
  const {id} = decoded
   const place = await Booking.find({user:id});
  res.send(place);
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
