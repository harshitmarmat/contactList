const express = require('express');     
const path = require('path');
const PORT = process.env.PORT || 9000;

const Contact = require('./models/contact');
const db = require('./config/mongoose');
const { PRIORITY_ABOVE_NORMAL } = require('constants');
db();
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'view'));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching the contact from db',err);
            return;
        }
        return res.render('home',{
            contact_List : contacts
        });
    })
});



app.post('/create-contact',function(req,res){
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newAccount){
        if(err){
            console.log('Error in creating a contact');
            return;
        }
        console.log('****************',newAccount);
        return res.redirect('back');
    });
});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact from DB',err);
            return ;
        }
        return res.redirect('back');
    });
});

app.listen(PORT , function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    console.log('Server is running at ', PORT);
    return;
})
