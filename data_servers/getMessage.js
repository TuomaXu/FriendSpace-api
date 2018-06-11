import Sequelize  from 'sequelize';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('fs_message');
const Account = sequelize.model('fs_account');
const User = sequelize.model('fs_user');
const Image = sequelize.model('fs_image');

const Op = Sequelize.Op;

export default async (req,res)=>{
    
    const {access_token,minId,userId,count=20} = req.body;
    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            message:'access_token无效',
            code:10003,
        })
    }



    const options = {
        order:[
            ['id','DESC']
        ],
        where:{
            userId:userId?userId:account.userId,
        },
        include:[
            {
                model:Image,
                attributes:['id','url']
            },
            {
                model:User,
                attributes:['id','nickname','image']
            }
        ],
        limit:parseInt(count),

    };

    if(minId){
        const opMinId = {
            [Op.lt]: minId,
        }
        options.where.id = opMinId;
    }

    const messages = await Message.findAll(options);

    return res.json({
        success:true,
        data:messages
    })


}