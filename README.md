# @Chris-C-Brine/vite-version-update-helper

[![npm version](https://img.shields.io/npm/v/@chris-c-brine/vite-version-update-helper.svg)](https://www.npmjs.com/package/@chris-c-brine/mrt-csv-export)
[![License: AAL](https://img.shields.io/badge/License-AAL-blue.svg)](https://github.com/Chris-C-Brine/vite-version-update-helper/blob/main/LICENSE)


## Usage
1. Add this package to your project
2. Add ViteChunkErrorHandler to your root component
3. Check your index.html headers
4. Check your server config (nginx provided)

### For Nginx (nginx.conf):
```editorconfig
    location / {
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        try_files $uri $uri/ /index.html;
    }
```
OR ALT:
```editorconfig
server {
     listen 80;
     server_name yourdomain.com ;
     root /var/www/your-vite-app/dist ; # Path to your Vite build folder
     index index.html ;

     # 1. Force index.html to always revalidate (NEVER CACHE)
     location / {
        try_files $uri $uri/ /index.html;
        
        # Kill caching for the main HTML entryway
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        expires off;
    }

    # 2. Cache Vite's hashed assets aggressively (1 year)
    location ~* \.(js|mjs|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # 3. Cache static media assets decently long
    location ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }
}
```

### For <head> (index.html):
```html
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    ...
</head>
```


### Example
```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViteVersionErrorHandler>
      <App/>
    </ViteVersionErrorHandler>
  </StrictMode>,
)
```

Note: Wrap <App/> inside ErrorBoundary

[AAL](./dist/LICENSE) © Christopher C. Brine