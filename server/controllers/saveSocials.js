const jwt_decode = require('jwt-decode');
const User = require("../models/User")

const saveSocials = async (req, res) => {
  const {tokenMail, socials} = req.body
  try{
    const decodedTokenMail = jwt_decode(tokenMail, process.env.JWT_SECRET)
    const email = decodedTokenMail.email
    console.log(email)
    const user = await User.findOne({email: email})
    console.log(user)
    user.socialMedia = socials
    user.save()
    return res.json({message: 'saved', status: "success"})
  } catch(err) {
    return res.json({status: 'error', error: err.message})
  }
}
const saveProfile = async (req, res) => {
  const {tokenMail, name, bio , avatar} = req.body
  try{
    const decodedTokenMail = jwt_decode(tokenMail, process.env.JWT_SECRET)
    const email = decodedTokenMail.email
    console.log(email)
    const user = await User.findOne({email: email})
    console.log(user)
    user.name = name;
    user.bio = bio;
    user.avatar = avatar;
    user.save()
    return res.json({message: 'saved', status: "success"})
  } catch(err) {
    return res.json({status: 'error', error: err.message})
  }
}

const saveLinks = async(req, res) => {
  const {tokenMail, links} = req.body
  try{
    const decodedTokenMail = jwt_decode(tokenMail, process.env.JWT_SECRET)
    const email = decodedTokenMail.email
    console.log(email)
    const user = await User.findOne({email: email})
    console.log(user)
    const newLinks = links.map((link) =>({
      url: link.link.url,
      title: link.link.title,
      icon: ''
    }))
    user.links = newLinks;
   await user.save()
    return res.json({message: 'saved', status: 'success'})
  }catch(err){

}
}

module.exports = {
    saveSocials,
    saveProfile,
    saveLinks
}