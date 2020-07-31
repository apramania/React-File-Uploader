const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.use(fileUpload())

//upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null){
        return res.status(400).json({ msg: 'File not Uploaded' })
    }

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })

    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server Started..'))