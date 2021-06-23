const sgMail = require('@sendgrid/mail')
//const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name )=>{
    sgMail.send({
        to: email,
        from: 'shahjahansari4u@gmail.com',
        subject: 'Thanks for Joining',
        text: `Hey ${name}.I have created API for sending mails using NodeJS which uses sendgrid API behind the scenes.`
    }).then(()=>{
        console.log('Mail sent successfulley')
    }).catch((e)=>{
        console.log('Error sending mails')
    })
}

const sendCancellationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'shahjahansari4u@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. Hope to see you back soon.`
    }).then(()=>{
        console.log('Mail sent successfulley')
    }).catch((e)=>{
        console.log('Error sending mails')
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}