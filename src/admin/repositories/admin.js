const sequelize = require('sequelize');
const { Job, Contract, Profile } = require('../../model');

const { Op } = sequelize;

class AdminRepository {
  getMostEarnedProfession(startDate, endDate) {
    return Job.findOne({
      attributes: [
        [sequelize.col('Contract->Contractor.profession'), 'profession'],
        [sequelize.fn('sum', sequelize.col('price')), 'totalPrice'],
      ],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: {
            startDate,
            endDate,
          },
        },
      },
      include: {
        attributes: [],
        model: Contract,
        required: true,
        include: {
          model: Profile,
          required: true,
          as: 'Contractor',
        },
      },
      group: ['Contract->Contractor.profession'],
      order: [[sequelize.col('totalPrice'), 'DESC']],
    });
  }

  getMostPaidClients(startDate, endDate, limit) {
    console.log({
      startDate, endDate, limit
    })
    return Job.findAll({
      attributes: [
        [sequelize.col('Contract->Client.id'), 'id'],
        [sequelize.literal("'Contract->Client'.firstName || ' ' || 'Contract->Client'.lastName"), 'fullName'],
        [sequelize.fn('sum', sequelize.col('price')), 'paid'],
      ],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [
            startDate,
            endDate,
          ]
        },
      },
      include: {
        attributes: [],
        model: Contract,
        required: true,
        include: {
          attributes: ['id'],
          required: true,
          model: Profile,
          as: 'Client',
        },
      },
      group: ['Contract.ClientId'],
      order: [[sequelize.col('paid'), 'DESC']],
      limit,
    });
  }
}

module.exports = AdminRepository;
