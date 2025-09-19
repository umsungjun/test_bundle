const path = require("path");

module.exports = {
  entry: "./main.js", // 어떤 파일을 진입점으로 번들링할지
  mode: "development", // 개발용 모드로 설정 (배포용은 'production')
  output: {
    filename: "bundle.js", // 번들로 만들어질 파일 이름
    path: path.resolve(__dirname, "dist") // 번들 파일이 어디에 저장될지
  }
};