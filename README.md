# Ecommerce API
برای راه اندازی یک فروشگاه آنلاین با Nodejs میتوانید از اسکریپت Ecommerce API استفاده کنید. اسکریپت Ecommerce API با زبان Typescript نوشته شده است و در آن از زبانها و ابزارهای Node.js – Mongodb – Mongoose – Express.js و … استفاده شده است.

## ویژگی‌های Ecommerce API
اسکریپت Ecommerce API دارای اکثر ویژگی‌های یک سایت فروشگاهی کامل می‌باشد که در ادمه به شرح برخی از این ویژگی‌ها می پردازم:

### سیستم احراز هویت
در سیستم احراز هویت ایکامرس ای پی آی، از ابزار JsonWebToken برای ایجاد توکن تایید هویت استفاده شده است. این سیستم به صورت Role Based تنظیم شده و دارای چهار سطح دسترسی میباشد:
1. **ریشه: (Root)** این سطح دسترسی مدیر اصلی برنامه است و کلیه تنظیمات و قابلیت های سایت را میتواند مدیریت کند.
2. **مدیر: (Admin)** این سطح دسترسی مدیران سایت است که توسط مدیر اصلی (Root) سایت ایجاد شده است و توانایی ایجاد تنظیمات سطح پایین سایت مثل ایجاد حساب کاربری فروشنده (Seller) و … دارا است.
3. **فروشنده: (Seller)** این سطح دسترسی فروشنده سایت است که توانایی بررسی و مدیریت فروشگاه سایت را دارا است. ایجاد و حذف و ویرایش محصول و بارگذاری فایل و … از جمله توانایی سطح دسترسی فروشنده است.
4. **مشتری: (Customer)** این سطح دسترسی مشتریان سایت است که میتوانند در سایت ثبت نام کرده و به محصولات سایت را خریداری کنند و یا اطلاعات حساب کاربری خود را بررسی کرده و به سفارشات خود دسترسی داشته باشند. (به صورت پیشفرض کاربرانی که در سایت ثبت نام میکنند در این سطح دسترسی قرار میگیرند)

ویژگی های سیستم احراز هویت ایکامرس ای پی آی:

### ورود و ثبت نام
- ثبت نام با ایمیل و شماره موبایل (بدون ارسال کد)
- ورود با ایمیل و شماره موبایل
- خروج از حساب کاربری
- خروج از همه دستگاه ها
- نمایش پروفایل کاربری
- بروز رسانی حساب کاربری
- فراموشی رمز عبور (ارسال ایمیل)
- بازیابی رمز عبور
- حذف حساب کاربری

### بخش مدیریت کاربران
- نقش بندی کاربران (ریشه،مدیر،فروشنده،مشتری)
- نمایش فهرست کاربران
- جستجو در کاربران
- ایجاد حساب کاربری
- ویرایش حساب های کاربری
- حذف حساب های کاربری

### مدیریت محصولات
مدیران و فروشندگان سایت میتوانند محصول ایجاد کرده و یا محصولات سایت را ویرایش و حذف کنند. همچنین میتوانند فهرست خرید های آنجام شده در سایت را بررسی کرده و آنها را تایید و رد کنند.
- ایجاد یا افزودن محصول
- بروز رسانی محصولات
- فهرست گرفتن از محصولات
- نمایش جزئیات محصول
- جستجو در محصولات
- حذف محصولات

### مدیریت سبد خرید
مشتریان میتوانند محصولات مورد نظر خود را به سبد خرید اضافه کنند و یا سبد خرید خود را ویرایش و حذف کنند.
- افزودن به سبد خرید
- اهده سبد خرید
- وز رسانی سبد خرید
- حذف سبد خرید

### پرداخت آنلاین
پس از افزودن محصول به سبد خرید توانایی پرداخت آنلاین فعال شده و با پرداخت و تایید تراکنش، خرید انجام شده و سبد خرید کاربر به فهرست سفارشات کاربر منتقل میشود.
- پرداخت با درگاه پرداخت آنلاین
- بررسی پرداخت انجام شده

### مدیریت سفارش‌ها
مشتریان میتوانند فهرست سفارشات خود را دریافت کرده و جزئیات هر سفارش را بررسی کنند. همچنین این فهرست توسط فروشندگان نیز قابل مشاهده است.
- فهرست گرفتن از سفارشات
- نمایش جزئیات سفارش

