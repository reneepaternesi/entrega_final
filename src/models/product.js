export class Product {

  constructor (params) {
      const {
        id,
        name,
        price,
        img,
        description,
    stock
    } = params
    this.id = id
    this.name = name
    this.price = price
    this.img = `./assets/${img}`
    this.description = description
    this.stock = stock
    this.quatity=0
  }
}