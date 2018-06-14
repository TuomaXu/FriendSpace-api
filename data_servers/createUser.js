import sequelize from '../data-model/data-base';
import saveImage from '../utils/save-image';

const Account = sequelize.model('account');
const User = sequelize.model('user');

export default async (req,res)=>{

    const {access_token,nickname,sign} = req.body;
    const account = await Account.findOne({where:{access_token}});
    
    if(!account){
        return res.json({
            success:false,
            errorMessage:'access_token无效',
            errorCode:10003,
        })
    }

    const image = await saveImage(req.files[0].buffer);

    const user  = await User.create({nickname,sign,image});

    await account.setUser(user);

    res.json({
        success:true,
        data:user,
    });
}