### دسته بندی محصولات
مدیران سایت میتوانند برای محصولات دسته ایجاد کرده و این دسته ها را ویرایش و حذف کنند. همچنین قابلیت نمایش محصولات بر اساس دسته ها وجود دارد.
- افزودن دسته و زیر دسته
- ویرایش دسته
- فهرست گیری دسته ها
- نمایش محصولات دسته
- حذف دسته ها

### مدیریت برچسب ها
مدیران سایت میتوانند برای محصولات برچسب ایجاد کرده و این برچسب ها را ویرایش و حذف کنند. همچنین قابلیت نمایش محصولات بر اساس برچسب ها وجود دارد.
- فهرست گیری از برچسب ها
- ویرایش برچسب ها
- افزودن برچسب ها
- نمایش محصولات هر برچسب
- حذف برچسب ها

### مدیریت دیدگاه ها و نظرات
کاربران ثبت نام شده و غیر ثبت نام شده میتوانند برای هر محصول دیدگاه ثبت کنند و به محصولات امتیاز دهند. همچنین کاربران ثبت نام شده میتوانند دیدگاه های خود را ویرایش کنند. کلیه دیدگاه ها توسط مدیران سایت باید تایید و یا رد شود.
- ثبت دیدگاه یا نظر روی محصول
- فهرست گیری از نظرات
- نمایش نظرات هر محصول
- ویرایش نظرات
- حذف نظرات

### سیستم مدیریت فایل
فروشندگان و مدیران سایت میتوانند فایلهای خود را آپلود کنند. فایلهای آپلود شده فروشندگان فقط توسط خود آنها قابل ویرایش و حذف شدن است و مدیران سایت میتوانند کلیه فایلها را مدیریت کنند.
- فهرست گیری از فایل‌ها
- مشاهده جزئیات هر فایل
- آپلود کردن فایل (پسوند های مشخص)
- ویرایش فایل‌ها
- حذف فایل های آپلود شده

### علاقه مندی ها
مشتریان سایت میتوانند محصولات مورد علاقه خود را به فهرست علاقه مندی های اضافه کرده و یا آنرا از فهرست خود حذف کنند.
- افزودن به علاقه مندی ها
- حذف از علاقه مندی ها
- نمایش فهرست علاقه مندی ها

### مدیریت مکان ها
مدیران سایت میتوانند در سایت کشور و استان/ایالت و شهر ایجاد کرده و مشخص کنند استان ها و یا شهر ها متعلق به کدام کشور یا استان/ایالت است.
- ایجاد یا افزودن مکان (کشور – استان/ایالت – شهر)
- فهرست گرفتن از مکان ها
- نمایش مکان (مثلا استان و شهر های زیرمجموع)
- ویرایش و بروز رسانی مکان
- حذف مکان ها

### مدیریت آدرس‌ها
مشتریان میتوانند آدرس خود را در پروفایل کاربری خود ثبت و اضافه کنند تا محصول به آدرس مشخص شده در پروفایل کاربر، ارسال شود.
- افزودن یا ایجاد آدرس
- نمایش آدرس
- ویرایش آدرس
- حذف آدرس

## مستندات برنامه

برای اجرا و استفاده از Ecommerce API مستندات مذکور در این بخش را به صورت کامل مطالعه کرده و طبق دستورالعمل پیش روید.

### اجرای برنامه در سیستم شخصی
برای اجرای برنامه در سیستم شخصی باید نرم افزار ها و ماژول های زیر را در سیستم خود نصب داشته باشید و یا آنها را نصب کنید:
```
Node.js ==> https://nodejs.org/en
TypeScript ==> https://www.typescriptlang.org/download
Mongodb ==> https://www.mongodb.com
NPM ==> https://www.npmjs.com/
```
```
bcrypt: 5.1.0
cookie-parser: 1.4.6
cors: 2.8.5
express: 4.18.2
express-fileupload: 1.4.0
jsonwebtoken: 8.5.1
mongoose: .8.0
nodemailer: 6.8.0
dotenv: 16.0.3
```
در صورتیکه برنامه Nodejs را در سیستم خود نصب داشته باشید با اجرای دستور زیر در پوشه پروژه کلیه ماژولهای مورد نیاز به صورت خودکار نصب خواهند شد:
```
npm install
```
برای نصب TypeScript میتوانید از دستور زیر استفاده کنید:
```
npm install typescript
```
### تنظیم متغیر های محیطی

