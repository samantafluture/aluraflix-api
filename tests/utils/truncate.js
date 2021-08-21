const { sequelize } = require('../../api/models');

module.exports = () => {
    return Promise.all(Object.keys(sequelize.models).map((key) => {
        return sequelize.models[key].destroy({ truncate: true, force: true });
    }));
};
