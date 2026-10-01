const fs = require('fs');

const filesToClean = [
  './src/controllers/ticketController.js',
  './src/routes/ticketRoutes.js'
];

filesToClean.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    // إزالة أي رموز غير مرئية أو محارف دخيلة والإبقاء على الكود النظيف فقط
    let cleanContent = content.replace(/[^\x20-\x7E\r\n\t]/g, '');
    fs.writeFileSync(file, cleanContent);
    console.log(`Successfully cleaned: ${file}`);
  } catch (error) {
    console.log(`Could not find or clean: ${file}`);
  }
});