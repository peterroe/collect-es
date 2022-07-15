'use strict';

const products = [
  { name: 'Chair', price: 600 },
  { name: 'Desk', price: 900 },
  { name: 'Lamp', price: 150 },
];

module.exports = (it, expect, collect) => {
  it('should return the average value of collection values', () => {
    expect(collect([1, 3, 3, 7]).average()).to.eql(3.5);
  });

  it('should accept a callback function', () => {
    const avg = collect(products).average(product => product.price);
    expect(avg).to.eql(550);
  });

  it('should return the average value of collection values by key', () => {
    const collection = collect(products);
    const avg = collection.average('price');
    expect(avg).to.eql(550);
    expect(collection.all()).to.eql(products);
  });
};
