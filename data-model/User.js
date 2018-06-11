export default (sequelize, DataTypes)=>{
    return sequelize.define('fs_user',{
        nickname:DataTypes.STRING,
        image:DataTypes.STRING,
        sign:DataTypes.STRING,
    });
}