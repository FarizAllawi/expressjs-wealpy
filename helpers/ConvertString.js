const ConvertStringToInt = value => {
    const intValue = parseInt(value, 10);
    return isNaN(intValue) ? 0 : intValue;
};

const ConvertStringToDouble = value => {
    const doubleValue = parseFloat(value);
    return isNaN(doubleValue) ? 0.0 : doubleValue;
};

const ConvertToCurrency = value => {
    return new Intl.NumberFormat('de-DE').format(
        parseInt(value) === 'Nan' ? 0 : parseInt(value),
    );
}

const ConvertToDayMonthYear = value => {
    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 since months are zero-based
    const year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

const Slugify = value => {
    return value
        ?.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

module.exports = {
    ConvertToDayMonthYear,
    ConvertToCurrency,
    ConvertStringToDouble,
    ConvertStringToInt,
    Slugify
}