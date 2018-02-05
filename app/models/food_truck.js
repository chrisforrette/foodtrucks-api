/**
 * Food truck model definer, this function follows the signature expected by the
 * Sequelize.import call
 * @param  {object} sequelize Sequelize object
 * @param  {object} DataTypes Sequelize DataTypes object
 * @return {object} Food truck model object
 * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('food_truck', {
    source_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    facility_type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },

    status: {
      type: DataTypes.STRING(25),
      allowNull: false
    },

    food_items: {
      type: DataTypes.TEXT(),
      allowNull: true
    },

    days_hours: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    latitude: {
      type: DataTypes.FLOAT(14),
      allowNull: false
    },

    longitude: {
      type: DataTypes.FLOAT(14),
      allowNull: false
    }
  }, {
    indexes: [
      { fields: ['status'] },
      { fields: ['latitude', 'longitude'] }
    ]
  })
}
