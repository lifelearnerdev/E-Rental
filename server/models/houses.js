export default (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      houseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      numberOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfToilets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      upfront: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
  return House;
};
