const { db } = require("./models/users")

db.products.aggregate([
    {
        $match:{price : {$gt : 900}}
    },
    {
        $group:{_id:"$company",totalProducts:{$sum:"$price"}}
    }
])

db.sales.aggregate([
    {
        $group:{_id:"$quantity",average:{$sum:"$price"}}
    }
])

db.products.aggregate([
    {
        $project:{
          name:1,
          price:1,
          discountedPrice : {$multiply : ["$price",0.8]}
        }
    }
])

db.products.aggregate([
    {
        $unwind : "$colors"
    },
    {
        $match : {price : {$gt : 1200}}
    },
    {
        $group: {
            _id:"$price",
            allColors:{$addToSet:"$colors"}
        }
    }
])