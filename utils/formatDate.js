const dayjs = require('dayjs');

const formatDate = (date) => {
    const formattedDate = dayjs(date).format('MM/DD/YYYY hh:mm:ss A');
    return formattedDate
}

module.exports = formatDate;