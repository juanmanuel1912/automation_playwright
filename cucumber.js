module.exports = {
  default: {
    paths: ['./src/features/*.feature'],
    require: ['./src/step-definitions/*.js'],
    format: ['progress'],
    publishQuiet: true
  }
}