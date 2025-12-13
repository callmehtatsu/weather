# Pleasant weather

## Yêu cầu

- Node.js >= 18.x
- npm >= 9.x

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd pleasant-weather
```

2. Cài đặt tất cả dependencies:
```bash
npm install
```

Lệnh này sẽ tự động cài đặt tất cả các packages cần thiết từ `package.json`:
- React và React DOM
- Mapbox GL và React Map GL
- Axios
- Lucide React (icons)
- React Frappe Charts
- Deck.gl (cho heatmap)
- Vite và các plugins
- Tailwind CSS
- Và tất cả dependencies khác

3. Tạo file `.env` từ template:
```bash
cp .env.example .env
```

4. Cấu hình biến môi trường trong file `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

**Lưu ý:** 
- Thay `your_mapbox_token_here` bằng Mapbox token thực tế của bạn
- Đảm bảo backend API đang chạy ở địa chỉ trong `VITE_API_BASE_URL`

## Chạy ứng dụng

### Development mode:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Development mode với host (để test trên mobile):
```bash
npm run dev:host
```

### Build production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

## Dependencies chính

### Production:
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-map-gl` ^7.1.9
- `mapbox-gl` ^3.17.0
- `axios` ^1.6.0
- `lucide-react` ^0.263.1
- `react-frappe-charts` ^4.1.0
- `frappe-charts` ^1.6.2
- `@deck.gl/core` ^9.2.4
- `@deck.gl/react` ^9.2.4
- `@deck.gl/aggregation-layers` ^9.2.4
- `@maptiler/sdk` ^3.9.0
- `color-interpolate` ^2.0.0
- `interpolateheatmaplayer` ^1.6.2

### Development:
- `vite` ^7.2.7
- `@vitejs/plugin-react` ^4.3.1
- `tailwindcss` ^3.4.17
- `postcss` ^8.4.49
- `autoprefixer` ^10.4.20
- `vite-plugin-pwa` ^1.2.0
- `vite-plugin-svgr` ^4.5.0
- `@types/react` ^18.3.3
- `@types/react-dom` ^18.3.0

## Cấu trúc thư mục

```
src/
├── components/       # React components
├── hooks/           # Custom hooks
├── utils/           # Utility functions
├── styles/          # CSS files
├── constants/        # Constants và config
└── App.jsx          # Root component
```

## Tính năng

- Xem thời tiết hiện tại và dự báo
- Dự báo theo giờ (8 giờ)
- Dự báo theo ngày (10 ngày)
- Bản đồ thời tiết tương tác
- Heatmap nhiệt độ
- Dark mode / Light mode
- GPS location
- Tìm kiếm thành phố
- Pull to refresh
- Responsive design

## Tối ưu hóa

- Adaptive polling: Tự động điều chỉnh tần suất cập nhật dựa trên user activity và network type
- Network-aware: Nhận biết WiFi/4G/3G và Data Saver mode
- Cache mechanism: Giảm số lượng API calls
- Memory optimization: Tự động cleanup cache cũ

## Deploy

Khi deploy lên các platform như Vercel, Netlify, hoặc các hosting khác, cần set environment variables trong dashboard của platform:

### Vercel:
1. Vào Project Settings → Environment Variables
2. Thêm các biến:
   - `VITE_API_BASE_URL`: URL của backend API
   - `VITE_MAPBOX_TOKEN`: Mapbox token của bạn

### Netlify:
1. Vào Site settings → Environment variables
2. Thêm các biến tương tự

### Lưu ý:
- Keys free có thể commit vào repo nếu muốn (tùy chọn)
- Khi deploy, **bắt buộc** phải set environment variables trong dashboard của platform
- Vite chỉ inject env vars có prefix `VITE_` vào client-side code
- Sau khi set env vars, cần rebuild lại app

## Lưu ý khác

- Cần backend API chạy ở `VITE_API_BASE_URL`
- Cần Mapbox token để sử dụng bản đồ
- Audio file `background.mp3` cần có trong `public/assets/audio/`
