const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const User = sequelize.define('tbl_users', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  username: { type: DataTypes.STRING, allowNull: false, unique: true  },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true  },
  password: { type: DataTypes.STRING, allowNull: false, unique: false },

  first_name: { type: DataTypes.STRING, allowNull: false, unique: false },
  last_name:  { type: DataTypes.STRING, allowNull: true,  unique: false },
  cpf_cnpj:   { type: DataTypes.STRING, allowNull: false, unique: true  }
}, {
  tableName:       'tbl_users',
  freezeTableName: false,
  timestamps:      true,
  hooks: {}
});

const Contact = sequelize.define('tbl_users', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  ddd:    { type: DataTypes.INTEGER, allowNull: false, unique: false  },
  number: { type: DataTypes.INTEGER, allowNull: false, unique: false  },

  fk_user: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_users', 
      key:   'id'
    }
  }
}, {
  tableName:       'tbl_contacts',
  freezeTableName: false,
  timestamps:      false,
  hooks: {}
});

const Address = sequelize.define('tbl_address', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  street:       { type: DataTypes.STRING,  allowNull: false, unique: false  },
  number:       { type: DataTypes.INTEGER, allowNull: false, unique: false  },
  neighborhood: { type: DataTypes.STRING,  allowNull: false, unique: false  },
  zipcode:      { type: DataTypes.STRING,  allowNull: false, unique: false  },

  state: { type: DataTypes.ENUM(
    'AC', 'AL', 'AP', 'AM', 'BA', 
    'CE', 'ES', 'GO', 'MA', 'MT', 
    'MS', 'MG', 'PA', 'PB', 'PR', 
    'PE', 'PI', 'RJ', 'RN', 'RS', 
    'RO', 'RR', 'SC', 'SP', 'SE', 
    'TO', 'DF'
  ), allowNull: false, unique: false  },

  observation: { type: DataTypes.STRING, allowNull: true, unique: false  },

  fk_user: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_users', 
      key:   'id'
    }
  }
}, {
  tableName:       'tbl_address',
  freezeTableName: false,
  timestamps:      false,
  hooks: {}
});

User.sync();
Contact.sync();
Address.sync();

module.exports = { Address, Contact, User  };
