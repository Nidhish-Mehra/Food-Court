const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.userSchema = Joi.object({
    name: Joi.string().required().min(4).escapeHTML(),
    password: Joi.string().required(4).escapeHTML()
});

module.exports.menuItemSchema = Joi.object({
    itemName: Joi.string().required().min(3).escapeHTML(),
    itemPrice: Joi.number().min(1)
});

module.exports.orderSchema = Joi.object({
    orderedBy: Joi.string().escapeHTML(),
    orderDetails: Joi.object({
        itemName: Joi.number().required().min(1),
        itemPrice: Joi.string().required().escapeHTML(),
        itemQuantity: Joi.string().required().escapeHTML()
    }).required(),
    total:Joi.number().required(),
    orderDate:Joi.date().iso()
})

