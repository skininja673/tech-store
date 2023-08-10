const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');

const airtable = new Airtable({
    apiKey: 'patOboxat3kVGaMCN.1068e52baf21814308fb07e94a52e28b4a4287dd1dbf82286f0913eb3215ee4a',
})
    .base('appTQ5aSrkwYlpTDb')
    .table('products');
exports.handler = async (event, context, cb) => {
    const { id } = event.queryStringParameters;

    if (id) {
        try {
            let product = await airtable.retrieve(id);
            if (product.error) {
                return {
                    statusCode: 404,
                    body: `No product with id: ${id}`,
                };
            }
            product = { id: product.id, ...product.fields };
            return {
                statusCode: 200,
                body: JSON.stringify(product),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: `Server Error`,
            };
        }
    }
    return {
        statusCode: 400,
        body: 'Please provide product id',
    };
};
