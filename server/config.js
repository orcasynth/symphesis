module.exports.DATABASE_URL= process.env.DATABASE_URL || global.DATABASE_URL || 
`mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ds119788.mlab.com:19788/orcasynth` || `mongodb://localhost/orcasynth`;

module.exports.PORT= process.env.PORT || 3001 
