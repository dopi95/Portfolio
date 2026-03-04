import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

router.post('/image', verifyToken, upload.single('file'), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'testimonials',
      resource_type: 'auto'
    })

    res.json({ secure_url: result.secure_url })
  } catch (error: any) {
    res.status(500).json({ error: 'Upload failed', details: error.message })
  }
})

router.post('/public', upload.single('file'), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'testimonials',
      resource_type: 'auto'
    })

    res.json({ secure_url: result.secure_url })
  } catch (error: any) {
    res.status(500).json({ error: 'Upload failed', details: error.message || String(error) })
  }
})

export default router
