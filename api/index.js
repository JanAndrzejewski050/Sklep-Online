const express = require("express");
const app = express();


// test route
app.get("/", (req, res) => {
    res.send("app is running");
})

app.listen(9000, ()=>{
    console.log('server listening on port 9000');
});
