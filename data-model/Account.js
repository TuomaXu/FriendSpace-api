export default (sequelize, DataTypes)=>{
    return sequelize.define('account',{
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        access_token:DataTypes.STRING,
    });
}