const mtmsMailer = require('../models/emailer.model');
const config = require('../config');

// import Enumerable from 'linq'
const Enumerable = require('linq');

const User = require('../models/user.model');

const sns = require('../models/sns.model');
const { Attachment } = require('../databases/models/attachment.model');
const {Ticket} = require('../databases/models/ticket.model');
const { TicketUserMappingModel } = require('../databases/models/ticket_user_mapping.model');
const { TicketUserStatus } = require('../databases/models/ticket_user_status.model');

const setTicketStatus = async (req, res) => {
    var body = req.body;
    var json = JSON.parse(JSON.stringify(body));

    var user_id = parseInt(json["user_id"]);
    var status = parseInt(json["status"]);
    var ticket_id = parseInt(json["ticket_id"]);
    var sent_to_user_id = parseInt(json["sent_to_user_id"]);

    try {

        //If Status is 'SENT' to another user. Check if already sent to this user or not.
        if (status == 1) {
            var mapping = await TicketUserMappingModel.findOne({
                where: {
                    ticket_id: ticket_id,
                    to_user_id: sent_to_user_id
                }
            });

            //If not sent to user yet.
            if (mapping == null) {
                //Delete old assigned user.
                await TicketUserMappingModel.destroy({
                    where: {
                        ticket_id: ticket_id,
                        from_user_id: user_id
                    }
                });

                //Create new assigned user.
                await TicketUserMappingModel.create({
                    ticket_id: ticket_id,
                    from_user_id: user_id,
                    to_user_id: sent_to_user_id,
                    status: -1
                });
            }
            else { //if already sent to user, mapping already exists.

            }

            //Check if user status is already set, for this ticket.
            var user_status = await TicketUserStatus.findOne({
                where: {
                    ticket_id: ticket_id,
                    user_id: user_id
                }
            });

            if (user_status == null) { //If user status not created,
                await TicketUserStatus.create({
                    ticket_id: ticket_id,
                    user_id: user_id,
                    status: 1
                });
            }
            else {//If user status aready created, update this to 'SENT'
                await TicketUserStatus.update({
                    ticket_id: ticket_id,
                    user_id: user_id,
                    status: 1
                }, {
                    where: {
                        ticket_id: ticket_id,
                        user_id: user_id
                    }
                });
            }

            var assigned_to_user_status = await TicketUserStatus.findOne({
                where: {
                    ticket_id: ticket_id,
                    user_id: sent_to_user_id
                }
            });

            //If ticket is not yet sent to user and status does not exists, create Pending status.
            if (assigned_to_user_status == null) {
                await TicketUserStatus.create({
                    ticket_id: ticket_id,
                    user_id: sent_to_user_id,
                    status: 0
                });
            }
        }
        else { //if Status is 'REJECT'/'APPROVE'/'PENDING'/

            //Update ticket status by user.
            await TicketUserStatus.update({
                status: status
            }, {
                where: {
                    user_id: user_id
                }
            });
        }

        //Update ticket level status
        await Ticket.update({
            status: status
        }, {
            where: {
                ticket_id: ticket_id
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

module.exports = {
    setTicketStatus
};