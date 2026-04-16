# Ecostroydom — продающий лендинг

Статический лендинг для продажи газоблока автоклавного D600 (1 сорт) в Астане.

## Запуск

Просто открой `index.html` в браузере. Для красивого превью с анимациями лучше через локальный сервер:

```bash
# python
python -m http.server 8000
# или node
npx serve .
```

## Структура

- `index.html` — вся разметка + JSON-LD (Product, LocalBusiness, FAQPage)
- `assets/css/` — стили (reset, main, animations)
- `assets/js/` — скрипты:
  - `config.js` — конфиг акции (правит менеджер раз в 3 дня — см. `assets/js/README.md`)
  - `timer.js` — обратный отсчёт
  - `animations.js` — reveal-on-scroll, счётчики, бургер
  - `calculator.js` — калькулятор кубатуры
  - `form.js` — форма заявки + маска телефона
- `robots.txt`, `sitemap.xml`

## Что нужно заменить перед публикацией

1. **Контакты**: телефон `+7 (700) 000-00-00`, email, адрес — в `index.html` (хедер, footer, JSON-LD).
2. **WhatsApp/Telegram** — ссылки `wa.me/77000000000`, `t.me/ecostroydom`.
3. **Картинки** — сейчас Unsplash-плейсхолдеры, замени на реальные фото товара/доставки в `assets/img/`.
4. **Цены** — в карточках каталога и в `Product` JSON-LD.
5. **Форма** — в `assets/js/form.js` подключи свой бэкенд / Formspree / Telegram-бот (см. комментарий).
6. **Дата акции** — в `assets/js/config.js` (поле `endsAt`).
7. **Адрес/реквизиты ТОО** — в footer.

## SEO

- `<title>` и `meta description` оптимизированы под «газоблок D600 Астана»
- JSON-LD: Product, LocalBusiness, FAQPage
- Семантические `<header>/<main>/<section>/<footer>`
- Lazy-load изображений
- preconnect к Google Fonts

Семантическое ядро (используется в текстах, H2/H3, alt):
газоблок Астана, газоблок автоклавный D600, газоблок 1 сорт, газобетон Астана,
газоблок 600x300x200, автоклавный газобетон с доставкой, доставка манипулятором,
длинномер по РК, клей для газоблока Астана, USTA Block, Bauramix, ГОСТ 31360.