بعد از نصب برنامه ها و ماژول های مورد نیاز یک فایل با نام .env در پوشه اصلی پروژه ایجاد کنید و متغیر های زیر را در آن ایجاد کنید:
```
PORT=8000
# پورت دسترسی به برنامه
DB_URI=mongodb://127.0.0.1:27017/
# آدرس دسترسی به سرور Mongodb میتواند Mongodb Atlas یا Local Database باشد
DB_NAM=ecommerce
# نام پایگاه داده
JWT_SECRET_KEY=7b51677da05da7ebcd4be6499ea87cfe31f5a7af9552ad234e2b52dd934ec
# یک مقدار تصادفی 30 بایتی برای متد ساین JWT

EMAIL_USER=email@example.com
EMAIL_PASS=password
EMAIL_SERV=mail.example.com
# آدرس ایمیل و رمز عبور و میل سرور خود را در این سه فیلد به ترتیب وارد کنید.

ZARIN_PAY_MERCHANT=merchantId
ZARIN_PAY_ADDRESS=https://api.zarinpal.com/pg/v4/payment/request.json
ZARIN_PAY_PGSTART=https://www.zarinpal.com/pg/StartPay/
PAYMENT_CALLBACK_URL=http://localhost:3000/checkout
# در این بخش اطلاعات درگاه پرداخت را باید پر کنید که در حال حاضر فقط درگاه پرداخت زرین پال قابل استفاده است.
```
### اجرای بک اند

بعد از نصب برنامه ها و ماژول های مورد نیاز و تنظیم متغیر های محیطی در فایل .env نوبت به اجرای ایکامرس ای پی آی میرسد. برای این منظور کافیست از دستورات زیر استفاده کنید:

```
tsc -w
npm run dev
```
دستور tsc فایلهای تایپ اسکریپت را به JavaScript تبدیل میکند و آنها را در پوشه dist ذخیره میکند. سپس دستور npm run dev برنامه را در حالت توسعه اجرا میکند.

نکته: برای اجرای برنامه به صورت عادی میتوانید از npm start استفاده کنید.

## نحوه ارسال ریکوست
برای ارسال ریکوست به بک اند به فرمت JSON باید طبق دستورالعمل های زیر اقدام کنید، توجه کنید بجای مقدار {{URL}} باید از آدرس سرور مورد نظر خود استفاده کنید.

### ثبت نام در برنامه

برای ثبت نام در برنامه به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/api/user/signup


| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name* | string | نام و نام خانوادگی کاربر |
| email* | string | آدرس ایمیل کاربر |
| phone | string | شماره موبایل کاربر |
| password* | string | رمز عبور کاربر |
| role | number | غیر قابل انتخاب (پیشفرض مشتری) |

نمونه ریکوست:
``` json
{
    "name": "Mohammad Barghamadi",
    "email": "mohammadbarghamadi@gmail.com",
    "phone": "9304551004",
    "password": "83d43c6e56bb7af02962ce0f"
}
```
مقدار بازگشتی:

اگر فرایند ثبت نام به صورت صحیح و درست انجام شود خروجی مقدار بازگشتی به صورت زیر میباشد:
``` json
{
    "status": 200,
    "data": {
        "name": "Mohammad Barghamadi",
        "email": "mohammadbarghamadi@gmail.com",
        "phone": "9304551004",
        "role": 2000,
        "_id": "63bfba9f3c79dfd0eb8d0dae",
        "createdAt": "2023-01-12T07:45:35.044Z",
        "updatedAt": "2023-01-12T07:45:35.044Z",
        "__v": 0
    },
    "message": "New user created!"
}
```

### ورود به برنامه

برای ورود به برنامه به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/api/user/signin


| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| username | string | آدرس ایمیل یا شماره موبایل کاربر ثبت نام شده |
| password | string | رمز عبور حساب کاربر |


نمونه ریکوست:

``` json
{
    "phone": "9304551004",
    "password": "83d43c6e56bb7af02962ce0f"
}
```

مقدار بازگشتی:

در صورتیکه فرایند ورود به برنامه موفقیت آمیز باشد همراه با پاسخ یک توکن در هدر به سمت کاربر ارسال میشود که نام آن authToken است و برای ارسال ریکویست های بعدی (احراز هویت شده) میتوانید از این توکن استفاده کنید.
``` json
{
    "status": 200,
    "data": {
        "_id": "63bfba9f3c79dfd0eb8d0dae",
        "name": "Mohammad Barghamadi",
        "email": "mohammadbarghamadi@gmail.com",
        "phone": "9304551004",
        "role": 2000,
        "createdAt": "2023-01-12T07:45:35.044Z",
        "updatedAt": "2023-01-12T08:15:44.581Z",
        "__v": 1
    },
    "message": "User signed in."
}
```
در صورت اشتباه بودن نام کاربری یا رمز عبور مقدار بازگشتی به صورت زیر میشود:
``` json
{
    "success": false,
    "error": "Invalid Credentials!"
}
```

