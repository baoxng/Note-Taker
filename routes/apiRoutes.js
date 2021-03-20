
module.exports= function (app) {

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'))});

app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, '/public/notes.html'))});

app.post('/api/notes', (req, res)=> {
    fs.readFile(__dirname + '..db/db.json', 'utf8', (err, notes)=> {
        if (err) throw err;
        notes= JSON.parse(notes)
        const id = notes[notes.length - 1].id + 1
        const newNote = { title: req.body.title, text: req.body.text, id: id }
        const currentNote = notes.concat(newNote)
   
    fs.writeFile(__dirname + "db/db.json", JSON.stringify(currentNote), (err, data)=> {
        if (err) throw err;
        console.log(currentNote);
        res.json(currentNote)    
        })
    })
});
}