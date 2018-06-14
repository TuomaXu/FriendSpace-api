import sequelize from '../data-model/data-base';
import createToken from '../utils/create-token';

const Account = sequelize.model('account');
const User = sequelize.model('user');

export default async (req,res)=>{

    const {email,password} = req.body;

    const account = await Account.findOne({
        where:{email,password},
    });

    if(!account){
        return res.json({
            success:false,
            errorMessage:'用户名或密码错误',
            errorCode:10002
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