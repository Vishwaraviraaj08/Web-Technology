const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
const uri = 'mongodb+srv://vishwaraviraaj08:vishwa08@cluster0.5k8hasb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a mongoose schema for the Student model
const studentSchema = new mongoose.Schema({
    regNo: String,
    marks: {
        subject1: Number,
        subject2: Number,
        subject3: Number,
        subject4: Number,
        subject5: Number,
        subject6: Number,
    }
});

// Create a mongoose model based on the schema
const Student = mongoose.model('Student', studentSchema);

// Set up your routes
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Server started');
    res.sendFile(__dirname + '/index.html');
});

app.post('/getMarks', async (req, res) => {
    const regNo = req.body.regNo;

    try {
        const student = await Student.findOne({ regNo });
        if (student) {
            res.send(generateTable(student.marks));
        } else {
            res.send('Student not found');
        }
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.send('Error fetching data from the database');
    }
});

function generateTable(marks) {
    return (`
        <table border="2">
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
          <tr>
            <td>Subject 1</td>
            <td>${marks.subject1}</td>
          </tr>
          <tr>
            <td>Subject 2</td>
            <td>${marks.subject2}</td>
          </tr>
          <tr>
            <td>Subject 3</td>
            <td>${marks.subject3}</td>
          </tr>
          <tr>
            <td>Subject 4</td>
            <td>${marks.subject4}</td>
          </tr>
          <tr>
            <td>Subject 5</td>
            <td>${marks.subject5}</td>
          </tr>
          <tr>
            <td>Subject 6</td>
            <td>${marks.subject6}</td>
          </tr>
        </table>
    `);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
