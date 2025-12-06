import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async getTitle(): Promise<string> {
    return (await this.page.locator('h2').textContent())?.trim() ?? '';
  }

  async getPrice(): Promise<number> {
    const text = (await this.page.getByText(/\$\s*\d+/).first().textContent()) ?? '';
    const m = text.match(/\$\s*(\d+)/);
    return m ? parseInt(m[1], 10) : NaN;
  }

  async addToCart(): Promise<string> {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.getByRole('link', { name: 'Add to cart' }).click(),
    ]);
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
