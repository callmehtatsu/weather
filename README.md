# pleasant weather

ung dung du bao thoi tiet voi ban do nhiet do va nhieu tinh nang khac

## link truy cap

web app: https://pleasant-weather.vercel.app/

android apk: chua co link tai ve, can build tu android studio

backend api: https://weather-backend-vo7o.onrender.com/api

## yeu cau

nodejs >= 18.x
npm >= 9.x

## cai dat local

clone repository:
```
git clone <repository-url>
cd pleasant-weather
```

cai dat dependencies:
```
npm install
```

tao file .env:
```
VITE_MAPBOX_TOKEN=pk.eyJ1IjoiY2FsbG1laHRhdHN1IiwiYSI6ImNtaGJuZzB6ZTEwNTQyanByanowcG03NWoifQ.oIOUVP_YKThg5ZioHmxDsA
VITE_API_BASE_URL=https://weather-backend-vo7o.onrender.com/api
VITE_OPENWEATHER_API_KEY=4b33ee217ef5db8167e146b77f25d2b9
```

chay development:
```
npm run dev
```

build production:
```
npm run build
```

## deploy backend len render

dang ky tai khoan render tai https://render.com

vao dashboard render, chon new web service

ket noi voi github repository cua backend

cau hinh nhu sau:
- name: weather-backend (hoac ten khac tuy ban)
- environment: node
- build command: khong can (hoac de trong)
- start command: npm start
- plan: free

them environment variables:
- PORT: 5000 (hoac de mac dinh)
- FRONTEND_URL: https://pleasant-weather.vercel.app
- OPENWEATHER_API_KEY: 4b33ee217ef5db8167e146b77f25d2b9
- CACHE_TTL: 300 (tu chon, don vi la giay)
- NODE_ENV: production

luu y: render free tier se sleep sau 15 phut khong co request, can dung cloudflare worker de ping lien tuc

## deploy frontend len vercel

dang ky tai khoan vercel tai https://vercel.com

cai dat vercel cli:
```
npm i -g vercel
```

hoac dung github integration:
- vao vercel dashboard
- chon add new project
- ket noi github repository
- chon repository pleasant-weather

cau hinh environment variables trong vercel dashboard:
- vao project settings
- chon environment variables
- them cac bien sau:
  - VITE_MAPBOX_TOKEN: pk.eyJ1IjoiY2FsbG1laHRhdHN1IiwiYSI6ImNtaGJuZzB6ZTEwNTQyanByanowcG03NWoifQ.oIOUVP_YKThg5ZioHmxDsA
  - VITE_API_BASE_URL: https://weather-backend-vo7o.onrender.com/api
  - VITE_OPENWEATHER_API_KEY: 4b33ee217ef5db8167e146b77f25d2b9

build settings:
- framework preset: vite
- build command: npm run build
- output directory: dist
- install command: npm install

sau khi set env vars, vercel se tu dong build va deploy

## setup cloudflare worker chong sleep render

dang ky tai khoan cloudflare tai https://cloudflare.com

vao dashboard cloudflare, chon workers and pages

chon create application, roi create worker

dat ten worker: wake-up-render (hoac ten khac)

xoa code mac dinh, dan code sau:
```
export default {
  async scheduled(event, env, ctx) {
    const url = "https://weather-backend-vo7o.onrender.com/health";
    console.log(`Pinging: ${url}`);
    ctx.waitUntil(
      fetch(url).then(async (resp) => {
        console.log(`Status: ${resp.status}`);
      }).catch(err => {
        console.error(`Error: ${err}`);
      })
    );
  },
  async fetch(request, env, ctx) {
    return new Response("I am the waker! I keep Render alive.");
  }
};
```

save and deploy

vao settings cua worker, chon triggers

chon add cron trigger

nhap cron syntax: */10 * * * *

nghia la chay moi 10 phut mot lan

add trigger

ket qua: cu 10 phut cloudflare se tu dong ping render backend, render se khong bao gio sleep

chi phi: cloudflare free tier cho 100000 requests/ngay, ping 10 phut/lan thi 1 ngay chi mat khoang 144 requests, dung ca doi khong het

## build android apk

cai dat android studio tai https://developer.android.com/studio

mo android studio, chon open project

chon folder android trong project pleasant-weather

cho gradle sync hoan thanh

vao build menu, chon build bundle(s) / apk(s), roi chon build apk(s)

cho build xong, apk se nam o: android/app/build/outputs/apk/debug/app-debug.apk

de build release apk can tao keystore va cau hinh trong build.gradle, nhung build debug apk la du de test

## cau truc project

src/
- components/ cac react components
- hooks/ custom hooks
- utils/ utility functions
- styles/ css files
- constants/ constants va config
- App.jsx root component

## tinh nang

xem thoi tiet hien tai va du bao
du bao theo gio 8 gio
du bao theo ngay 16 ngay
ban do thoi tiet tuong tac
heatmap nhiet do
dark mode light mode
gps location
tim kiem thanh pho
pull to refresh
responsive design

## dependencies chinh

react ^18.3.1
react-dom ^18.3.1
react-map-gl ^7.1.9
mapbox-gl ^3.17.0
axios ^1.6.0
lucide-react ^0.263.1
react-frappe-charts ^4.1.0
interpolateheatmaplayer ^1.6.2
vite ^7.2.7
tailwindcss ^3.4.17

## luu y

can backend api chay o VITE_API_BASE_URL
can mapbox token de su dung ban do
audio file background.mp3 can co trong public/assets/audio/
khi deploy len vercel, bat buoc phai set environment variables trong dashboard
vite chi inject env vars co prefix VITE_ vao client-side code
sau khi set env vars, can rebuild lai app
