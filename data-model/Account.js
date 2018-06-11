export default (sequelize, DataTypes)=>{
    return sequelize.define('fs_account',{
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        access_token:DataTypes.STRING,
    });
}