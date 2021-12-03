var conn = require('../inc/db')
var menus = require('../inc/menus')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{

    res.render('index', { 
      title: 'Restaurante Saboroso', 
      menus: results 
    });

  })
  

});

router.get('/contacts',function(req,res,next){

  res.render('contacts', {title: 'Contato - Restaurante saboroso',
  background: 'images/img_bg_3.jpg',
  h1: 'Diga um oi!'
})

})

router.get('/menus',function(req,res,next){

  menus.getMenus().then(results=>{

    res.render('menus', {title: 'menus - Restaurante saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'Saboreie nosso menu',
    menus: results})
  })

})

router.get('/reservations',function(req,res,next){

  res.render('reservations', {title: 'reservas - Restaurante saboroso',
  background: 'images/img_bg_2.jpg',
  h1: 'Reserve uma mesa'})

})

router.get('/services',function(req,res,next){

  res.render('services', {title: 'servicos - Restaurante saboroso',
  background: 'images/img_bg_1.jpg',
  h1: 'E um prazer poder servir!'})

})
module.exports = router;