### خروج از برنامه

برای خروج از برنامه با متد Post به آدرس زیر ریکوست ارسال کنید، به طور پیشفرض توکن احراز هویت که به صورت HttpOnly در Cookie ذخیره شده به برنامه ارسال می‌شود.

POST: {{URL}}/api/user/signout

نکته: با ارسال این ریکوست توکن از حساب کاربری در پایگاه داده حذف شده و فاقد اعتبار میشود.

مقدار بازگشتی:
``` json
{
    "status": 200,
    "message": "signout with success!"
}
```

### خروج از همه دستگاه ها

برای خروج از همه دستگاه ها بجز دستگاه فعلی که با آن به برنامه وارد شده اید میبایست به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/api/user/signoutall

مقدار بازگشتی:
``` json
{
    "status": 200,
    "message": "Signed out from all devices!"
}
```
### دریافت پروفایل

برای دریافت پروفایل کاربر به آدرس زیر با متد Get ریکوست ارسال کنید.

GET: {{URL}}/api/user/profile

مقدار بازگشتی:
``` json
{
    "status": 200,
    "data": {
        "_id": "63bfba9f3c79dfd0eb8d0dae",
        "name": "Mohammad Barghamadi",
        "email": "mohammadbarghamadi@gmail.com",
        "phone": "9304551004",
        "role": 2000,
        "createdAt": "2023-01-12T07:45:35.044Z",
        "updatedAt": "2023-01-13T04:51:49.026Z",
        "__v": 3
    },
    "message": "User profile"
}
```
### بروز رسانی پروفایل

بای بروز رسانی پروفایل کاربر به آدرس زیر با متد Patch ریکوست ارسال کنید:

PATCH: {{URL}}/api/user/update

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name | string | نام و نام خانوادگی کاربر |
| email | string | آدرس ایمیل کاربر |
| phone | string | شماره موبایل کاربر |
| password | string | رمز عبور کاربر |
| role | number | غیر قابل تغییر (فقط مدیر میتواند تغییر دهد) |

نمونه ریکوست:
``` json
{
    "password": "mynewpassword"
}
```

مقدار بازگشتی:
``` json
{
    "status": 200,
    "data": {
        "_id": "63bfba9f3c79dfd0eb8d0dae",
        "name": "Mohammad Barghamadi",
        "email": "mohammadbarghamadi@gmail.com",
        "phone": "9304551004",
        "role": 2000,
        "createdAt": "2023-01-12T07:45:35.044Z",
        "updatedAt": "2023-01-13T05:24:22.869Z",
        "__v": 3
    },
    "message": "User updated!"
}
```
خطای بازگشتی در صورت ارسال فیلد نامرتبط:
``` json
{
    "success": false,
    "error": "Invalid fields!"
}
```
### فراموشی رمز عبور

در صورت فراموشی رمز عبور به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/api/user/forgot

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| email | string | آدرس ایمیل کاربر |

نمونه ریکوست:
``` json
{
    "email": "mohammadbarghamadi@gmail.com"
}
```
در صورت موفقیت آمیز بودن فرایند یک ایمیل به کاربر ارسال میشود که حاوی لینک بازیابی رمز عبور است. نمونه لینک:

{{URL}}/reset/4447f4ea8917250b4bdf3f3d1946f42f977

با کلیک بر روی لینک بالا کاربر به صفحه ریست پسور در فرانت منتقل میشود و از آن قسمت میبایست مقدار پارامتری که در جلوی reset وجود دارد به همراه رمز عبور تازه به بکاند یا همان برنامه ما ارسال شود.

### بازیابی رمز عبور

برای بازیابی رمز عبور ریکوست خود را به آدرس زیر با متد Post ارسال کنید.

POST: {{URL}}/api/user/reset/4447f4ea8917250b4bdf3f3d1946f42f977

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| password | string | رمز عبور جدید کاربر را وارد کنید |

نمونه ریکوست:
``` json
{
    "password": "mynewpass"
}
```

نکته: برای منقضی نشدن توکن حداکثر 10 دقیقه زمان برای کلیک بر روی لینک بازیابی رمز عبور و ارسال رمز عبور دارید.

مقدار بازگشتی:
``` json
{
    "status": 200,
    "message": "Your password changed!"
}
```
مقدار بازگشتی در صورت بروز خطا:
``` json
{
    "success": false,
    "error": "Invalid request!"
}
```

