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

    const myself = await account.getUser();

    const friend = await User.findOne({where:{id:userId}});

    if(!friend){
        return res.json({
            success:false,
            errorMessage:'UserId无效',
            errorCode:10005,
        })
    }

    await myself.addFollowed(friend);

    return res.json({
        success:true
    });
}