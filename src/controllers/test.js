module.exports = async (req, res) => {
  console.log('Test route!');

  res.json({
    text: 'Hello World!',
    id: 'sss',
  })
};
