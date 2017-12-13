//Thursday phone
var mysql = require("mysql");
var inquirer = require("inquirer");

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
  });


function showProducts(answer) {
      var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
      connection.query(query,  function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "ID: " +
              res[i].item_id +
              " || Product: " +
              res[i].product_name +
              " || Price: " +
              res[i].price +   
              " || Quantity Available: " +
              res[i].stock_quantity
          );
        }
       
      })

        pickProduct();
};

function pickProduct(answer) {
    inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to purchase"
      },
      {
        name: "count",
        type: "input",
        message: "How many would you like to buy?"
      }

      ]).then(function(answer) {
          connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",
            {item_id: answer.item},  function(err, res) {

              console.log("count " + answer.count);

              if (parseInt(answer.count) > res[0].stock_quantity) {
                //console.log(parseInt(answer.stock_quantity));
                console.log("sorry, there are only " + res[0].stock_quantity + " left");
                pickProduct();

              }

              else {
                console.log("Your purchase of " + answer.count + ' ' + res[0].product_name +"/s total cost is: $ " + parseInt(res[0].price) * parseInt(answer.count));
               var quantityLeft = res[0].stock_quantity - answer.count;
                      console.log(quantityLeft);
                      connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: quantityLeft
                          },
                          {
                            item_id: answer.item
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                          console.log("Inventory updated. There are  " + quantityLeft + " left");
                          pickProduct();
                        });
               }
                          //return answer;  

            })
      });
      // return answer;
  //    howMany();
};      

//

              
                


