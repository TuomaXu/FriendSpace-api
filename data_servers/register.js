import sequelize from '../data-model/data-base';
import createToken from '../utils/create-token';

const Account = sequelize.model('account');

export default async (req,res)=>{
    
    const {email,password} = req.body;
    const temp = await Account.findOne({where:{email}});
    if(temp){
        return res.json({
            success:false,
            errorMessage:'用户名已存在',
            errorCode:10001,
        })
    }

    const access_token = createToken(email,password);

    const account = await Account.create({email,password,access_token});

    return res.json({
        success:true,
        data:{
            access_token,
        }
    });
}