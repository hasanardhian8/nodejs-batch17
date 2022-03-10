const findAll = async(req,res) =>{
    try {
        const result = await req.context.models.employees.findAll()
        return res.send(result)
    } catch (error) {
        return res.status(404).send('no data found')
    }
}

const createEmp = async(req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.employees.create({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number : fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt(fields[6].value),
            department_id : parseInt(fields[7].value),
            profile : files[0].file.newFilename
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).json({
            status : "failed",
            message : "",
            error:error
        })
    }
}

const updateEmp = async (req,res,next) =>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.employees.update({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number : fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt(fields[6].value),
            department_id : parseInt(fields[7].value),
            profile : files[0].file.newFilename
        },
        {returning : true, where : {employee_id : req.params.id}})
        return res.send(result)
    } catch (error) {
        return res.status(404).json({
            status : "failed",
            message : "",
            error:error
        })
    }
}

export default {
    findAll,
    createEmp,
    updateEmp
}