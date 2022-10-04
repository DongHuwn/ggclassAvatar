await page1.locator('text=tyrtyrtyrt').first().click();
await page1.waitForURL('https://classroom.google.com/c/NTM3OTAzMjI4NzY0');
// Click div[role="button"]:has-text("Customize")
await page1.locator('div[role="button"]:has-text("Customize")').click();
await page1.waitForURL('https://classroom.google.com/c/NTM3OTAzMjI4NzY0');
// Click button:has-text("Upload photo")
await page1.locator('button:has-text("Upload photo")').click();
// Click text=Select a photo from your computer
await page1.frameLocator('iframe[name="\\31 5fzm9qtzrmu"]').locator('text=Select a photo from your computer').click();
// Upload 18195148_519525628436763_6641820877260423738_n.jpg
await page1.frameLocator('iframe[name="\\31 5fzm9qtzrmu"]').locator('text=Select a photo from your computer').setInputFiles('18195148_519525628436763_6641820877260423738_n.jpg');
// Click text=Select class theme >> nth=2
await page1.frameLocator('iframe[name="\\31 5fzm9qtzrmu"]').locator('text=Select class theme').nth(2).click();
// Click div[role="button"]:has-text("Save") >> nth=1
await page1.locator('div[role="button"]:has-text("Save")').nth(1).click();
await page1.waitForURL('https://classroom.google.com/c/NTM3OTAzMjI4NzY0');