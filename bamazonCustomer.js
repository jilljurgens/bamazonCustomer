var mysql = require("mysql");
var inquirer = require("inquirer");
//move the prompts together!!!

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  showProducts();

  //bidAuction();
  });


function showProducts(answer) {
      var query = "SELECT item_id,product_name,price FROM products";
      connection.query(query,  function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "ID: " +
              res[i].item_id +
              " || Product: " +
              res[i].product_name +
              " || Price: " +
              res[i].price 
             
          );
        }
          pickProduct();
        })//.then(function(answer){
       //  pickProduct()}); 
       //.then(pickProduct());


   };
  //               var selected;

   function pickProduct(answer) {
      inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to purchase"
      }
      ]).then(function(answer) {
          
          connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",
            {item_id: answer.item},  function(err, res) {
              //console.log(res);
              //console.log(err);
              // var id = res[0].item_id;
              // var product = res[0].product_name;
              // var price = parseInt(res[0].price);
              // var quantity = parseInt(res[0].stock_quantity);

             // console.log("what's this?" + answer.item);
              console.log(
                "ID: " +
                  res[0].item_id +
                  " || Product: " +
                  res[0].product_name +
                  " || Price: " +
                  res[0].price 
              );

              //return parseInt(answer);
             

              //return res;

            })
            

            return answer;


            }).then(function(answer){

                //console.log("here" + res[0]);
                //console.log("previous" + res[0].item_id)
                //var id = answer;
                //console.log("need this" + answer.item);
               // console.log("price" + res[0].price);
                inquirer.prompt([
                  {
                  name: "count",
                  type: "input",
                  message: "How many would you like to buy?"
                  }
                  ])
                console.log("answer count" + answer.count);
               if (parseInt(answer.count) > answer.stock_quantity) {
                console.log(parseInt(answer.stock_quantity));
                console.log("sorry, there are only" + answer.stock_quantity + "left");
               // pickProduct();

              }

              else {
                console.log(parseInt(answer.price) * parseInt(answer.count));
                //take answer
              }
              })
    
            };


          
      
















  

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT item_id,product_name,price FROM products", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer.prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_id + results[i].product_name + results[i].price);
//             }
//             return choiceArray;
//           },
//           message: "What product would you like to purchase?"
//         },
//        ]); 
//   });
// }    
