const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
const PlaceModel = require('./models/Place');
const download = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
const BookingModel = require('./models/Booking');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const mime = require('mime-types');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'wrigsapornvajzdmzhduqdlqprimnadf';
const bucket = 'jertam-booking-app';


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


async function uploadToS3(path, originalName, mimetype) {
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    });
    const parts = originalName.split('.');
    const ext = parts[parts.length - 1];
    const newFileName = `${Date.now()}.${ext}`;
    try {
        const data = await client.send(new PutObjectCommand({
            Bucket: bucket,
            Body: fs.readFileSync(path),
            Key: newFileName,
            ContentType: mimetype,
            ACL: 'public-read',
        }));
        return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    } catch(error) {
        console.error(error);
    }
}

const verifyUserData = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    });
};


app.get('/api/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
});


app.post('/api/register', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { name, email, password } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userAlreadyExists = await UserModel.findOne({ email });

        if (userAlreadyExists) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        const userDoc = await UserModel.create({
            name,
            email,
            password: hashedPassword 
        });

        res.status(201).json({ 
            id: userDoc._id, 
            name: userDoc.name, 
            email: userDoc.email 
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.post('/api/login', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;

    try {
        const userDoc = await UserModel.findOne({ email });

        if (!userDoc) {
            return res.status(404).json({ error: 'User not found' }); 
        }

        const passwordMatch = await bcrypt.compare(password, userDoc.password);

        if (passwordMatch) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Server error' }); 
    }
});

app.get('/api/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await UserModel.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/api/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        await download.image({
            url: link,
            dest: '/tmp/' + newName,
        });
        const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
        res.json( url );
    } catch (error) {
        console.error("Error processing upload:", error);
        res.status(500).json({ error: "Failed to process uploaded files" });
    }
});

const photosMiddleware = multer({dest: '/tmp'});
app.post('/api/upload', photosMiddleware.array('photos', 15), async (req, res) => {
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const { path, originalname, mimetype } = file;
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }

    res.json(uploadedFiles);

  } catch (error) {
    console.error("Error processing upload:", error);
    res.status(500).json({ error: "Failed to process uploaded files" });
  }
});

app.get('/api/user-places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json( await PlaceModel.find({owner:id}) );
    })
});

app.post('/api/places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const { 
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn, 
        checkOut, 
        maxGuests,
        price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await PlaceModel.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(placeDoc);
    })
    
});

app.put('/api/places/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
        id, 
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn, 
        checkOut, 
        maxGuests,
        price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await PlaceModel.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn, 
                checkOut, 
                maxGuests,
                price
            });
            placeDoc.save();
            res.json('ok')
        }

    })
});

app.get('/api/user-places/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    res.json(await PlaceModel.findById(id));
});

app.get('/api/place/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    res.json(await PlaceModel.findById(id));
});

app.get('/api/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json( await PlaceModel.find() );
})

app.post('/api/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price
    } = req.body;
    try {
        const userData = await verifyUserData(req);
        const PlaceDoc = await BookingModel.create({
            user: userData.id,
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price
        });
        res.json(PlaceDoc);
    } catch (error) {
        console.error("Error booking:", error);
        res.status(500).json({ error: "Failed to process booking place" });
    }
});



app.get('/api/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await verifyUserData(req);
    res.json( await BookingModel.find({user: userData.id}).populate('place') );
})




app.listen(4000);



