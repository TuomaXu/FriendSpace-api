import sequelize from '../data-model/data-base';

const Account = sequelize.model('account');
const User = sequelize.model('user');

export default async (req,res)=>{
    
    const {access_token,userId} = req.body;
    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            errorMessage:'access_token无效',
            errorCode:10003,
        })
    }

    if(userId && userId!=0){
        const user = await User.findOne({where:{id:userId}});
        return res.json({
            success:true,
            data:user
        });
    } else {
        const user = await account.getUser();
        return res.json({
            success:true,
            data:user
        });
    }

    
}