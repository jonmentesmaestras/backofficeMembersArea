// Dependencies
const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize')
const connection = require('./connectDB')

var model = {}

 /* =====================back office model ============================= */

 model.Estanteria = connection.sequelize.define('Estanteria', {
  EstanteriaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  EstanteriaCode: {
    type: DataTypes.STRING(35),
  },
  EstanteriaDesc: {
    type: DataTypes.STRING(150),
  },
  Active: {
    type: DataTypes.BOOLEAN,
  },
  ActivedDT: {
    type: DataTypes.DATE,
  },
  CreatedBy: {
    type: DataTypes.STRING(50),
  },
  CreatedDT: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING(50),
  },
  UpdatedDT: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Estanteria',
  timestamps: false, // If you don't want Sequelize to manage timestamps (created_at, updated_at)
  engine: 'InnoDB',
  charset: 'utf8mb3',
  collate: 'utf8mb3_unicode_ci',
});

// Categorias
model.ProductCategories = connection.sequelize.define('ProductCategories', {
  ProductCategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ProductCategoryCode: {
    type: DataTypes.STRING(35),
  },
  ProductCategoryDesc: {
    type: DataTypes.STRING(150),
  },
  FK_EstanteriaCode: {
    type: DataTypes.STRING(35),
  },
  Active: {
    type: DataTypes.BOOLEAN,
  },
  ActivedDT: {
    type: DataTypes.DATE,
  },
  CreatedBy: {
    type: DataTypes.STRING(50),
  },
  CreatedDT: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING(50),
  },
  UpdatedDT: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'ProductCategories',
  timestamps: false, // If you don't want Sequelize to manage timestamps (created_at, updated_at)
  engine: 'InnoDB',
  charset: 'utf8mb3',
  collate: 'utf8mb3_unicode_ci',
});


//productos
model.Productos = connection.sequelize.define('Productos', {
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    autoIncrement: true
  },
  ProductCode: {
    type: DataTypes.STRING(35),
  },
  ProductName: {
    type: DataTypes.STRING(50),
  },
  Estado: {
    type: DataTypes.STRING(35),
  },
  ImageURL: {
    type: DataTypes.STRING(150),
  },
  ProductDesc: {
    type: DataTypes.STRING(500),
  },
  WebhookKey: {
    type: DataTypes.STRING(500),
  },
  Webhook: {
    type: DataTypes.STRING(500),
  },
  ThirdPartyProductID: {
    type: DataTypes.STRING(50),
  },
  Disponibilidad: {
    type: DataTypes.DATE,
  },
  FK_ProductCategoryCode: {
    type: DataTypes.STRING(35),
    references: {
      model: 'ProductCategories',
      key: 'ProductCategoryCode',
    },
  },
  Active: {
    type: DataTypes.BOOLEAN,
  },
  ActivedDT: {
    type: DataTypes.DATE,
  },
  CreatedBy: {
    type: DataTypes.STRING(50),
  },
  CreatedDT: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING(50),
  },
  UpdatedDT: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Productos',
  timestamps: false, // If you don't want Sequelize to manage timestamps (created_at, updated_at)
});


//lessons
model.Lessons = connection.sequelize.define('Lessons', {
  LessonID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  LessonCode: {
    type: DataTypes.STRING(35),
  },
  LessonName: {
    type: DataTypes.STRING(500),
  },
  LessonDuration: {
    type: DataTypes.STRING(35),
  },
  LessonVideoScript: {
    type: DataTypes.STRING(2000),
  },
  FK_ProductModuleCode: {
    type: DataTypes.STRING(35),
  },
  Active: {
    type: DataTypes.BOOLEAN,
  },
  ActivedDT: {
    type: DataTypes.DATE,
  },
  CreatedBy: {
    type: DataTypes.STRING(50),
  },
  CreatedDT: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING(50),
  },
  UpdatedDT: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Lessons',
  timestamps: false, // If you don't want Sequelize to manage timestamps (created_at, updated_at)
  engine: 'InnoDB',
  charset: 'utf8mb3',
  collate: 'utf8mb3_unicode_ci',
});



//Product Modules
model.ProductModules = connection.sequelize.define('ProductModules', {
  ProductModuleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ProductModuleCode: {
    type: DataTypes.STRING(35),
  },
  ProductModuleName: {
    type: DataTypes.STRING(100),
  },
  FK_ProductCode: {
    type: DataTypes.STRING(35),
  },
  Active: {
    type: DataTypes.BOOLEAN,
  },
  ActivedDT: {
    type: DataTypes.DATE,
  },
  CreatedBy: {
    type: DataTypes.STRING(50),
  },
  CreatedDT: {
    type: DataTypes.DATE,
  },
  UpdatedBy: {
    type: DataTypes.STRING(50),
  },
  UpdatedDT: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'ProductModules',
  timestamps: false, // If you don't want Sequelize to manage timestamps (created_at, updated_at)
  engine: 'InnoDB',
  charset: 'utf8mb3',
  collate: 'utf8mb3_unicode_ci',
});



module.exports = model