### حذف حساب کاربری

برای حذف حساب کاربری با متد Delete یک ریکوست به آدرس زیر بفرستید:

DELETE: {{URL}}/user/delete

مقدار بازگشتی:
``` json
{
    "status": 200,
    "message": "Your account removed!"
}
```

### فهرست گیری از کاربران

برای فهرست گرفتن کاربران ثبت نام شده باید به آدرس زیر با متد Get ریکوست ارسال کنید:

POST: {{URL}}/user/list

کوئری های قابل استفاده:

| کلید | مقدار | توضیحات |
| :---:  | :---:  |  ---: |
| csort | asc\dsc | مقدار dsc کاربران را بر اساس تاریخ ثبت نام منظم میکند |
| limit | N | عدد مورد نظر برای محدود کردن تعداد دیتاهای بازگشتی |
| skip | N | عدد مورد نظر برای رد شدن از دیتاهای بازگشتی |

نمونه ریکوست:

{{URL}}/user/list?csort=dsc&limit=10&skip=10

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": [
        {
            "_id": "63c235facb76f81556b2df72",
            "name": "Deyl Karnegi",
            "email": "deylkarnegi@gmail.com",
            "phone": "9304551013",
            "role": 2000,
            "createdAt": "2023-01-14T04:56:26.124Z",
            "updatedAt": "2023-01-14T04:56:26.124Z",
            "__v": 0
        },
        {
            "_id": "63c23625cb76f81556b2df74",
            "name": "Esther Hicks",
        },
        {
            "_id": "63c2364bcb76f81556b2df76",
            "name": "Jerry Hicks",
        }
    ]
}
```
### جستجو در کاربران

برای جستجو در بین کاربران به آدرس زیر با متد Get یک ریکوست ارسال کنید:

GET: {{URL}}/user/search


| کلید | مقدار | توضیحات |
| :---:  | :---:  |  ---: |
| keyphrase | string | در جلوی کلیدواژه مقدار مورد نظر خود را جستجو کنید. |
| csort | asc\dsc | مقدار dsc کاربران را بر اساس تاریخ ثبت نام منظم میکند |
| limit | N | عدد مورد نظر برای محدود کردن تعداد دیتاهای بازگشتی |
| skip | N | عدد مورد نظر برای رد شدن از دیتاهای بازگشتی |

نمونه ریکوست:

{{URL}}/user/search?keyphrase=mohammad

مقدار بازگشتی:

``` json
{
    "status": 200,
    "data": [
        {
            "_id": "63c23094cb76f81556b2df3a",
            "name": "Mohammad Barghamadi",
            "email": "mohammadbarghamadi@gmail.com",
            "phone": "9304551004",
            "role": 1100,
            "createdAt": "2023-01-14T04:33:24.124Z",
            "updatedAt": "2023-01-14T04:33:26.712Z",
            "__v": 1
        }
    ]
}
```
نکته: اگر چیزی یافت نشود مقدار دیتا خالی باز میگردد.


ساخت حساب کاربری
برای ساخت حساب کاربری در برنامه به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/user/create


| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name* | string | نام و نام خانوادگی کاربر |
| email* | string | آدرس ایمیل کاربر |
| phone | string | شماره موبایل کاربر |
| password* | string | رمز عبور کاربر |
| role | number | رووت: 1000 ادمین: 1100 فروشنده: 1500 مشتری: 2000 |


نکته: اگر سطح دسترسی شما پایین تر از مدیریت باشد نمی‌توانید به این بخش ریکوست ارسال کنید و همچنین فقط مدیر اصلی (1000) میتواند حساب کاربری مدیر اصلی (1000) را ایجاد کند.

حساب های مدیریت (1100) میتوانند حساب مدیرت و حساب های فروشنده و مشتری را ایجاد و ویرایش کنند.

نمونه ریکوست: 

``` json
{
    "name": "Rhonda Byrne",
    "email": "rhondabyrne@gmail.com",
    "phone": "9304551016",
    "password": "themagicsecret",
    "role": 1500
}
```
نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "name": "Rhonda Byrne",
        "email": "rhondabyrne@gmail.com",
        "phone": "9304551016",
        "role": 1500,
        "_id": "63c24c0f2d0db7ae22d57b89",
        "createdAt": "2023-01-14T06:30:39.910Z",
        "updatedAt": "2023-01-14T06:30:39.910Z",
        "__v": 0
    },
    "message": "New user created!"
}
```
### ویرایش حساب کاربری

برای ویرایش حساب های کاربری با متد Patch به آدرس زیر ریکوست ارسال کنید:

