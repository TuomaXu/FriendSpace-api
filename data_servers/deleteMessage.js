import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');
const Account = sequelize.model('account');

export default async (req,res)=>{
    
        const {access_token,messageId} = req.body;

        const account = await Account.findOne({where:{access_token}});

        if(!account){
            return res.json({
                success:false,
                errorMessage:'access_token无效',
                errorCode:10003,
            })
        }

        await Message.destroy({where:{id:messageId}});

        return res.json({
            success:true,
        })
}