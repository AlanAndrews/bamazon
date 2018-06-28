var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,
      
    user: "root",
  
    password: "root",
    database: "bamazon"
  });


  connection.connect(function(err) {
    if (err) throw err;
    // readProducts();
    inventory();
  });

  function inventory() {
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;

      console.log("");
      console.log("");
      console.log("");
      console.log("");
      for(i=0;i<res.length;i++){
        console.log('product ID:' + res[i].id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price)
      }
      console.log("");
      console.log("");
      console.log("");
      
    });
    start();
  };

  function start() {
    
        inquirer
            .prompt([
              {
                name: "id",  
                type: "input",
                message: "Type in the ID of the product you want to buy?"},
               
                {name: "quantity",
                type: "input",
                message: "How many would you like to buy? "}
            ]
              )
            .then(function(answer) {
              connection.query("SELECT * FROM products WHERE id = ?", [answer.id], function(err, results) {
                if (err) throw err;
                if (answer.quantity > results[0].stock_quantity) {
                  console.log("Not enough of the selected item in stock");
                  console.log("Please place a new order");
                  start();
                }else{
                var new_quantity = results[0].stock_quantity - answer.quantity;
                // console.log(new_quantity);
                connection.query("UPDATE products SET ? WHERE ?",
                [{stock_quantity: new_quantity},
                  {id: answer.id}
                ], function(err, results) {
                if (err) throw err;
                console.log("your order has been processed");
                // getPrice();
                
              });

              connection.query("SELECT * FROM products WHERE id = ?", [answer.id], function(err, results) {
                if (err) throw err;
              console.log("your total is " + answer.quantity*results[0].stock_quantity)
                            start();

              });
                // console.log(results[0].product_name);
              // var selectID; 
              // console.log("hi");
              // console.log(results.product_name);
              
              // if (results.id === answer.id) {
                  // selectID = results;

              // searchProducts()
            // }
            // else{
            //   console.log("hello world");
            // }

        // var query = "SELECT id FROM prodcuts WHERE ?";
        // console.log(answer.id);
        // console.log(answer.quantity);
        // connection.query(query, { id: answer.id }, function(err, res) {
            // for (var i = 0; i < res.length; i++) {
            //  }
            // console.log(res);
            // function readProducts() {

              // console.log("Selecting all products...\n");
              // }
          // };
        // switch (answer.action) {
        // case "id":
        //   readProducts();
        //   break;
        
      };
    });
  });
};
  // };
    
    // function searchProducts(){
    //  connection.query("SELECT * FROM products", function(err, res) {
    //   if (err) throw err;
    //   // Log all results of the SELECT statement
    //   console.log(res);
    //   connection.end();
    // });
    // };

    //  // function readProducts() {

    //           // console.log("Selecting all products...\n");
              
    //           connection.query("SELECT * FROM products", function(err, res) {
    //             if (err) throw err;
    //             // Log all results of the SELECT statement
    //             console.log(res);
    //             connection.end();
    //           });
    //         // }

// function getPrice() {
 
// }
