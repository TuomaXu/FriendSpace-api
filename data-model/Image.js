export default (sequelize, DataTypes)=>{
    return sequelize.define('fs_image',{
        url:DataTypes.STRING,
    });
}