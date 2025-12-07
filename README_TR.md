# ui-automation-case-study

Kısa açıklama: Bu proje Playwright ile yazılmış UI otomasyon testlerini içerir.

## Gereksinimler
- Node.js (tercihen v16 veya üstü)

## Kurulum
1. Bağımlılıkları yükleyin:

```
npm install
```

2. Playwright tarayıcılarını yükleyin (gerekliyse):

```
npx playwright install
```

## Testleri Çalıştırma
- Tüm testleri çalıştırmak için:

```
npx playwright test
```

- Tek bir dosyayı çalıştırmak için:

```
npx playwright test tests/ui.tests.spec.ts
```

- Testleri tarayıcı penceresi açık şekilde çalıştırmak için:

```
npx playwright test --headed
```

## Raporlar
- Test raporunu görüntülemek için:

```
npx playwright show-report
```

