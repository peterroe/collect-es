'use strict';

module.exports = (it, expect, collect) => {
  it('should search the collection for the given value and returns its key if found', () => {
    const collection = collect([2, 4, 6, 8]);
    expect(collection.search(4)).to.eql(1);
  });

  it('should return false if no items were found in array', () => {
    expect(collect([1, 2, 3]).search(5)).to.eql(false);
  });

  it('should return false if no items were found in array of objects', () => {
    const collection = collect([
      { id: 1, name: 'Test' },
      { id: 2, name: 'Test2' },
    ]);

    expect(collection.search(item => item.id > 2)).to.eql(false);
  });

  it('should return false if no items were found in objec', () => {
    const collection = collect({
      name: 'Sadio Mané',
      number: 19,
      club: 'Liverpool FC',
    });

    expect(collection.search('Roberto Firmino')).to.eql(false);
  });

  it('should search using a "loose" comparison', () => {
    const collection = collect([2, 4, '4', 6, 8]);
    expect(collection.search('4')).to.eql(1);
  });

  it('should search using a "strict" comparison when passing true as the second argument', () => {
    const collection = collect([2, 4, '4', 6, 8]);
    expect(collection.search('4', true)).to.eql(2);
  });

  it('should return false if the key is not found', () => {
    const collection = collect([2, 4, 6, 8]);
    const result = collection.search('4', true);

    expect(result).to.eql(false);
  });

  it('should work when collection is based on an object', () => {
    const collection = collect({
      name: 'Sadio Mané',
      number: 19,
      club: 'Liverpool FC',
    });

    expect(collection.search('Sadio Mané')).to.eql('name');
    expect(collection.search('Sadio Mane')).to.eql(false);

    expect(collection.search(19)).to.eql('number');
    expect(collection.search('19')).to.eql('number');
    expect(collection.search('19', true)).to.eql(false);

    expect(collection.search(item => item === 19)).to.eql('number');
  });

  it('should accept a custom callback and return the first value that passes', () => {
    const collection = collect([2, 4, 6, 8]);

    expect(collection.search(item => item > 5)).to.eql(2);
    expect(collection.all()).to.eql([2, 4, 6, 8]);
  });

  it('should find the index in an array of objects', () => {
    const collection = collect([
      { id: 1, name: 'Test' },
      { id: 2, name: 'Test2' },
    ]);

    expect(collection.search(item => item.id > 1)).to.eql(1);
  });
};
