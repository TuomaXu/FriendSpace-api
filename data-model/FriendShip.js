export default (sequelize, DataTypes)=>{
    return sequelize.define('fs_friendship',{
        info:DataTypes.STRING,
    });
}