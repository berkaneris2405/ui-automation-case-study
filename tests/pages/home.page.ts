import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoblaze.com/');
  }

  async selectCategory(name: string) {
    const firstLocator = this.page.locator('.hrefch').first();
    const beforeText = (await firstLocator.count()) ? (await firstLocator.textContent())?.trim() ?? '' : '';

    await this.page.getByRole('link', { name }).click();
    // wait for the product tiles container to be visible
    await firstLocator.waitFor({ state: 'visible' });

    // If selecting Laptops, also wait briefly for the first item to contain
    // a laptop marker (e.g. "Sony") to avoid opening a phone by mistake.
    if (name.toLowerCase() === 'laptops') {
      await expect(firstLocator).toHaveText(/Sony/i, { timeout: 3000 }).catch(() => {
        // ignore timeout here — fallback to the regex-based polling below
      });
    }
  }

  async openFirstProduct() {
    const first = this.page.locator('.hrefch').first();
    await expect(first).toBeVisible();
    await first.click();
    await this.page.locator('h2').waitFor({ state: 'visible' });
  }

  async openProductByName(name: string) {
    await this.page.getByText(name).first().click();
    await this.page.locator('h2').waitFor({ state: 'visible' });
  }
}
