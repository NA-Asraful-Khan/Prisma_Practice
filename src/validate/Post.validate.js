const Validator = require('fastest-validator')

module.exports.postValidate=(post)=>{
    const schema={
        title: {type:'string',optional:false,max:'100'},
        content:{type:'string',optional:false,max:'500'}
    }
    const v = new Validator();
    const validateResponse= v.validate(post,schema)
    return validateResponse
}
