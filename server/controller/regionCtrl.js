import { sequelize } from "../models/init-models";

const findAll = async (req,res) =>{
    try {
        const regions  = await req.context.models.regions.findAll({
            // include : [{
            //     model : req.context.models.countries
            // }]
        });
        return res.send(regions)
    } catch (error) {
        return res.status(404).send("not found")       
    }
}

const findOne  = async (req,res) => {
    try {
        const regions = await req.context.models.regions.findOne({
            where:{region_id:req.params.id}
        })
        return res.send(regions)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const create = async (req,res) =>{
    try {
        const regions = await req.context.models.regions.create({
            region_name : req.body.region_name
        })
        return res.send(regions)
    } catch (error) {
        return res.status(404).send("not found")
    }
}
const update = async (req,res)=>{
    const {region_name} = req.body
    try {
        const regions = await req.context.models.regions.update(
            {region_name : region_name},
            {returning : true, where :{region_id : req.params.id}}
        )
        return res.send(regions)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const remove = async (req,res)=>{
    try {
        const regions = await req.context.models.regions.destroy({
            where :  {region_id : req.params.id}
        })
        return res.send("delete"+regions+"rows")
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const rawSQL = async (req,res)=>{
    await sequelize.query('SELECT*from regions where region_id =:regionId',
    {replacements : {regionId : req.params.id},type : sequelize.QueryTypes.SELECT}
    ).then(result =>{
        return res.send(result)
    })
}

export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL
}