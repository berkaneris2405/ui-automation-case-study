import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { ProductPage } from './pages/product.page';
import { CartPage } from './pages/cart.page';

test('open laptop product and verify details', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  await home.goto();
  await home.selectCategory('Laptops');
  await home.openFirstProduct();

  const title = await product.getTitle();
  expect(title.length).toBeGreaterThan(0);

  const price = await product.getPrice();
  expect(Number.isFinite(price)).toBeTruthy();

  await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
});

test('add product to cart and verify cart contents', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();
  await home.openFirstProduct();

  const detailTitle = await product.getTitle();
  const priceNumber = await product.getPrice();

  const dialogMsg = await product.addToCart();
  // Verify the add-to-cart popup was shown and contains expected text
  expect(dialogMsg).toBeTruthy();
  expect(dialogMsg.toLowerCase()).toContain('product');

  await cart.goto();
  const item = await cart.getFirstItem();
  expect(item).not.toBeNull();
  expect(item!.name.length).toBeGreaterThan(0);
  expect(item!.price).toBe(priceNumber);

  const total = await cart.getTotal();
  expect(total).toBe(priceNumber);
});

