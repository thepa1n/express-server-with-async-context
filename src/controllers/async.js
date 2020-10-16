module.exports = async (req, res) => {
  console.log('Test Async route!');

  setTimeout(() => {
    res.json({
      text: 'Hello World!',
      id: 'sss',
    })
  }, 2000)
};
