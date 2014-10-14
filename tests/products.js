

var expect = require('expect.js')
  , request = require('request')
  , mongoose = require('mongoose');

request = request.defaults({ json: true });

var Product;
var prods = [];

module.exports = function(uri){

  uri = uri + '/products';

  function CheckProduct(prod, def){
    expect(prod.name).to.be.equal(def.name);
    expect(prod.description).to.be.equal(def.description);
    expect(prod.imageURL).to.be.equal(def.imageURL);
    expect(prod.link).to.be.equal(def.link);

    expect(prod.usd).to.not.be.ok();
    expect(prod.ars).to.not.be.ok();
    expect(prod.__v).to.not.be.ok();
    expect(prod._id).to.not.be.ok();
  }

  describe('/products', function(){
    
    before(function(done){
      Product = mongoose.model('Product');
      
      Product.collection.remove(function(){
        createProducts(done);
      });
    });

    it('GET: should retrieve all current Products', function(done){
      
      request.get(uri, function (error, response, body) {
        expect(error).to.not.be.ok();
        expect(response.statusCode).to.be.equal(200);
        
        var result = response.body;
        expect(result).to.be.an('array');
        expect(result.length).to.be.equal(3);

        for(var i=0; i<result.length;i++){
          CheckProduct(result[i], prods[i]);
        }

        done();
      });
    });

  });

};

function createProducts(done){

  prods = [{
    description: "Cartucho de la serie 6000 para vapores orgánicos.",
    imageURL: "cartucho6001.JPG",
    link: "http://solutions.3m.com.ar/wps/portal/3M/es_AR/Mining/Home/Pages/Products_AR/?PC_7_RJH9U5230GE3E02LECFTDQOGF7_nid=33VFNH41V5beXPHQDVHFBXgl",
    name: "3M - Cartucho serie 6001",
    ars: 100,
    usd: 50
  },{
    description: "Ideal para la aplicación de rodenticidas. Utilizable en máscaras y semi máscaras de la serie 6000.",
    imageURL: "filtroparticulas2091.jpg",
    link: "",
    name: "3M - Filtro para partículas 2091",
    ars: 200,
    usd: 100
  },{
    description: "Se utiliza con los Filtros Serie 2000 de 3M(MR), con el Filtro 7093, P-100 de 3M(MR), con los Cartuchos Serie 6000 de 3M(MR) y con los Sistemas con Suministro de Aire o de Aire Forzado contra una gran variedad de gases, vapores y partículas peligrosas, de acuerdo con las aprobaciones de NIOSH.",
    imageURL: "máscara completa6800.jpg",
    link: "http://solutions.3m.com.ar/wps/portal/3M/es_AR/Health/Safety/Products/Catalog/?PC_7_RJH9U5230GE3E02LES9MG812H2_nid=GSD9N5CXWFgsF3RH7CD92NglDS2M6NCZG2bl",
    name: "3M - Máscara de cara completa serie 6000",
    ars: 300,
    usd: 400
  }];

  Product.create(prods, done);
}
