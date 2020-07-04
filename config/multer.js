const multer = require('multer')

const config = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("file " , file)
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log("file " , file)
        cb(null, new Date().toISOString() + file.originalname)
    }
})


const saveToUploads = multer({ storage: config })

module.exports = {
    saveToUploads: saveToUploads.single('text/csv')
}