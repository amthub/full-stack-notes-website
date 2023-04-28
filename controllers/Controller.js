import authModel from '../models/auth.js'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class Controller{
    static login_post = async(req, res) => {
       
      const user = await authModel.findOne({email: req.body.email});
      if(user){
         const isMatch = await bcrypt.compare(req.body.password, user.password) 
         if(user.email === req.body.email && isMatch){
          const createtoken = (id) => {
            return jwt.sign({id}, 'amt-hub',{expiresIn: 3 * 24 * 60 * 60})
          }
          const token = createtoken(user._id)
          res.cookie('jwt',token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
          } )
          res.status(200).json({user: user._id});
         }
         else{
          res.redirect('/login')
         }
      }else{
        res.redirect('/signup')
      }

    }
    static signup_post = async(req, res) => {
      try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const doc = new authModel({
          email: req.body.email,
          password: hashPassword
        })
        const result =  await doc.save();
        console.log(result)
        const savedUser = await authModel.findOne({email: req.body.email})
        const createtoken = (id) => {
          return jwt.sign({id}, 'amt-hub',{expiresIn: 3 * 24 * 60 * 60})
        }
        const token = createtoken(result._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000})
        res.status(201).json({user: result._id})
      } catch (error) {
        console.log(error)
      }
      
    }
    static home = (req, res) => {
      res.render('home', {title: "Home"});
    }

    static blogPage = async (req, res) => {
      const result = await userModel.find();
      res.render('blog', {title:"Blogs", data:result});
    }

    static addNote = (req, res) => {
      res.render('addnote', {title: "add Note", });
    }

    static addData = async(req, res) => {
      try {
        
        const Doc = new userModel({
          topic: req.body.topic,
          content: req.body.content,
          username: res.locals.user.email
        })

        const result = await Doc.save()
        res.redirect('/blog');
      } catch (error) {
        console.log(error)
      }
        
    }

    static editNote = async(req, res) => {
      try {
        const note = await userModel.findById(req.params.id);
        
        res.render('edit', {data:note, title:"Edit"})
      } catch (error) {
        console.log(error)
      }
        
    }

    static updateNote = async(req, res) => {
      try {
         await userModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/blog')
      } catch (error) {
        console.log(error)
      }
      
    }

    static deleteNote = async(req, res) => {
      await userModel.findByIdAndDelete(req.params.id);
      res.redirect('/blog')
    }

    static likeNote = async(req, res) => {
      try {
        const id = await userModel.findById(req.params.id);
        id.like = !id.like;
        await userModel.findByIdAndUpdate(id.id, {like: id.like});
        res.redirect('/blog');
      } catch (error) {
        console.log(error)
      }
    }

    static favouriteNote = async(req, res) => {
      const result = await userModel.find({like: true})
      // console.log(result)
      res.render('favourite', {data: result, title: "Favourites"});
    }

    static login = (req, res) => {
      res.render('login', {title: 'login'})
    }
    static signup = (req, res) => {
      res.render('signup', {title: 'signup'})
    }

    static logout = (req, res) => {
      res.cookie('jwt', "", {maxAge: 1})
      res.redirect('/login');
    }
}

export default Controller