PATCH: {{URL}}/user/edit/userId

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name* | string | نام و نام خانوادگی کاربر |
| email* | string | آدرس ایمیل کاربر |
| phone | string | شماره موبایل کاربر |
| password* | string | رمز عبور کاربر |
| role | number | رووت: 1000 ادمین: 1100 فروشنده: 1500 مشتری: 2000 |

نکته: فرایند تغییر نقش کاربر همانند ایجاد کاربر میباشد. یعنی حساب Root دسترسی کامل در تغییر کاربران دارد و حساب ادمین فقط میتواند سطح خود و فروشنده ها و مشتری ها را تا به سطح ادمین افزایش دهد.
نمونه ریکوست:

PATCH: {{URL}}/user/edit/63c24c0f2d0db7ae22d57b89

``` json
{
    "role": 1100
}
```
مقدار بازگشتی:

``` json
{
    "status": 200,
    "data": {
        "_id": "63c24c0f2d0db7ae22d57b89",
        "name": "Rhonda Byrne",
        "email": "rhondabyrne@gmail.com",
        "phone": "9304551016",
        "role": 1100,
        "createdAt": "2023-01-14T06:30:39.910Z",
        "updatedAt": "2023-01-14T07:41:16.935Z",
        "__v": 0
    },
    "message": "User updated!"
}
```
### حذف حساب کاربری

برای حذف یک حساب کاربری به آدرس زیر با متد Delete ریکوست ارسال کنید:

DELETE: {{URL}}/user/remove/userId

نمونه ریکوست:

{{URL}}/user/remove/63c23409cb76f81556b2df60

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "_id": "63c23409cb76f81556b2df60",
        "name": "Jack Cherry",
        "email": "jackcherry@gmail.com",
        "phone": "9304551005",
        "role": 2000,
        "createdAt": "2023-01-14T04:48:09.351Z",
        "updatedAt": "2023-01-14T04:48:09.351Z",
        "__v": 0
    },
    "message": "User removed!"
}
```

### بارگذاری فایل

برای بارگذاری فایل به آدرس زیر با متد Post ریکوست ارسال کنید.

POST: {{URL}}/file/upload

نمونه پاسخ:
``` json
{
    "status": 200,
    "data": [
        {
            "name": "mbp16-silver-gallery2-202110.jpeg",
            "encoding": "7bit",
            "size": "208874",
            "filepath": "dist/files/images/2023/1/15/1673757892069-157159.jpg",
            "mimetype": "image/jpeg",
            "md5": "84dc87e1cfb4850cb4bddd75a75997f1",
            "userId": "63c23094cb76f81556b2df3a",
            "_id": "63c384c44c7daae474b9b611",
            "__v": 0
        }
    ]
}
```
بارگذاری فایل ها بر اساس تاریخ و نوع فایل میباشد. یعنی اگر فرمت فایل jpg باشد یک پوشه با نام images ایجاد شده و زیر مجموع آن بر اساس تاریخ سال و ماه و روز پوشه ساخته میشود و در نهایت فایل با نام تصادفی و تاریخ همان روز ذخیره میشود. برای مثال:

/files/images/2023/1/15/1673757892069-157159.jpg

به صورت پیشفرض فقط پسوند های jpg,jpeg,png,mpeg با حداکثر حجم 2 مگابایت قابل بارگذاری هستند.
فایل بارگذاری شده متعلق به کاربری میباشد که آنرا بارگذاری کرده است و دیگر کاربران نمیتوانند به آن دسترسی داشته باشند اما مدیران برنامه میتوانند به کلیه فایل های بارگذاری شده دسترسی داشته باشند.

### فهرست گیری از فایلها

برای فهرست گیری از فایل ها به آدرس زیر با متد Get ریکوست ارسال کنید:

GET: {{URL}}/file/list

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": [
        {
            "_id": "63aaa7110c832c33351fb79e",
            "name": "Image16.jpg",
            "encoding": "7bit",
            "size": "652006",
            "filepath": "/dist/files/images/2022/12/27/1672128273496-997340.jpg",
            "mimetype": "image/jpeg",
            "md5": "0a0e1ef9b26931a856852ed90f12aa62",
            "userId": "63aaa69e0c832c33351fb77e",
            "__v": 0
        },
        {
            "_id": "63c388b34c7daae474b9b615",
            "name": "6183d38056d48692be8226c6be39f063.png",
            "encoding": "7bit",
            "size": "1605859",
            "filepath": "/dist/files/images/2023/1/15/1673758899966-6809644.png",
            "mimetype": "image/png",
            "md5": "01f092bd23c85e7b2c9166e3aa807ed5",
            "userId": "63c23094cb76f81556b2df3a",
            "__v": 0
        }
    ],
    "message": "Files retrived."
}
```
### دریافت یک فایل

