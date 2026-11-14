import {test, expect} from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  //Login with valid credentials
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    // Verify that the user is logged in and redirected to the inventory page
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(6);
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();


    //Sort the products by price (high to low)
    const sortContainer = page.locator('.product_sort_container');
    await sortContainer.click();
    await sortContainer.selectOption('hilo');

    //Select items
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    
});