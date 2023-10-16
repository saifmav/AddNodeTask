const express = require('express');
const cors = require('cors')
const multer = require('multer');
const { uuid } = require('uuidv4');
const fs = require('fs')

const app = express();
const port = 3001;

//cors
app.use(cors())

// Multer Configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../frontend/src/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage });

const filesFormatter = ({files})=> {
    const result  = files.map((body,i) =>({
        uuid: uuid(),
        name: body?.originalname?.split('.')[0],
        size: `${body?.size} Kb`,
        filename: body?.filename,
        date: new Date().toLocaleString(),
        type: body?.filename?.split('.')[1]

    }))
    return result
}

app.post('/upload', upload.array('files', 20), function (req, res, next) {
    try {
        if (!req.files) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filedata = filesFormatter({
            files: req.files
        })
        const data = fs.readFileSync('db.json',{ encoding: 'utf8', flag: 'r' })
        let newData = JSON.parse(data)
        newData = [...newData, ...filedata]
        fs.writeFileSync('db.json', JSON.stringify(newData));
        res.json(newData);
    } catch (error) {
        throw error
    }
   
})

app.get('/documents',function (req, res, next) {
   try {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData)
     });
   } catch (error) {
        throw error
   }
})

app.delete('/delete/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            const jsonData = JSON.parse(data);
            const newData = jsonData.filter((item) => item.uuid !== uuid);
            fs.writeFile('db.json', JSON.stringify(newData), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                } else {
                    res.status(200).json(newData)
                }
            });
        }
    });
});

app.get('/download/:uuid', function (req, res) {
    const fileId = req.params.uuid;
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const jsonData = JSON.parse(data);
        const filedata = jsonData.find((item) => item.uuid == fileId);
        const file = `../frontend/src/uploads/${filedata.filename}`
        if (fs.existsSync(file)) {
            res.status(200).download(file)
        } else {
            res.status(404).send("File not found");
        }

    })
});

  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});