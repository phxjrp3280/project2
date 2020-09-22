const bcrypt = require('bcrypt')
const User = require('../models/users')

const newusr = (req,res) =>{
  res.render('newuser.ejs')
}

const create = (req, res) => {
  console.log(req.body , 'here')
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/score/splash')
  })
}

const login = async (req, res) => {
  try{
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
      return;
    }
    // user is found yay!
    // now let's check if passwords match
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
       // add the user to our session
       console.log('think I found a passord')
       req.session.currentUser = foundUser
       // redirect back to our home page
       res.redirect('/')
       return;
   }
     // passwords do not match
     res.send('<a href="/"> password does not match </a>')
 } catch(err){
   console.log(err)
   res.send('oops the db had a problem')
 }
}

const logout = async (req,res) => {
  req.session.destroy()
  res.redirect('/')
}

module.exports = {
  login,
  logout,
  newusr,
  create
}
