import sequelize from '../data-model/data-base';

const Account = sequelize.model('account');
const User = sequelize.model('user');

export default async (req,res)=>{
    
    const {access_token} = req.body;
    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            errorMessage:'access_token无效',
            errorCode:10003,
        })
    }

    const user = await account.getUser();

    const follows = await user.getFollowed();

    return res.json({
        success:true,
        data:follows,
    })
}