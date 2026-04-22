const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://j0446247_db_user:${password}@ac-uxm9brf-shard-00-00.f1lmuo8.mongodb.net:27017,ac-uxm9brf-shard-00-01.f1lmuo8.mongodb.net:27017,ac-uxm9brf-shard-00-02.f1lmuo8.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-rypw4p-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Amo a mi novia yay',
  important: true,
})

//note.save().then(result => {
//  console.log('note saved!')
//  mongoose.connection.close()
//})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})