//引入Sequelize框架
import Sequelize  from 'sequelize';

//通过Sequelize构造方法创建Sequelize实例并链接数据库
const sequelize = new Sequelize(
  'api',
  'root',
  '',
  {
    'dialect': 'mysql',  // 数据库使用mysql
    'host': 'localhost', // 数据库服务器ip
    'port': 3306         // 数据库服务器端口
  }
);

//测试链接是否成功
//sequelize提供一个authenticate()函数测试链接是否成功
//sequelize中所有异步操作都为Promise封装
sequelize
  .authenticate()
  .then(()=>{
    console.log('链接成功');
  })
  .catch((err)=>{
    console.error('链接失败', err);
  });



//导入数据模型

const Message = sequelize.import('./Message.js');
const Account = sequelize.import('./Account.js');
const Image = sequelize.import('./Image.js');
const User = sequelize.import('./User.js');
const FriendShip = sequelize.import('./FriendShip.js');



//配置数据关系
Account.belongsTo(User);
Message.hasMany(Image);
Message.belongsTo(User);

User.belongsToMany(User,{
  as:'followed',
  through:FriendShip,
});


//同步数据
sequelize.sync({force:true});


export default sequelize;