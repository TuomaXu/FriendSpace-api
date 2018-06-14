import sequelize from '../data-model/data-base';

const Account = sequelize.model('account');

export default async (req,res)=>{
    
    const {access_token,old_password,new_password} = req.body;

    const account = await Account.findOne({
        where:{access_token},
    });

    if(!account){
        return res.json({
            success:false,
            errorMessage:'access_token无效',
            errorCode:10003
        });
    }

    if(account.password != old_password){
        return res.json({
            success:false,
            errorMessage:'旧密码错误',
            errorCode:10006
        });
    }

    account.password = new_password;
    await account.save();

    return res.json({
        success:true,
    });
    
}