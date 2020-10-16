module.exports = async (req, res, next) => {
  try {
    res.json({
      text: 'Hello World!',
      id: Math.random() * 1000,
    })
  } catch (error) {
    next(error)
  }
};
