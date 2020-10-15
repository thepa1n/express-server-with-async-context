module.exports = (req, res) => {

  // throw new Error('some error sssssssssssssssssssssssssssssss')
  res.json({
    text: 'Hello World!',
    id: Math.random()*1000,
  })

// console.log('***********res***********', res.__morgan_body_response);
};
