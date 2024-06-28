// const userModel = require('../../models/user')

// async function chatTemplatePlaceholder( type, template, messageData, senderId) {
//     const userDetailesFetched = await userModel.findById({_id: senderId})
//     const Name = userDetailesFetched.name;
//     const replaceuserNameTemplates = type.replace(/%Name%/g, Name)
//     let replaceMessagetemplate
//     if(messageData){
//         replaceMessagetemplate = template.replace(/%messageData%/g, messageData)
//     } else if (messageData==null){
//         replaceMessagetemplate = template
//     }
//     const chatTemplateData = { replaceuserNameTemplates , replaceMessagetemplate}
//     return chatTemplateData,
// }

// module.exports = { chatTemplatePlaceholder}
