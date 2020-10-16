module.exports = async (req, res, next) => {
  try {
    throw new Error('some error sssssssssssssssssssssssssssssss');

    res.json({
      text: 'Hello World!',
      id: Math.random() * 1000,
    })
  } catch (error) {
    next(error)
  }
};
