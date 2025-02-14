import React from 'react'
import ProductCard from '../components/ProductCard'

const AllProductsPage = () => {
   const data = [
        {
          "_id":"67b123c7dc0c1cac9a7c8a01" ,
          "productName": "Wooden Chair",
          "description": "Elegant wooden chair with cushioned seat, perfect for home and office.",
          "category": "Furniture",
          "price": 1200,
          "isActive": true,
          "isRented": false,
          "reviewId": [],
          "productImage": [
            "https://m.media-amazon.com/images/I/71q2gVy8zEL.jpg",
            "https://m.media-amazon.com/images/I/71q2gVy8zEL.jpg"
          ],
          "userId": { "$oid": "67b1237a2c9df6b02507d01" },
          "createdAt": { "$date": "2025-02-14T09:30:00.000Z" },
          "updatedAt": { "$date": "2025-02-14T09:30:00.000Z" },
          "__v": 0
        },
        {
          "_id": { "$oid": "67b124d7dc0c1cac9a7c8b02" },
          "productName": "LED Desk Lamp",
          "description": "Energy-efficient LED lamp with adjustable brightness settings.",
          "category": "Electronics",
          "price": 800,
          "isActive": true,
          "isRented": false,
          "reviewId": [],
          "productImage": [
            "https://m.media-amazon.com/images/I/61x2F2cCebL.jpg",
            "https://m.media-amazon.com/images/I/61x2F2cCebL.jpg"
          ],
          "userId": { "$oid": "67b124e27a2c9df6b02507d2" },
          "createdAt": { "$date": "2025-02-14T10:15:00.000Z" },
          "updatedAt": { "$date": "2025-02-14T10:15:00.000Z" },
          "__v": 0
        },
        {
          "_id": { "$oid": "67b125f7dc0c1cac9a7c8c03" },
          "productName": "Bluetooth Speaker",
          "description": "Portable Bluetooth speaker with high bass and 10-hour battery life.",
          "category": "Electronics",
          "price": 1500,
          "isActive": true,
          "isRented": false,
          "reviewId": [],
          "productImage": [
            "https://m.media-amazon.com/images/I/81q5iFfDhoL.jpg",
            "https://m.media-amazon.com/images/I/81q5iFfDhoL.jpg"
          ],
          "userId": { "$oid": "67b126027a2c9df6b02507d3" },
          "createdAt": { "$date": "2025-02-14T11:00:00.000Z" },
          "updatedAt": { "$date": "2025-02-14T11:00:00.000Z" },
          "__v": 0
        },
        {
          "_id": { "$oid": "67b12708dc0c1cac9a7c8d04" },
          "productName": "Digital Alarm Clock",
          "description": "Compact digital alarm clock with LED display and snooze function.",
          "category": "Electronics",
          "price": 500,
          "isActive": true,
          "isRented": false,
          "reviewId": [],
          "productImage": [
            "https://m.media-amazon.com/images/I/71zRxxcwDUL.jpg"
          ],
          "userId": { "$oid": "67b127107a2c9df6b02507d4" },
          "createdAt": { "$date": "2025-02-14T11:45:00.000Z" },
          "updatedAt": { "$date": "2025-02-14T11:45:00.000Z" },
          "__v": 0
        },
        {
          "_id": { "$oid": "67b12819dc0c1cac9a7c8e05" },
          "productName": "Yoga Mat",
          "description": "Non-slip yoga mat with extra cushioning for comfort and support.",
          "category": "Fitness",
          "price": 700,
          "isActive": true,
          "isRented": false,
          "reviewId": [],
          "productImage": [
            "https://m.media-amazon.com/images/I/81oHc+7+PbL.jpg"
          ],
          "userId": { "$oid": "67b128227a2c9df6b02507d5" },
          "createdAt": { "$date": "2025-02-14T12:30:00.000Z" },
          "updatedAt": { "$date": "2025-02-14T12:30:00.000Z" },
          "__v": 0
        }
      ]
      
  return (
    <div className='card-container'>
    {data.map((products)=> <ProductCard props={products} key={products._id}/>)}
    </div>
  )
}

export default AllProductsPage