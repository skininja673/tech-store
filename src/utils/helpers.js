export const formatPrice = (number) => {
    const newNumber = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
    }).format(number / 100);
    return `${newNumber}`;
};

export const getUniqueValues = (data, type) => {
    // const unique = [...new Set(data.map((item) => item.type))];
    let unique = data.map((item) => item[type]);

    if (type === 'colors') {
        // the colors data is array of arrays, therefore we  need to flat that
        unique = unique.flat();
    }

    return ['all', ...new Set(unique)];
};
