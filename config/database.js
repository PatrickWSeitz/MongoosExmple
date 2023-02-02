if(process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:"mongodb+srv://Pseitz:dbPassword@cluster0.jpeof3d.mongodb.net/?retryWrites=true&w=majority"}
}
else{
    module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}