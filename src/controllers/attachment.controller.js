const mtmsMailer = require('../models/emailer.model');
const config = require('../config');

// import Enumerable from 'linq'
const Enumerable = require('linq');

const User = require('../models/user.model');

const sns = require('../models/sns.model');
const { Attachment } = require('../databases/models/attachment.model');

const getAllAttachments = async (req, res) => {
    var ticket_id = parseInt(req.query.ticket_id);

    try {

        var attachments = await Attachment.findAll({
            where: {
                ticket_id: ticket_id
            }
        });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the users.',
            data: JSON.stringify(attachments),
        });
    } catch (e) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}

const deleteAttachment = async (req, res) => {
    var body = req.body;
    var json = JSON.parse(JSON.stringify(body));

    try {

        var attachment_id = parseInt(json["attachment_id"]);

        await Attachment.destroy({
            where: {
                attachment_id: attachment_id
            }
        });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the users.',
            data: JSON.stringify(""),
        });

    }
    catch (e) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}


const createAttachment = async (req, res) => {
    var body = req.body;
    var json = JSON.parse(JSON.stringify(body));

    try {

        var user_id = parseInt(json["user_id"]);
        var ticket_id = parseInt(json["ticket_id"]);
        var name = json["name"];
        var url = json["url"];
        var type = json["type"];
        // var ticket_type = parseInt(json["ticket_type"])

        var attachment = await Attachment.create({
            name: name,
            url: url,
            ticket_id: ticket_id,
            user_id: user_id,
            type: type
        });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the users.',
            data: JSON.stringify(attachment),
        });

    }
    catch (e) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
}


module.exports = {
    createAttachment,
    getAllAttachments,
    deleteAttachment
};