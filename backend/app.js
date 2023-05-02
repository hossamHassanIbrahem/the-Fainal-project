const express = require("express");
const app = express();
const mongoose = require("mongoose");
const paypal = require("paypal-express-checkout");
var cors = require("cors");
////////
const multer = require("multer")
const ImageModel = require("./image.model")
///////
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(express.json());
var ProductsRoutes = require("./Routes/products");
var OffersRoutes = require("./Routes/offers");
var ReviewsRoutes = require("./Routes/reviews");
var CategoriesRoutes = require("./Routes/categories");
const ordersRoutes = require("./Routes/orders");
const userRouters = require("./Routes/user");
const cartRouts = require("./Routes/cart");
const copounsRoutes = require("./Routes/copouns");
const wishlistRoutes = require("./Routes/wishlist");
const paymentRoutes = require("./Routes/payment");

const port = process.env.PORT || 3001;
require("dotenv").config();
console.log(`process.env`);
const dbConnection = require("./DB/connection");
dbConnection();


// storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename:(req, file, cb)=>{
    cb(null, file.originalname);
  }

});

const upload = multer({
  storage:Storage
}).single('testImage')






app.use("/Products", ProductsRoutes);
app.use("/Offers", OffersRoutes);
app.use("/Reviews", ReviewsRoutes);
app.use("/Categories", CategoriesRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", userRouters);
app.use("/cart", cartRouts);
app.use("/copouns", copounsRoutes);
app.use("/wishlist", wishlistRoutes)
app.use("/payment", paymentRoutes);

/////////////////////////////////
app.get("/upload",(req,res)=>{
  res.send("upload file")
});
app.post("/upload",(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err)
    }else{
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data:req.file.filename,
          contentType:'image/png'
        }
      });
      newImage.save()
      .then(()=>res.send("successfully uploaded"))
      .catch((err)=>console.log(err))
    }
  })
})
//

/**error exite  */
app.use("*", (req, res) => {
  res.status(404).end("not found");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.listen(port, () => console.log(`app listening on port ${port}!`));


 
