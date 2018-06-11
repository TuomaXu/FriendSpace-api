import sequelize from '../data-model/data-base';

const Account = sequelize.model('fs_account');

export default async (req,res)=>{
    
    const {access_token,old_password,new_password} = req.body;

    const account = await Account.findOne({
        where:{access_token},
    });

    if(!account){
        return res.json({
            success:false,
            message:'access_token无效',
            code:10003
        });
    }

    if(account.password != old_password){
        return res.json({
            success:false,
            message:'旧密码错误',
            code:10006
        });
    }

    account.password = new_password;
    await account.save();

    return res.json({
        success:true,
    });
    
}