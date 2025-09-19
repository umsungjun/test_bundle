import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './main.tsx', // 어떤 파일을 진입점으로 번들링할지
  mode: 'development', // 소스맵 포함, 최소한의 코드 압축(공백 제거, 변수명 단순화 등)
  output: {
    filename: 'bundle.js', // 번들로 만들어질 파일 이름
    path: path.resolve(__dirname, 'dist'), // 번들 파일이 어디에 저장될지
  },
  module:{
    rules:[
      {
        test: /\.(ts|tsx)$/, // .ts 확장자를 가진 파일들을
        use: [
            {
              loader:"babel-loader",
              options:{
                presets:[
                  "@babel/preset-env", // 최신 자바스크립트 문법을 구버전 브라우저에서도 동작할 수 있게 변환
                  "@babel/preset-typescript", // TypeScript를 자바스크립트로 변환
                  "@babel/preset-react" // React JSX 문법을 자바스크립트로 변환
                ],
              }
            },
        ],
        exclude: /node_modules/ // node_modules 폴더는 제외
      },
      {
        test: /\.css$/,
        // 로더는 배열의 뒤에서부터 앞으로 순서대로 실행돼요. 즉, css-loader가 먼저 실행되고, 그 다음 style-loader가 실행되는 거예요.
          use: [
            'style-loader', // 자바스크립트로 불러온 CSS를 <style> 태그로 만들어서 DOM에 주입
            'css-loader' // 자바스크립트에서 CSS 파일을 불러올 수 있게 해줌
          ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 확장자
        type: "asset" // Asset Modules 사용
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 확장자
        type: "asset/resource", // 폰트는 항상 별도 파일로 내보내요
        generator: {
          filename: "assets/[name][ext]" // 원하는 폴더와 이름 형태로 설정
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // .ts와 .js 확장자를 가진 파일들을 모듈로 인식
  },
};