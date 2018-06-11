import sequelize from '../data-model/data-base';
import createToken from '../utils/create-token';

const Account = sequelize.model('fs_account');
const User = sequelize.model('fs_user');

export default async (req,res)=>{

    const {email,password} = req.body;

    const account = await Account.findOne({
        where:{email,password},
    });

    if(!account){
        return res.json({
            success:false,
            message:'用户名或密码错误',
            code:10002
        });
    }

    const access_token = createToken(email,password);

    account.access_token = access_token;

    await account.save();

    return res.json({
        success:true,
        data:{
            access_token,
            userId:account.userId
        }
    });
}