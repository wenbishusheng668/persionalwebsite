# 赵家宝个人网站

这是一个轻量静态个人主页，适合直接部署到宝塔面板的网站根目录。

## 文件

- `index.html`：页面结构与中文内容
- `styles.css`：响应式样式
- `script.js`：年份等轻量脚本
- `assets/profile-mark.svg`：首页视觉图

## 本地预览

直接双击 `index.html` 即可预览。

也可以在当前目录启动一个静态服务：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 宝塔部署

当前已经部署到：

```text
http://47.109.134.127/
```

在宝塔面板中新建网站后，把这些文件上传到网站根目录，通常类似：

```text
/www/wwwroot/你的域名/
```

需要上传：

```text
index.html
styles.css
script.js
assets/
```

如果还没有域名，也可以先用服务器 IP 访问，但建议后续绑定域名并开启 HTTPS。

当前服务器使用的是：

```text
/www/wwwroot/default/
```

服务器已安装并启动 Nginx，80 端口指向这个目录。
