const mongoose = require('mongoose')

const OLD_URI = 'mongodb+srv://portfolio9594_db_user:1Vv0tGTC8xHoe4XR@cluster0.suuynns.mongodb.net/myportfolio_db'
const NEW_URI = 'mongodb+srv://portfolio9594_db_user:y5jdO8GbzShx6oaJ@cluster0.f83g2sn.mongodb.net/portfolio'

const collections = ['users', 'projects', 'skills', 'experiences', 'testimonials', 'contacts', 'profiles', 'otps']

async function migrate() {
  const oldConn = await mongoose.createConnection(OLD_URI).asPromise()
  const newConn = await mongoose.createConnection(NEW_URI).asPromise()
  console.log('Connected to both clusters')

  for (const col of collections) {
    try {
      const docs = await oldConn.db.collection(col).find({}).toArray()
      if (docs.length === 0) { console.log(`${col}: empty, skipping`); continue }
      await newConn.db.collection(col).deleteMany({})
      await newConn.db.collection(col).insertMany(docs)
      console.log(`${col}: migrated ${docs.length} documents`)
    } catch (e) {
      console.log(`${col}: skipped (${e.message})`)
    }
  }

  await oldConn.close()
  await newConn.close()
  console.log('Migration complete!')
}

migrate().catch(console.error)
