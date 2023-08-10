const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');

const airtable = new Airtable({
    apiKey: 'patOboxat3kVGaMCN.1068e52baf21814308fb07e94a52e28b4a4287dd1dbf82286f0913eb3215ee4a',
})
    .base('appTQ5aSrkwYlpTDb')
    .table('products');

exports.handler = async (event, context, cb) => {
    try {
        const response = await airtable.list({ maxRecords: 200 });
        const products = response.records.map((product) => {
            const { id, fields } = product;
            const {
                name,
                featured,
                price,
                colors,
                company,
                description,
                category,
                shipping,
                images,
            } = fields;
            const { url } = images[0];

            return {
                id,
                name,
                featured,
                price,
                colors,
                company,
                description,
                category,
                shipping,
                image: url,
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    } catch (error) {
        console.log('error: ', error);
        return {
            statusCode: 500,
            body: 'there was an error',
        };
    }
};
