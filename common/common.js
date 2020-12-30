function changeJson(res) {
    return JSON.parse(res.data);
}

module.exports = {
    changeJson: changeJson
}