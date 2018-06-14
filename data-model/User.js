export default (sequelize, DataTypes)=>{
    return sequelize.define('user',{
        nickname:DataTypes.STRING,
        image:DataTypes.STRING,
        sign:DataTypes.STRING,
    });
}