برای دریافت یک فایل شناسه آنرا با متد Get به آدرس زیر ارسال کنید:

GET: {{URL}}/file/get/fileId

نمونه ریکوست:

{{URL}}/file/get/63aaa7110c832c33351fb79e

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "_id": "63aaa7110c832c33351fb79e",
        "name": "Image16.jpg",
        "encoding": "7bit",
        "size": "652006",
        "filepath": "/dist/files/images/2022/12/27/1672128273496-997340.jpg",
        "mimetype": "image/jpeg",
        "md5": "0a0e1ef9b26931a856852ed90f12aa62",
        "userId": "63aaa69e0c832c33351fb77e",
        "__v": 0
    },
    "message": "File found."
}
```
### بروز رسانی فایل

برای ویرایش نام یا تغییر مالک فایل میتوانید به آدرس زیر با متد Patch ریکوست ارسال کنید:

PATCH: {{URL}}/file/update/fileId

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name | string | نام جدید فایل |
| userId | string | شناسه مالک جدید |

فقط حساب های مدیریت میتوانند مالک یک فایل را تغییر دهند.

نمونه ریکوست:

{{URL}}/file/update/63aaa7110c832c33351fb79e

نمونه پاسخ:
``` json
{
    "status": 200,
    "data": {
        "_id": "63bcf356ce90d6dbda7696b0",
        "name": "Apple Laptop",
        "encoding": "7bit",
        "size": "208874",
        "filepath": "/dist/files/images/2023/1/10/1673327446389-6649813.jpeg",
        "mimetype": "image/jpeg",
        "md5": "84dc87e1cfb4850cb4bddd75a75997f1",
        "userId": "63b51152f7daee2dfbd6d28a",
        "__v": 0
    },
    "message": "File updated."
}
```
### حذف یک فایل

برای حذف یک فایل باید به آدرس زیر با متد Delete ریکوست ارسال کنید:

DELETE: {{URL}}/file/delete/fileId

نمونه ریکوست:

{{URL}}/file/delete/63aaa7110c832c33351fb79d

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "_id": "63bcf356ce90d6dbda7696b0",
        "name": "Apple Laptop",
        "encoding": "7bit",
        "size": "208874",
        "filepath": "/home/mohammad/Practice/MERN/ECommerece/dist/files/images/2023/1/10/1673327446389-6649813.jpeg",
        "mimetype": "image/jpeg",
        "md5": "84dc87e1cfb4850cb4bddd75a75997f1",
        "userId": "63b51152f7daee2dfbd6d28a",
        "__v": 0
    },
    "message": "File deleted!"
}
```

### افزودن دسته

برای افزودن دسته به آدرس زیر با متد Post ریکوست ارسال کنید:

POST: {{URL}}/cate/add

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name* | string | نام دسته |
| url* | string | لینک دسته |
| category | string | شناسه دسته والد |
| meta | meta | شامل: title – description – keyphrase |

نمونه ریکوست:
``` json
{
    "name": "Backend Development",
    "url": "backend-dev",
    "meta": {
        "title": "Backend Archive - Ecommerce-API",
        "description": "If you want to learn Backend you should understand its basic and here you can find much good information.",
        "keyphrase": [
            "backend",
            "backend development",
            "server side"
        ]
    }
}
```
نمونه پاسخ:
``` json
{
    "status": 200,
    "data": {
        "category": {
            "name": "Backend Development",
            "url": "backend-dev",
            "children": [],
            "_id": "63c398914c7daae474b9b637",
            "meta": "63c398914c7daae474b9b638",
            "__v": 0
        },
        "meta": {
            "title": "Backend Archive - Ecommerce-API",
            "description": "If you want to learn Backend you should understand its basic and here you can find much good information.",
            "keyphrase": [
                "backend",
                "backend development",
                "server side"
            ],
            "link": "63c398914c7daae474b9b637",
            "_id": "63c398914c7daae474b9b638",
            "__v": 0
        }
    },
    "message": "New category added!"
}
```
### فهرست گیری از دسته ها


برای فهرست گرفتن از دسته ها به آدرس زیر با متد Get ریکوست ارسال کنید:

GET: {{URL}}/cate/list

