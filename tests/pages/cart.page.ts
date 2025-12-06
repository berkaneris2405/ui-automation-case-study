import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.locator('#cartur').click();
    await this.page.locator('#tbodyid').waitFor({ state: 'visible' });
  }

  async getFirstItem(): Promise<{ name: string; price: number } | null> {
    const row = this.page.locator('#tbodyid tr').first();
    if (!(await row.count())) return null;
    const name = (await row.locator('td').nth(1).textContent())?.trim() ?? '';
    const priceText = (await row.locator('td').nth(2).textContent()) ?? '';
    const price = parseInt(priceText.replace(/\D/g, ''), 10);
    return { name, price };
  }

  async getTotal(): Promise<number> {
    const text = (await this.page.locator('#totalp').textContent()) ?? '0';
    return parseInt(text.replace(/\D/g, ''), 10);
  }
}
