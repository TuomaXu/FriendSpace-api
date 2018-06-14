export default (sequelize, DataTypes)=>{
    return sequelize.define('friendship',{
        info:DataTypes.STRING,
    });
}