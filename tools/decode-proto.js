const loader = require('../src/utils/proto-loader');
const fs = require('fs');

const proto = 'cometScene.Ret_ShopBuy';

(async function () {
    await loader.load();

    let data = fs.readFileSync('data.hex', 'utf8');
    data = Buffer.from(data.replace(/[\s\r\n]/g, ''), 'hex');
    data = loader.root.lookupType(proto).decode(data);

    console.log(data);
    fs.writeFileSync('decoded.json', JSON.stringify(data));
})();
