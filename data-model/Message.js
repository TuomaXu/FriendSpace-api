export default (sequelize, DataTypes)=>{
    return sequelize.define('fs_message',{
        content:DataTypes.STRING,
    });
}