نمونه پاسخ:
``` json
{
    "status": 200,
    "message": "Category found",
    "data": [
        {
            "_id": "63b12f67ff0cf3e6dcfd1d79",
            "name": "Frontend Dev",
            "url": "frontend",
            "children": [
                "63ba7b18af12483d41a1e454"
            ],
            "__v": 0,
            "meta": "63bbaa15e2459b34c12fa2b0"
        },
        {
            "_id": "63ba7b18af12483d41a1e454",
            "name": "Javascript",
            "url": "javascript",
            "children": [],
            "meta": "63ba7b18af12483d41a1e455",
            "__v": 0,
            "category": "63b12f67ff0cf3e6dcfd1d79"
        },
        {
            "_id": "63c398914c7daae474b9b637",
            "name": "Backend Development",
            "url": "backend-dev",
            "children": [],
            "meta": "63c398914c7daae474b9b638",
            "__v": 0
        }
    ]
}
```
### نمایش محتوای یک دسته

برای دیدن محتوای یک دسته و محصولات زیر مجموع آن به آدرس زیر با متد Get ریکوست ارسال کنید:

GET: {{URL}}/cate/get/categoryId

نمونه ریکوست:

{{URL}}/cate/get/63b12f67ff0cf3e6dcfd1d79

نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "category": {
            "_id": "63b12f67ff0cf3e6dcfd1d79",
            "name": "Frontend Dev",
            "url": "frontend",
            "children": [
                "63ba7b18af12483d41a1e454"
            ],
            "__v": 0,
            "meta": {
                "_id": "63bbaa15e2459b34c12fa2b0",
                "title": "Frontend development - Ecommerce API",
                "description": "Do you want to become a frontend development? here is the best resources you can use on you path."
            }
        },
        "products": [
            {
                "images": {
                    "main": null
                },
                "_id": "63bcf64ece90d6dbda7696c4",
                "title": "HTML & CSS Elementry",
                "price": 124000,
                "url": "html-css-guide"
            }
        ]
    },
    "message": "Category and its products"
}
```
### ویرایش دسته

برای ویرایش یک دسته به آدرس زیر با متد Patch ریکوست ارسال کنید:

PATCH: {{URL}}/cate/edit/categoryId

| فیلد | نوع | توضیحات |
| :---:  | :---:  |  ---: |
| name* | string | نام دسته |
| url* | string | لینک دسته |
| category | string | شناسه دسته والد |
| meta | meta | شامل: title – description – keyphrase |

نمونه ریکوست:

{{URL}}/cate/edit/63b12fb1ff0cf3e6dcfd1d8f
``` json
{
    "category": "63c398914c7daae474b9b637"
}
```
نمونه پاسخ:

``` json
{
    "status": 200,
    "data": {
        "removed": null,
        "assigned": {
            "_id": "63c398914c7daae474b9b637",
            "name": "Backend Development",
            "url": "backend-dev",
            "children": [],
            "meta": "63c398914c7daae474b9b638",
            "__v": 0
        },
        "saved": {
            "_id": "63b12fb1ff0cf3e6dcfd1d8f",
            "name": "GraphQL",
            "url": "graphql",
            "children": [],
            "__v": 0,
            "category": "63c398914c7daae474b9b637"
        }
    },
    "message": "Category updated!"
}
```
در مثال بالا دسته 63b12fb1ff0cf3e6dcfd1d8f به زیر مجموعه دسته 63c398914c7daae474b9b637 اضافه شد.

### حذف دسته

برای حذف یک دسته به آدرس زیر با متد Delete ریکوست ارسال کنید:

DELETE: {{URL}}/cate/delete/categoryId

نمونه ریکوست:

{{URL}}/cate/delete/63bbaa7ee2459b34c12fa2b7

نمونه پاسخ:
``` json
{
    "status": 200,
    "data": {
        "category": {
            "_id": "63bbaa7ee2459b34c12fa2b7",
            "name": "Backend Development",
            "url": "backend-dev",
            "children": [
                "63b12f89ff0cf3e6dcfd1d83",
                "63b12fb1ff0cf3e6dcfd1d8f"
            ],
            "meta": "63bbaa7ee2459b34c12fa2b8",
            "__v": 0
        },
        "meta": {
            "_id": "63bbaa7ee2459b34c12fa2b8",
            "title": "Backend Archive - Ecommerce-API",
            "description": "If you want to learn Backend you should understand its basic and here you can find much good information.",
            "keyphrase": [],
            "link": "63bbaa7ee2459b34c12fa2b7",
            "__v": 0
        }
    },
    "message": "Category deleted"
}
```
