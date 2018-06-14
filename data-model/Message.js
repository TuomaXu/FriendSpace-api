export default (sequelize, DataTypes)=>{
    return sequelize.define('message',{
        content:DataTypes.STRING,
    });
}